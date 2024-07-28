import React, { useState, useEffect, lazy } from "react";
import { toast } from "react-toastify";
import { useGet, useDelete } from "../hooks/use-https";
import FeatureAccess from "../ui/feature-access";
import { ROLES } from "../constants";
import Loader from "../ui/loader";
import { DELETE_GENRE, GET_GENRES } from "../constants/api-endpoints";

function MoviesGenres() {
  const [genres, setGenres] = useState([]);
  const [message, setMessage] = useState("");
  const [recentlyDeletedItem, setRecentlyDeletedItem] = useState("");

  const { data, error, loading } = useGet(GET_GENRES, { sendAuthToken: false });
  const {
    error: deleteError,
    execute: deleteGenre,
    success,
  } = useDelete(DELETE_GENRE, {
    sendAuthToken: true,
    lazy: true,
  });

  useEffect(() => {
    if (data) {
      setGenres(data);
    }
  }, [data]);

  useEffect(() => {
    if (deleteError) {
      setMessage(deleteError);
    }
    if (!deleteError && success) {
      toast.success(`${recentlyDeletedItem} Deleted`, {
        autoClose: 1500,
      });
      setTimeout(() => {
        location.reload();
      }, 2500);
    }
  }, [success, deleteError]);

  const handleDelete = (id) => {
    deleteGenre(DELETE_GENRE.replace(":id", id));
  };

  return (
    <div className="container mt-2 mb-5">
      <h1>Movies Genres:</h1>
      <p>Let's collaborate on creating list of movie genre</p>
      {error && <p className="text-center text-danger">{error}</p>}
      {message ? <p className="text-center text-danger">{message}</p> : ""}
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
                onClick={() => {
                  setRecentlyDeletedItem(genre?.name);
                  handleDelete(genre._id);
                }}
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
