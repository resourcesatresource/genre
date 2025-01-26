import React, { useState } from "react";

import { EditModalProps } from "./types";
import Modal from "../../ui/modal";
import InputText from "../../ui/input-text";
import ErrorView from "../../components/ErrorView";
import { t } from "../../services/i18n";

const RequestResetPasswordModal: React.FC<EditModalProps> = ({
  isVisible,
  setIsVisible,
  onSave,
  error,
  isLoading,
}) => {
  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState("");

  const onSaveClick = () => {
    if (!email?.length) {
      setValidationError(
        t("login.request_reset_password_modal.inputs.email.errors.empty.label")
      );
      return;
    }

    onSave(email);
  };

  const onChange = (email: string) => {
    setValidationError("");
    setEmail(email);
  };

  return (
    <Modal
      title={t("login.request_reset_password_modal.title")}
      isLoading={isLoading}
      showFooter
      isVisible={isVisible}
      disabled={isLoading || !email?.trim()?.length}
      onSave={onSaveClick}
      setIsVisible={setIsVisible as () => {}}
    >
      <InputText
        value={email}
        label={t("login.request_reset_password_modal.inputs.email.label")}
        onChange={onChange}
        error={validationError}
      />
      <ErrorView error={error ?? undefined} mode="danger"></ErrorView>
    </Modal>
  );
};

export default RequestResetPasswordModal;
