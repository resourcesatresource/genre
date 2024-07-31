import "bootstrap/dist/css/bootstrap.min.css";
import { useCookies } from "react-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../ui/spinner";
import { usePost } from "../hooks/use-https";
import { POST_AUTH } from "../constants/api-endpoints";

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies([
    "token",
    "user",
    "isAdmin",
    "id",
    "name",
  ]);

  const {
    execute: authenticateUser,
    error: authenticationError,
    data: authContext,
    loading,
  } = usePost(POST_AUTH, {
    lazy: true,
  });

  // Todo: Will soon handle with local storage
  useEffect(() => {
    if (!authenticationError && authContext) {
      const { secureToken, user } = authContext;

      setCookies("token", secureToken);
      setCookies("user", user.email);
      setCookies("isAdmin", user.isAdmin);
      setCookies("id", user._id);
      setCookies("name", user?.name);

      navigate("/");

      toast.success(`Welcome, ${user.email}`, {
        autoClose: 2500,
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
    <div
      className="container p-5 rounded-4 mt-5 mb-5"
      style={{
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <div>
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
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="form-control"
            required
          />
        </div>
        <div className="form-row">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            <Spinner active={loading} />
            Submit
          </button>
        </div>
        <div className="text-danger text-center">{authenticationError}</div>
      </form>
    </div>
  );
};

export default Auth;
