import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import lodash from "lodash";

import { useAuthContext } from "../store";
import { usePost } from "../hooks/use-https";
import { POST_GENRES } from "../constants/api-endpoints";
import Spinner from "../ui/spinner";

function CreateGenre() {
  const [name, setName] = useState("");
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  const { error, loading, execute, success } = usePost(POST_GENRES, {
    sendAuthToken: true,
    lazy: true,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let genreName = lodash.capitalize(name);
    execute(POST_GENRES, { name: genreName });
  };

  useEffect(() => {
    if (success) {
      toast.success(`${name} added`, {
        autoClose: 1500,
      });
      navigate("/");
    }
  }, [success]);

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
          {error}
        </div>
        <div className="form-row">
          <button type="submit" className="btn btn-primary">
            <Spinner active={loading} />
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateGenre;
