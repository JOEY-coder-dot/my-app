import { createClient } from "@supabase/supabase-js";

// Service role key — keep secret in backend only
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, username, position, role } = req.body;

  try {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      email_confirm: false, // Supabase will send invite email
      user_metadata: { username, position, role },
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ user: data.user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}