import { supabase } from "../supabaseClient";

// Get all inventory rows
export const getAll = async () => {
  const { data, error } = await supabase.from("inventory").select("*");
  if (error) {
    console.error("getAll error:", error);
    return { data: [] }; // always return an array
  }
  return { data: data || [] };
};

// Get a single row by CS number
export const getById = async (cs) => {
  const { data, error } = await supabase
    .from("inventory")
    .select("*")
    .eq("cs", cs)
    .single();
  if (error) {
    console.error("getById error:", error);
    return { data: null };
  }
  return { data: data || null };
};

// Create a new inventory row
export const create = async (row) => {
  const { data, error } = await supabase.from("inventory").insert([row]);
  if (error) {
    console.error("create error:", error);
    return { data: [] };
  }
  return { data: data || [] };
};

// Update an inventory row by CS number
export const update = async (cs, row) => {
  const { data, error } = await supabase
    .from("inventory")
    .update(row)
    .eq("cs", cs);
  if (error) {
    console.error("update error:", error);
    return { data: [] };
  }
  return { data: data || [] };
};

// Delete an inventory row by CS number
export const remove = async (cs) => {
  const { data, error } = await supabase
    .from("inventory")
    .delete()
    .eq("cs", cs);
  if (error) {
    console.error("remove error:", error);
    return { data: [] };
  }
  return { data: data || [] };
};