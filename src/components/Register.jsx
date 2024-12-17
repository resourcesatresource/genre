import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { usePost } from "../hooks/use-https";
import { POST_USER } from "../constants/api-endpoints";
import Card from "../ui/card";
import ErrorView from "./ErrorView";
import { useUser } from "../services/user";
import Icon from "../ui/icon";
import Button from "../ui/button";

function Register() {
  const navigate = useNavigate();
  const { authenticateUser } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { data, error, execute, loading } = usePost(POST_USER, {
    lazy: true,
  });

  useEffect(() => {
    if (!error && data) {
      authenticateUser(data);
      navigate("/login");
    }
  }, [data, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    execute(POST_USER, {
      name,
      email,
      password,
    });
  };

  return (
    <div className="mx-3">
      <Card padding="xl" radius="lg" marginTop="xl" marginBottom="xl">
        <div className="text-center">
          <h1>Register</h1>
        </div>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-row mb-4">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-row mb-4">
            <label htmlFor="username" className="form-label">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-row mb-4">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                required
              />
              <button
                className="btn border border-secondary-subtle"
                type="button"
                id="button-addon2"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <Icon type="solid" name={showPassword ? "eye-slash" : "eye"} />
              </button>
            </div>
          </div>
          <div className="form-row">
            <Button type="submit" disabled={loading} isLoading={loading}>
              Submit
            </Button>
          </div>
        </form>
        <ErrorView mode="danger" error={error} />
      </Card>
    </div>
  );
}

export default Register;
