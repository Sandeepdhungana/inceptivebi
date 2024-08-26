import React, { useEffect, useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../state/auth/authSlice";
import { useNavigate } from "react-router-dom";

const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
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
  }, [token]);

  useEffect(() => {
    if (status === "succeeded" && accessToken) {
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      navigate("/home");
    }
  }, [status, accessToken, navigate]);

  const handleSubmit = () => {
    const result = LoginSchema.safeParse(formData);

    if (result.success) {
      dispatch(login(formData));
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
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <Form
        layout="vertical"
        onValuesChange={handleChange}
        onFinish={handleSubmit}
      >
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
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
      </Form>
      {status === "failed" && error && (
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

export default Login;
