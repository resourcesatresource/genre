import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Spinner from "../ui/spinner";
import { usePost } from "../hooks/use-https";
import { POST_AUTH } from "../constants/api-endpoints";
import { useUser } from "../services/user";
import { useAuthContext } from "../store";
import ErrorView from "./ErrorView";
import Card from "../ui/card";
import Icon from "../ui/icon";

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();
  const { authenticateUser: authenticate } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    execute: authenticateUser,
    error: authenticationError,
    data: authContext,
    loading,
  } = usePost(POST_AUTH, {
    lazy: true,
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!authenticationError && authContext) {
      const { secureToken, user } = authContext;

      authenticate({
        ...user,
        token: secureToken,
      });
    }
  }, [authContext, authenticationError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    authenticateUser(POST_AUTH, {
      email,
      password,
    });
  };

  return (
    <Card padding="xl" radius="lg" marginTop="xl" marginBottom="xl">
      <div className="text-center">
        <h1>Login</h1>
      </div>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-row mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="form-control"
            required
          />
        </div>
        <div className="form-row mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="form-control"
              required
            />
            <button
              class="btn border border-secondary-subtle"
              type="button"
              id="button-addon2"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <Icon type="solid" name={showPassword ? "eye-slash" : "eye"} />
            </button>
          </div>
        </div>
        <div className="form-row">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            <Spinner active={loading} />
            Submit
          </button>
        </div>
        <ErrorView mode="danger" error={authenticationError} />
      </form>
    </Card>
  );
};

export default Login;
