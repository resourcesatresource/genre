import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { useGet } from "../hooks/use-https";
import FeatureAccess from "../ui/feature-access";
import { ROLES } from "../constants";
import configs from "../configs";
import Loader from "../ui/loader";
import { useAuthContext } from "../store";

function MoviesGenres() {
  const { authToken } = useAuthContext();
  const [genres, setGenres] = useState([]);
  const [message, setMessage] = useState("");
  const [cnt, setCnt] = useState(0);

  const { data, error, loading } = useGet("/genres", { sendAuthToken: false });

  useEffect(() => {
    if (data) {
      setGenres(data);
    }
  }, [data]);

  function handleDelete(id) {
    fetch(`${configs.API_BASE_URL}/genres/${id}`, {
      method: "DELETE",
      headers: {
        "x-auth-token": authToken,
      },
    })
      .then((res) => {
        if (res.status == 403) {
          setMessage("You are not an admin, so you can't delete genre!");
          setCnt((cnt) => cnt + 1);
          return;
        }
        return res.json();
      })
      .then((res) => {
        toast.warn(`${res.name} deleted`, {
          autoClose: 1500,
        });
        setTimeout(() => {
          location.reload();
        }, 2500);
      })
      .catch((err) => {
        toast.error("Something went wrong!", {
          autoClose: 1500,
        });
        console.log(err);
      });
  }
  return (
    <div className="container mt-2 mb-5">
      <h1>Movies Genres:</h1>
      <p>Let's collaborate on creating list of movie genre</p>
      {error && <p className="text-center text-danger">{error}</p>}
      {message ? (
        <p className="text-center text-danger">
          {cnt} {message}
        </p>
      ) : (
        ""
      )}
      {loading && <Loader />}
      {genres.map((genre) => (
        <ul
          key={genre._id}
          className="list-group list-group-horizontal mb-2"
          style={{
            boxShadow:
              "0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.095)",
          }}
        >
          <li className="list-group-item flex-fill d-flex align-items-center justify-content-center text-center">
            <strong>{genre.name}</strong>
          </li>

          <FeatureAccess allowed={ROLES.ADMIN}>
            <li className="list-group-item">
              <button
                onClick={() => handleDelete(genre._id)}
                className="btn btn-warning"
              >
                Delete
              </button>
            </li>
          </FeatureAccess>
        </ul>
      ))}
      <FeatureAccess />
    </div>
  );
}

export default MoviesGenres;
