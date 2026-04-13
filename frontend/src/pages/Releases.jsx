import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import ReleasesTable from "../components/ReleasesTable";
import ReleasesDetailsPanel from "../components/ReleasesDetailsPanel";

export default function ReleasesPage() {
  const [rows, setRows] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchReleased = async () => {
    try {
      const { data, error } = await supabase
        .from("inventory")
        .select(`
          *,
          customers ( * )
        `)
        .eq("status", "Released");

      if (error) throw error;

      const flattened = data.map((item) => ({
        ...item,
        ...item.customers,
      }));

      setRows(flattened);
    } catch (err) {
      console.error("Fetch released failed:", err);
      setRows([]);
    }
  };

  useEffect(() => {
    fetchReleased();
  }, []);

  return selectedItem ? (
    <ReleasesDetailsPanel
      releaseItem={selectedItem}
      onBack={() => setSelectedItem(null)}
      refreshData={fetchReleased}
    />
  ) : (
    <ReleasesTable rows={rows} onViewDetails={setSelectedItem} />
  );
}