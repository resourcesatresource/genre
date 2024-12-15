import React, { useState, useEffect, useRef } from "react";
import { isArray } from "lodash";

import { useGet, useDelete, usePut } from "../../hooks/use-https";
import Loader from "../../ui/loader";
import {
  DELETE_GENRE,
  GET_GENRES,
  PUT_GENRE,
} from "../../constants/api-endpoints";
import ErrorView from "../../components/ErrorView";
import { useAuthContext } from "../../store";
import Icon from "../../ui/icon";
import { useToast } from "../../hooks/use-toast";
import Modal from "../../ui/modal";
import InputText from "../../ui/input-text";
import Button from "../../ui/button";
import { ErrorField, STRINGS } from "./helpers";
import { GENRE_CHARACTER_LIMIT } from "../../constants";

const Home = () => {
  const { id, isAdmin, isAuthenticated } = useAuthContext();
  const { openToast } = useToast();
  const [genres, setGenres] = useState([]);
  const [editId, setEditId] = useState("");
  const [genreName, setGenreName] = useState("");
  const [recentlyAlteredItem, setRecentlyAlteredItem] = useState({
    put: "",
    delete: "",
  });
  const [errors, setErrors] = useState({
    putError: "",
    deleteError: "",
    getError: "",
  });
  const modalRef = useRef();

  const { data, error, loading, serverIdle } = useGet(GET_GENRES, {
    sendAuthToken: false,
  });

  const {
    error: deleteError,
    execute: deleteGenre,
    loading: deleteGenreLoading,
    success,
  } = useDelete(DELETE_GENRE, {
    sendAuthToken: true,
    lazy: true,
  });

  const {
    error: putError,
    execute: putGenre,
    success: putSuccess,
    loading: putGenreLoading,
  } = usePut(PUT_GENRE, {
    sendAuthToken: true,
    lazy: true,
  });

  const setErrorField = (field, value = "") => {
    setErrors((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (error) {
      setErrorField(ErrorField.getError, error);
    }

    if (data && !error && isArray(data)) {
      setGenres(data);
    }
  }, [data, error]);

  useEffect(() => {
    if (deleteError) {
      setErrorField(ErrorField.deleteError, deleteError);
    }

    if (!deleteError && success) {
      openToast(`${recentlyAlteredItem.delete} Deleted`, "error");
      setTimeout(() => {
        location.reload();
      }, 2500);
    }
  }, [success, deleteError]);

  useEffect(() => {
    if (putError) {
      setErrorField(ErrorField.putError, putError);
    }

    if (!putError && putSuccess) {
      openToast(`${recentlyAlteredItem.put} Saved`, "success");
      setTimeout(() => {
        location.reload();
      }, 2500);
    }
  }, [putError, putSuccess]);

  const handleDelete = (id, name = "") => {
    setErrorField(ErrorField.deleteError);

    setRecentlyAlteredItem((prev) => ({
      ...prev,
      delete: name,
    }));

    deleteGenre(DELETE_GENRE.replace(":id", id));
  };

  const openEditModal = (id = "", name = "") => {
    if (!id) {
      return;
    }

    setEditId(id);
    setGenreName(name);

    setErrorField(ErrorField.putError);

    modalRef?.current?.open();
  };

  const onGenreNameChange = (name) => {
    setErrorField(ErrorField.putError);
    setRecentlyAlteredItem((prev) => ({
      ...prev,
      put: name,
    }));
    setGenreName(name);
  };

  const handleGenreSubmission = () => {
    if (
      genreName?.length < GENRE_CHARACTER_LIMIT.min ||
      genreName?.length > GENRE_CHARACTER_LIMIT.max
    ) {
      setErrorField(ErrorField.putError, STRINGS.errors.genreLengthRequirement);

      return;
    }

    putGenre(PUT_GENRE.replace(":id", editId), {
      name: genreName,
    });
  };

  return (
    <div className="container mt-2 mb-5">
      <Modal
        ref={modalRef}
        title={STRINGS.editModal.title}
        onSave={handleGenreSubmission}
        showFooter
        isLoading={putGenreLoading}
      >
        <InputText
          value={genreName}
          label={STRINGS.editModal.inputLabel}
          onChange={onGenreNameChange}
        />
        <ErrorView error={errors.putError} mode="danger"></ErrorView>
      </Modal>

      <h1>{STRINGS.page.title}</h1>
      <p>{STRINGS.page.subTitle}</p>

      <ErrorView error={serverIdle} mode="danger" marginBottom="md">
        <p className="d-flex align-items-center justify-content-center mb-2 text-center">
          {STRINGS.errors.serverIdle}
        </p>
      </ErrorView>

      <ErrorView
        mode="danger"
        error={errors.deleteError}
        marginBottom="sm"
      ></ErrorView>

      <ErrorView
        mode="danger"
        error={errors.getError}
        marginBottom="sm"
      ></ErrorView>

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
          <li
            className={`list-group-item flex-fill d-flex align-items-center justify-content-${
              isAuthenticated ? "start" : "center"
            } text-center`}
          >
            <strong>{genre.name}</strong>
          </li>

          {isAuthenticated && id === genre?.author && (
            <li className="list-group-item">
              <Button
                mode="warning"
                onClick={() => openEditModal(genre?._id, genre?.name)}
              >
                <Icon name="pen-to-square" />
              </Button>
            </li>
          )}

          {isAuthenticated && (
            <>
              {id === genre?.author || isAdmin ? (
                <li className="list-group-item">
                  <Button
                    mode="danger"
                    onClick={() => handleDelete(genre?._id, genre?.name)}
                    disabled={deleteGenreLoading}
                  >
                    <Icon name="trash" />
                  </Button>
                </li>
              ) : (
                <li className="list-group-item">
                  <Button mode="danger" disabled>
                    <Icon name="ban"></Icon>
                  </Button>
                </li>
              )}
            </>
          )}
        </ul>
      ))}
    </div>
  );
};

export default Home;
