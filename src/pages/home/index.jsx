import React, { useState, useEffect } from "react";
import { isArray } from "lodash";

import { useGet, useDelete } from "../../hooks/use-https";
import Loader from "../../ui/loader";
import { DELETE_GENRE, GET_GENRES } from "../../constants/api-endpoints";
import ErrorView from "../../components/ErrorView";
import { useAuthContext } from "../../store";
import { useToast } from "../../hooks/use-toast";
import Button from "../../ui/button";
import { ErrorField, STRINGS } from "./helpers";
import EditModal from "./edit-modal";
import Portal from "../../ui/styled-component/portal";
import Icon from "../../ui/icon";

const Home = () => {
  const { id, isAdmin, isAuthenticated } = useAuthContext();
  const { openToast } = useToast();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [genres, setGenres] = useState([]);
  const [editData, setEditData] = useState({
    id: "",
    name: "",
  });
  const [recentlyAlteredItem, setRecentlyAlteredItem] = useState({
    delete: "",
  });

  const [errors, setErrors] = useState({
    deleteError: "",
    getError: "",
  });

  const { data, error, loading, serverIdle, execute } = useGet(GET_GENRES, {
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
      const sortedData = data.sort((a, b) => {
        if (a?.author === id) return -1;
        if (b?.author === id) return 1;
        return 0;
      });

      setGenres(sortedData);
    }
  }, [data, error]);

  useEffect(() => {
    if (deleteError) {
      setErrorField(ErrorField.deleteError, deleteError);
    }

    if (!deleteError && success) {
      openToast(
        STRINGS.page.deletionSuccessMessage.replace(
          "{{deletedItem}}",
          recentlyAlteredItem.delete
        ),
        "error"
      );
      execute();
    }
  }, [success, deleteError]);

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

    setEditData({
      id,
      name,
    });
    setIsEditModalVisible(true);
  };

  return (
    <div className="container mt-2 mb-5">
      <EditModal
        data={editData}
        isVisible={isEditModalVisible}
        setIsVisible={setIsEditModalVisible}
        onSuccess={execute}
      />

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

      <Portal isVisible={loading || deleteGenreLoading}>
        <Loader isLoading={loading || deleteGenreLoading} />
      </Portal>

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
            }`}
          >
            <div className={isAuthenticated ? "" : "text-center"}>
              <strong>{genre.name}</strong>
              {genre?.authorId && (
                <div className="d-flex">
                  <Icon name="user-edit" marginRight="sm"></Icon>
                  <i>{genre?.authorName ?? "-"}</i>
                </div>
              )}
            </div>
          </li>

          {isAuthenticated && id === genre?.author && (
            <li className="list-group-item">
              <Button
                mode="warning"
                icon="pen-to-square"
                onClick={() => openEditModal(genre?._id, genre?.name)}
              ></Button>
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
                    icon="trash"
                  ></Button>
                </li>
              ) : (
                <li className="list-group-item">
                  <Button mode="danger" icon="ban" disabled></Button>
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
