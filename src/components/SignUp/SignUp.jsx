import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, Alert } from "antd";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../state/auth/authSlice";
import { useNavigate } from "react-router-dom";

const SignUpSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const authInfo = useSelector((state) => state.authInfo.auth);
  const { status, accessToken, refreshToken, error } = authInfo;

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (status === "succeeded" && accessToken) {
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      navigate("/home");
    }
  }, [status, accessToken, refreshToken, navigate]);

  const handleSubmit = () => {
    const result = SignUpSchema.safeParse(formData);

    if (result.success) {
      dispatch(register(formData));
      setErrors({});
      setIsSubmitted(true);
    } else {
      const errorMessages = {};
      result.error.errors.forEach((error) => {
        errorMessages[error.path[0]] = error.message;
      });
      setErrors(errorMessages);
      setIsSubmitted(false);
    }
  };

  const handleChange = (changedValues) => {
    setFormData((prev) => ({ ...prev, ...changedValues }));
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Sign Up</h2>
      <Form
        layout="vertical"
        onValuesChange={handleChange}
        onFinish={handleSubmit}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="First Name"
              validateStatus={errors.firstName ? "error" : ""}
              help={errors.firstName}
            >
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={(e) => handleChange({ firstName: e.target.value })}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Last Name"
              validateStatus={errors.lastName ? "error" : ""}
              help={errors.lastName}
            >
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={(e) => handleChange({ lastName: e.target.value })}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Email"
          validateStatus={errors.email ? "error" : ""}
          help={errors.email}
        >
          <Input
            name="email"
            value={formData.email}
            onChange={(e) => handleChange({ email: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          validateStatus={errors.password ? "error" : ""}
          help={errors.password}
        >
          <Input.Password
            name="password"
            value={formData.password}
            onChange={(e) => handleChange({ password: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          validateStatus={errors.confirmPassword ? "error" : ""}
          help={errors.confirmPassword}
        >
          <Input.Password
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => handleChange({ confirmPassword: e.target.value })}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginTop: "10px" }}
        />
      )}
    </div>
  );
};

export default SignUp;
