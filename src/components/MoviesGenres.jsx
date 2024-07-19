import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { useGet } from "../hooks/use-https";

function MoviesGenres() {
  const [genres, setGenres] = useState([]);
  const [message, setMessage] = useState("");
  const [cnt, setCnt] = useState(0);
  const [cookies, _] = useCookies("token");
  const { data, error } = useGet("/genres", { sendAuthToken: false });

  useEffect(() => {
    if (data) {
      setGenres(data);
    }
  }, [data]);

  function handleDelete(id) {
    console.log("Delete", id);
    fetch(`https://node-api-3m9u.onrender.com/api/genres/${id}`, {
      method: "DELETE",
      headers: {
        "x-auth-token": cookies.token,
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
      })
      .catch((err) => console.log(err));
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
          {cookies.token ? (
            <li className="list-group-item">
              <button
                onClick={() => handleDelete(genre._id)}
                className="btn btn-warning"
              >
                Delete
              </button>
            </li>
          ) : (
            ""
          )}
        </ul>
      ))}
    </div>
  );
}

export default MoviesGenres;
