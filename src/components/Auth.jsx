import "bootstrap/dist/css/bootstrap.min.css";
import { useCookies } from "react-cookie";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Auth() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setpassword] = useState("");
  const [_, setCookies] = useCookies(["token", "user"]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://node-api-3m9u.onrender.com/api/auth",
        {
          email,
          password,
        }
      );
      // if credentials are invalid return with a message
      if (response.data === "Invalid Password or User") {
        console.log("Invalid Credentials");
        setMessage("Invalid Password");
        return;
      }
      if (response.data === "user not found") {
        console.log("Invalid Credentials");
        setMessage("No user with given email");
        return;
      }

      setCookies("token", response.data);
      setCookies("user", email);
      navigate("/");
      toast.success(`Welcome, ${email}`, {
        autoClose: 2500,
      });
      // setTimeout(() => {
      //   location.reload();
      // }, 3000);
    } catch (error) {
      console.log(error);
      setMessage("Sorry, try after sometime");
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
            onChange={(e) => setpassword(e.target.value)}
            value={password}
            className="form-control"
          />
        </div>
        <div className="form-row">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <div className="text-danger text-center">{message}</div>
      </form>
    </div>
  );
}

export default Auth;
