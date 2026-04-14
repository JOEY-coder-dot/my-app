import React, { useState } from "react";
import { validateRegisterForm } from "../../utils/registerValidation";
import { Link, useNavigate } from "react-router-dom";
import "../../style/Auth.css";
import { register } from "../../utils/auth";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    position: "" // ✅ new field
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    setTouched({ ...touched, [name]: true });

    const newErrors = validateRegisterForm(newFormData);
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateRegisterForm(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const { user } = await register(
        formData.email,
        formData.password,
        formData.username,
        formData.position
      );

      if (user) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        // ⚠️ Email confirmation enabled
        alert("Check your email to confirm registration before logging in.");
      }
    } catch (err) {
      console.error("Error registering:", err);

      // Handle duplicate username gracefully
      if (err.message?.includes("duplicate key value")) {
        alert("That username is already taken. Please choose another.");
      } else {
        alert(err.message || "Registration failed");
      }
    }
  };

  return (
    <div className="auth-card">
      <h2 className="auth-title">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="auth-field">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          {touched.username && errors.username && (
            <p className="auth-error">{errors.username}</p>
          )}
        </div>

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

        <div className="auth-field">
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={formData.position}
            onChange={handleChange}
          />
          {touched.position && errors.position && (
            <p className="auth-error">{errors.position}</p>
          )}
        </div>

        <button type="submit" className="auth-button">Register</button>

        <p className="auth-link" style={{ marginTop: "1rem" }}>
          Already have an account? <Link to="/login">Back to Login</Link>
        </p>
      </form>
    </div>
  );
}