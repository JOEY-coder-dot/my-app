import { useState } from "react";
import "../../style/Auth.css";
import { supabase } from "../supabaseClient";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: import.meta.env.VITE_RESET_REDIRECT_URL, 
        // ✅ Use env variable so it works in dev + prod
      });

      if (error) {
        setError(error.message);
      } else {
        setMessage("Password reset link sent to your email.");
      }
    } catch (err) {
      setError("Unexpected error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h2 className="auth-title">Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="auth-field">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading} className="auth-button">
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
      {message && <p className="auth-success">{message}</p>}
      {error && <p className="auth-error">{error}</p>}
    </div>
  );
}