import "bootstrap/dist/css/bootstrap.min.css";
import { useCookies } from "react-cookie";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import lodash from "lodash";
import configs from "../configs";

function CreateGenre() {
  const [name, setName] = useState("");
  const [cookies, _] = useCookies("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.token) {
      navigate("/login");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let genreName = lodash.capitalize(name);
    try {
      const response = await axios.post(
        `${configs.API_BASE_URL}/genres`,
        {
          name: genreName,
        },
        {
          headers: {
            "x-auth-token": cookies.token,
          },
        }
      );
      navigate("/");

      if (response.status == 200)
        toast.success(`${genreName} added`, {
          autoClose: 1500,
        });
      // Successfully added genre
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
        <h1>Add movies genres to the list</h1>
      </div>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-row mb-4">
          <label htmlFor="genre" className="form-label">
            Genre Name:
          </label>
          <input
            type="text"
            name="name"
            id="genre"
            onChange={(e) => setName(e.target.value)}
            value={name}
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

export default CreateGenre;
