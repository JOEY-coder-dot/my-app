import { supabase } from "../supabaseClient";

// Get all inventory rows
// Return all units that are NOT released
export async function getAll() {
  const { data, error } = await supabase
    .from("inventory")
    .select(`
      *,
      customers ( customername, vsp, mpname )
    `)
    .or("status.is.null,status.eq.,status.neq.Released"); 
    // ✅ include NULL, blank, and anything not Released

  if (error) throw error;

  return data.map((item) => ({
    ...item,
    customer_name:
      item.status === "Hold" || item.status === "Allocated"
        ? item.customers?.customername || "—"
        : "",
    mpname:
      item.status === "Hold" || item.status === "Allocated"
        ? item.customers?.mpname || "—"
        : "",
  }));
}

export async function getById(cs) {
  const { data, error } = await supabase
    .from("inventory")
    .select(`
      cs,
      model,
      color,
      year,
      location,
      chassisnum,
      enginenum,
      keynum,
      weight,
      status,
      date,
      posteddate,
      date_tagged,
      vsp,
      customers ( customername, mpname )
    `)
    .eq("cs", cs)
    .single();
  if (error) throw error;
  // ✅ Flatten customername so EditDialog can bind directly
  return {
    ...data,
    customername: data.customers?.customername || "",
    mpname: data.customers?.mpname || "",
  };
}

// Create a new inventory row
export const create = async (row) => {
  const { data, error } = await supabase.from("inventory").insert([row]);
  if (error) throw error;
  return data; // returns inserted row(s)
};

// Update an inventory row by CS number
export const update = async (cs, row) => {
  const { data, error } = await supabase
    .from("inventory")
    .update({
      ...row,
      vsp: row.vsp, // ✅ make sure vsp is included
    })
    .eq("cs", cs);
  if (error) throw error;
  return data; // returns updated row(s)
};

// Delete an inventory row by CS number
export const remove = async (cs) => {
  const { data, error } = await supabase
    .from("inventory")
    .delete()
    .eq("cs", cs);
  if (error) throw error;
  return data; // returns deleted row(s)
};