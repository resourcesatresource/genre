import React, { useEffect, useState } from "react";

import { EditModalProps } from "./typings";
import Modal from "../../ui/modal";
import { STRINGS } from "./helpers";
import InputText from "../../ui/input-text";
import { usePut } from "../../hooks/use-https";
import { PUT_GENRE } from "../../constants/api-endpoints";
import { GENRE_CHARACTER_LIMIT } from "../../constants";
import ErrorView from "../../components/ErrorView";
import { useToast } from "../../hooks/use-toast";

const EditModal: React.FC<EditModalProps> = ({
  data,
  isVisible,
  setIsVisible,
  onSuccess,
}) => {
  const { openToast } = useToast();
  const [name, setName] = useState("");
  const [errorMessage, setMessageError] = useState("");

  const { error, execute, success, loading } = usePut(PUT_GENRE, {
    sendAuthToken: true,
    lazy: true,
  });

  useEffect(() => {
    if (error) {
      setMessageError(error);
    }

    if (!error && success) {
      setIsVisible(false);
      openToast(
        STRINGS.editModal.successMessage.replace("{{name}}", name),
        "success"
      );
      onSuccess();
    }
  }, [error, success]);

  useEffect(() => {
    setMessageError("");
    setName(data.name);
  }, [data]);

  const handleGenreSubmission = () => {
    if (
      name?.length < GENRE_CHARACTER_LIMIT.min ||
      name?.length > GENRE_CHARACTER_LIMIT.max
    ) {
      setMessageError(STRINGS.errors.genreLengthRequirement);
      return;
    }

    execute(PUT_GENRE.replace(":id", data.id), {
      name,
    });
  };

  const onChange = (name: string) => {
    setName(name);
  };

  return (
    <Modal
      title={STRINGS.editModal.title}
      onSave={handleGenreSubmission}
      showFooter
      isLoading={loading}
      isVisible={isVisible}
      setIsVisible={setIsVisible as () => {}}
      disabled={data.name === name}
    >
      <InputText
        value={name}
        label={STRINGS.editModal.inputLabel}
        onChange={onChange}
      />
      <ErrorView error={errorMessage} mode="danger"></ErrorView>
    </Modal>
  );
};

export default EditModal;
