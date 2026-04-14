import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { finalizeInvitePassword } from "../../utils/auth";

export default function SetPassword() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Exchange invite/confirmation token for a session
    const processInvite = async () => {
      const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);
      if (error) {
        alert("Invite link invalid or expired");
        navigate("/login");
      }
    };
    processInvite();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await finalizeInvitePassword(password);
    setLoading(false);

    if (error) {
      alert("Failed to set password: " + error.message);
    } else {
      alert("Password set successfully! You can now log in.");
      navigate("/login");
    }
  };

  return (
    <div className="auth-card">
      <h2 className="auth-title">Set Your Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="auth-field">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? "Saving..." : "Set Password"}
        </button>
      </form>
    </div>
  );
}