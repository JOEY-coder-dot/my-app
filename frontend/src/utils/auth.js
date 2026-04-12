import { supabase } from "../supabaseClient";

// Save session automatically (Supabase handles this internally)
export const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
};

export const isLoggedIn = async () => {
  const { data } = await supabase.auth.getSession();
  return !!data.session;
};

export const getUsername = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return "Guest";
  // You can store extra fields in a "profiles" table if you want more than email
  return data.user.email || "Guest";
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};