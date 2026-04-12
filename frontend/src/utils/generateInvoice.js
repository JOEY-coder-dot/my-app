import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const generateInvoice = (row, logoBase64) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Add logo if available
  if (logoBase64) {
    doc.addImage(logoBase64, "PNG", 14, 10, 30, 30);
  }

  // Header: left-aligned but shifted right
  const headerX = pageWidth - 73;
  let y = 24;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.text("TOYOTA DAVAO CITY, INC.", headerX, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  const headerLines = [
    "KM 6, Lanang, Davao City, 8000",
    "Tel:(082) 234-2994",
    "Fax:(082) 233-0836",
    "Website: www.toyotadavao.com.ph",
    "VAT Reg. TIN: 004-444-927-00000",
    "Business Style: Motor Vehicles, Wholesaling",
  ];
  headerLines.forEach(line => {
    y += 3;
    doc.text(line, headerX, y);
  });

  // Title
  y += 11.8; 
doc.setFont("helvetica", "bold");
doc.setFontSize(19);
doc.text("VEHICLE SALES INVOICE", pageWidth-162, y);
doc.setFontSize(19);
doc.text(row.invoiceNo || "F5OA021488", pageWidth - 49.4, y);


// Customer Details table
autoTable(doc, {
  startY: y + 2,
  margin: { left: 7, right: 5 },
  head: [["  Customer Detail", "", "", ""]], // ✅ 4 columns
  body: [
    ["Name", row.name || "SHIELA PEILAGO AMBAT", "", ""],
    ["Address", row.address || "BLK4 LOT20 INIGO ST, BRGY 18-B BO OBRERO", "Customer Code Date", "3001371611 : 02/11/2025"],
    ["", "DAVAO CITY DAVAO DEL SUR", "VSI No VSP No", "F5OA021488 / F5JA023492"],
    ["", "8000", "MP", "IHLA LUCILE CAGASAN"],
    ["TIN", row.tin || "941-933-210-00100", "Reservation Type", "Credit Advice"],
    ["Business Style                    ", "", "Payment Mode", "Financing / Leasing"],
    ["Telephone", "", "Prepared By", "JESSEL P. NIÑO"],
    ["Mobile", row.mobile || "+639983642208", "", ""],
  ],
  theme: "grid",
  styles: { fontSize: 6.8, cellPadding: .8 },
  headStyles: { 
    fontSize: 11,   // adjust header font size
    textColor: [0, 0, 0], // black color in RGB
    fontStyle: 'bold', // optional, makes headers stand out
    cellPadding: .1 ,
    fillColor: [200, 200, 200] // light gray header
  }, 
  columnStyles: {
    0: { cellWidth: 43 },   // 1st column
    1: { cellWidth: 77.5 },  // 2nd column
    2: { cellWidth: 33.5 },   // 3rd column
    3: { cellWidth: 44 }    // 4th column
  },
});


  // Vehicle Details
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY,
    margin: { left: 7, right: 5 },
    head: [["  Vehicle Details", "","", ""]],
    body: [
      ["Make", row.make || "TOYOTA","Displacement", "1496.00 CCM"],
      ["Model", row.modelcode || "NYC200LDHXHBF002","Year Model", "2025"],
      ["Model", row.model || "","Gross Weight", "1705.00 KG"],
      ["Color", row.color || "","Key No.", "75310"],
      ["CS No", row.cs || "","",""],
      ["VIN", row.vin || "MHFAB8BF3R0020209", "", ""],
      ["Engine No               ", row.engine || "2NRY36594","",""],
      ["", "","",""],
    ],
    theme: "grid",
  styles: { fontSize: 6.8, cellPadding: .8 },
  headStyles: { 
    fontSize: 11,   // adjust header font size
    textColor: [0, 0, 0], // black color in RGB
    fontStyle: 'bold', // optional, makes headers stand out
    cellPadding: .1 ,
    fillColor: [200, 200, 200] // light gray header
  },
  columnStyles: {
    0: { cellWidth: 43 },   // 1st column
    1: { cellWidth: 77.5 },  // 2nd column
    2: { cellWidth: 33.5 },   // 3rd column
    3: { cellWidth: 44 }    // 4th column
  },
  });

  // Sales Information
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY,
    margin: { left: 7, right: 5 },
    head: [["Sales Information", "", "VAT Details", ""]],
    body: [
      ["", "Price(PHP)","Vatable Sales","1,476,785.71"],
      ["Suggested Retail Price (VAT Exclusive)", row.price || "1,476,785.71", "VAT Exempt Sales", "0.00"],
      ["Discount", row.discount || "-","Zero Rated Sales", "0.00"],
      ["Total (VAT Exclusive)", row.totalExclusive || "1,476,785.71","VAT Amount","177,214.29"],
      ["VAT Amount (12%)", row.vatAmount || "177,214.29"],
      ["Total (VAT Inclusive)", row.totalInclusive || "1,654,000.00"],
      ["Total Amount Payable/Finance", row.totalPayable || "1,654,000.00"],
    ],
    theme: "grid",
    styles: { fontSize: 6.8, cellPadding: .8 },
    headStyles: { 
    fontSize: 11,   // adjust header font size
    textColor: [0, 0, 0], // black color in RGB
    fontStyle: 'bold', // optional, makes headers stand out
    cellPadding: .1 ,
    fillColor: [200, 200, 200] // light gray header
  },
  columnStyles: {
    0: { cellWidth: 70 },   // 1st column
    1: { cellWidth: 35 , halign: 'right'},  // 2nd column
    2: { cellWidth: 50.5 },   // 3rd column
    3: { cellWidth: 42.5 , halign: 'right'}    // 4th column
  },
  });

  // Financing Terms
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [["Financing Terms", ""]],
    body: [
      ["Financing Company", row.financingCompany || ""],
      ["Downpayment", row.downpayment || ""],
      ["Amount to be Financed", row.amountFinanced || ""],
      ["Terms", row.terms || ""],
    ],
    theme: "grid",
    styles: { fontSize: 10 },
  });

  // Footer / Signatures
  const finalY = doc.lastAutoTable.finalY + 20;
  doc.text("RELEASED BY: ___________________", 14, finalY);
  doc.text("APPROVED BY: ___________________", 100, finalY);

  // Open in new tab for preview
  const pdfBlobUrl = doc.output("bloburl");
  window.open(pdfBlobUrl, "_blank");
};