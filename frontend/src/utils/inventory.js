import { supabase } from "../supabaseClient";

// Get all inventory rows
export const getAll = async () => {
  const { data, error } = await supabase.from("inventory").select("*");
  if (error) throw error;
  return data; // returns array of items
};

// Get a single row by CS number
export const getById = async (cs) => {
  const { data, error } = await supabase
    .from("inventory")
    .select("*")
    .eq("cs", cs)
    .single();
  if (error) throw error;
  return data; // returns one item object
};

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
    .update(row)
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