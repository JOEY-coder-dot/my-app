import { supabase } from "../supabaseClient";

// Register a new user and insert into profiles table
export const register = async (email, password, username, position = null) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username, position }, // still stored in user_metadata
    },
  });

  if (error) throw error;

  const user = data.user;

  // If email confirmation is enabled, user may be null until confirmed
  if (user) {
    const { error: profileError } = await supabase
      .from("profiles")
      .insert([{ id: user.id, username, position }]);

    if (profileError) throw profileError;
  }

  return { user: data.user, session: data.session };
};

// Login with email + password
export const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return { user: data.user, session: data.session };
};

// Check if user is logged in
export const isLoggedIn = async () => {
  const { data } = await supabase.auth.getSession();
  return !!data.session;
};

// Get current user's username or email
export const getUsername = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return "Guest";

  // Prefer username from user_metadata, fallback to email
  return data.user.user_metadata?.username || data.user.email || "Guest";
};

// Logout
export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};