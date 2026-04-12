import { supabase } from "../supabaseClient";

// Get all customers
export const getAllCustomers = async () => {
  const { data, error } = await supabase.from("customers").select("*");
  if (error) throw error;
  return { data };
};

// Get a single customer by VSP
export const getCustomerById = async (vsp) => {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("vsp", vsp)
    .single();
  if (error) throw error;
  return { data };
};

// Add a new customer
export const addCustomer = async (row) => {
  const { data, error } = await supabase.from("customers").insert([row]);
  if (error) throw error;
  return { data };
};

// Update an existing customer
export const updateCustomer = async (vsp, row) => {
  const { data, error } = await supabase
    .from("customers")
    .update(row)
    .eq("vsp", vsp);
  if (error) throw error;
  return { data };
};

// Delete a customer
export const removeCustomer = async (vsp) => {
  const { error } = await supabase.from("customers").delete().eq("vsp", vsp);
  if (error) throw error;
};