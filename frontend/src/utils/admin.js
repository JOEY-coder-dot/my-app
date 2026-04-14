import { createClient } from "@supabase/supabase-js";

// Use service role key here (keep it secret, server-side only)
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

/**
 * Create a new user and send invite email automatically.
 */
export const inviteUser = async (email, username, position) => {
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    email_confirm: false, // Supabase will send invite email
    user_metadata: { username, position },
  });

  if (error) throw error;
  return data.user;
};