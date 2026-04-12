import { supabase } from "../supabaseClient";

// Register a new user (email + password + optional username in metadata)
export const register = async (email, password, username) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username } // stored in user_metadata
    }
  });
  if (error) throw error;
  return data;
};

// Login with email + password
export const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
};

// Check if user is logged in
export const isLoggedIn = async () => {
  const { data } = await supabase.auth.getSession();
  return !!data.session;
};

// Get current user's email or username
export const getUsername = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return "Guest";
  return data.user.email || "Guest";
};

// Logout
export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};