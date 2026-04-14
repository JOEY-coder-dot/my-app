import { supabase } from "../supabaseClient";

/**
 * Finalize invite by letting user set their password.
 * Must be called after exchangeCodeForSession().
 */
export const finalizeInvitePassword = async (newPassword) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  return { user: data?.user, error };
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