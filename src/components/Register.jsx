import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import configs from "../configs";
function Auth() {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${configs.API_BASE_URL}/users`, {
        name,
        email,
        password,
      });
      console.log(response);
      if (response.data === "User already exist with this email") {
        toast.warn("User already exist with this email", {
          autoClose: 1500,
        });
        return;
      }
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="container p-5 rounded-4 mt-5 mb-5"
      style={{
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
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
            onChange={(e) => setname(e.target.value)}
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
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setpassword(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-row">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Auth;
