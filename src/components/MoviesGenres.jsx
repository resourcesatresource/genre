import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { useGet, useDelete } from "../hooks/use-https";
import FeatureAccess from "../ui/feature-access";
import Loader from "../ui/loader";
import { DELETE_GENRE, GET_GENRES } from "../constants/api-endpoints";
import ErrorView from "./ErrorView";
import { useAuthContext } from "../store";
import Icon from "../ui/icon";

function MoviesGenres() {
  const { id, isAdmin, isAuthenticated } = useAuthContext();
  const [genres, setGenres] = useState([]);
  const [message, setMessage] = useState("");
  const [recentlyDeletedItem, setRecentlyDeletedItem] = useState("");

  const { data, error, loading, serverIdle } = useGet(GET_GENRES, {
    sendAuthToken: false,
  });

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
      <p>Let's collaborate on creating list of movie genre.</p>

      <ErrorView error={serverIdle} mode="danger" marginBottom="md">
        <p className="d-flex align-items-center justify-content-center mb-2 text-center">
          Movies Genres uses free hosting service so the first call will take
          less than 1 minute <br /> Please be patient. <br />
        </p>
      </ErrorView>

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

          {isAuthenticated && (
            <>
              {id === genre?.author || isAdmin ? (
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
              ) : (
                <li className="list-group-item">
                  <button disabled className="btn btn-danger mx-3">
                    <Icon name="ban"></Icon>
                  </button>
                </li>
              )}
            </>
          )}
        </ul>
      ))}
      <FeatureAccess />
    </div>
  );
}

export default MoviesGenres;
