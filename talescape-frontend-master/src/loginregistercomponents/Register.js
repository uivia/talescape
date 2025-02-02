import React, { useState } from "react";
import { Form, Button, Container, Card, ProgressBar, InputGroup } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let updatedErrors = { ...errors };

    if (name === "email") {
      updatedErrors.email = !/^\S+@\S+\.\S+$/.test(value) ? "Invalid email" : "";
    }

    if (name === "password") {
      setPasswordStrength(checkPasswordStrength(value));
    }

    if (name === "confirmPassword") {
      updatedErrors.confirmPassword = value !== formData.password ? "Passwords do not match" : "";
    }

    setErrors(updatedErrors);
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 30;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[@$!%*?&]/.test(password)) strength += 30;
    return strength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = {};

    if (!formData.name) formErrors.name = "Name is required";
    if (!formData.email) formErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) formErrors.email = "Invalid email format";
    if (!formData.password) formErrors.password = "Password is required";
    else if (formData.password.length < 8) formErrors.password = "Password must be at least 8 characters long";
    if (formData.confirmPassword !== formData.password) formErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const response = await axios.post("http://localhost:8081/api/register", formData);
        console.log("Response:", response); // Debugging line to check the API response
        navigate("/login");
      } catch (error) {
        console.error("Error:", error.response?.data); // Debugging line to log the error response
        setErrors({ general: error.response?.data?.message || "An error occurred" });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <Card style={{ width: "100%", maxWidth: "400px", padding: "20px" }}>
        <Card.Title className="text-center mb-4">Register</Card.Title>
        <Card.Body>
          {errors.general && <div className="alert alert-danger">{errors.general}</div>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeSlashFill /> : <EyeFill />}
                </Button>
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <ProgressBar
              now={passwordStrength}
              variant={passwordStrength < 40 ? "danger" : passwordStrength < 70 ? "warning" : "success"}
              className="mb-3"
            />
            <small>
              {passwordStrength < 40 ? "Weak" : passwordStrength < 70 ? "Medium" : "Strong"}
            </small>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Retype password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  isInvalid={!!errors.confirmPassword}
                />
                <Button variant="outline-secondary" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <EyeSlashFill /> : <EyeFill />}
                </Button>
                <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Button variant="dark" type="submit" className="w-100 mb-3" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register"}
            </Button>

            <Link to="/login" className="btn btn-outline-dark w-100">
              Already have an account? Login
            </Link>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
