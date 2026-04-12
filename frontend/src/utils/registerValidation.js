// Simple regex-based validation
export function validateRegisterForm(data) {
  const errors = {};

  // Name: at least 3 characters, letters/spaces only
  const nameRegex = /^[A-Za-z\s]{3,50}$/;
  if (!data.name) {
    errors.name = "Name is required";
  } else if (!nameRegex.test(data.name)) {
    errors.name = "Name must be 3–50 letters long";
  }

  // Email: basic email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "Invalid email format";
  }

  // Password: at least 8 characters, allow letters/numbers/symbols
  const passwordRegex = /^.{8,128}$/;
  if (!data.password) {
    errors.password = "Password is required";
  } else if (!passwordRegex.test(data.password)) {
    errors.password = "Password must be 8–128 characters";
  }

  // Role: must be one of admin/user/manager
  if (data.role && !["admin", "user", "manager"].includes(data.role)) {
    errors.role = "Invalid role";
  }

  return errors;
}