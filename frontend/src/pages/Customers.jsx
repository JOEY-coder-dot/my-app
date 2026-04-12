import React, { useState } from "react";
import CustomersTable from "../components/CustomersTable";
import CustomerDetailsPanel from "../components/CustomerDetailsPanel";

export default function CustomersPage() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  return selectedCustomer ? (
    <CustomerDetailsPanel
      customer={selectedCustomer}
      onBack={() => setSelectedCustomer(null)}
    />
  ) : (
    <CustomersTable onViewDetails={setSelectedCustomer} />
  );
}