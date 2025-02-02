import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Container, Card, InputGroup  } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    let formErrors = {};

    if (!email) formErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) formErrors.email = "Invalid email";
    if (!password) formErrors.password = "Password is required";

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const response = await axios.post("http://localhost:8081/api/login", { email, password });
        const { token } = response.data;
        localStorage.setItem("token", token); // Store the token for authentication
        navigate("/"); // Redirect to the home page after login
      } catch (error) {
        setErrors({ general: error.response?.data?.message || "An unexpected error occurred" });
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
        <Card.Title className="text-center mb-4">Login</Card.Title>
        <Card.Body>
          {errors.general && <div className="alert alert-danger">{errors.general}</div>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  isInvalid={!!errors.password}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ borderRadius: "0 0.25rem 0.25rem 0" }}
                >
                  {showPassword ? <EyeSlashFill /> : <EyeFill />}
                </Button>
              </InputGroup>
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>

            <Button variant="dark" type="submit" className="w-100 mb-3" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>

            <Link to="/register" className="btn btn-outline-dark w-100 mt-2">
              Don't have an account? Register
            </Link>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginForm;
