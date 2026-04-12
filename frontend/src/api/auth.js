import { supabase } from "../supabaseClient";

// --- Auth calls ---
export const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const register = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// --- Token helpers ---
export const getToken = () => {
  const session = supabase.auth.getSession();
  return session?.access_token || null;
};

export const isLoggedIn = async () => {
  const { data } = await supabase.auth.getSession();
  return !!data.session;
};