import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../style/Auth.css";
import { login } from "../../utils/auth";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    setTouched({ ...touched, [name]: true });

    const newErrors = {};
    if (!newFormData.email) newErrors.email = "Email is required";
    if (!newFormData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrors({
        email: !formData.email ? "Email is required" : "",
        password: !formData.password ? "Password is required" : "",
      });
      return;
    }

    try {
      const res = await login(formData.email, formData.password);
      if (res.user) {
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
      alert(err.message || "Login failed");
    }
  };

  return (
    <div className="auth-card">
      <h2 className="auth-title">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="auth-field">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {touched.email && errors.email && (
            <p className="auth-error">{errors.email}</p>
          )}
        </div>

        <div className="auth-field">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {touched.password && errors.password && (
            <p className="auth-error">{errors.password}</p>
          )}
        </div>

        <button type="submit" className="auth-button">Login</button>
      </form>

      <p className="auth-link">
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
      <p className="auth-link">
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>
    </div>
  );
}