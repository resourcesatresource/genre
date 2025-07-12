import React, { useEffect, useState } from "react";

import {
  ConnectionDataField,
  ConnectionFormData,
  EditModalProps,
} from "./typings";
import Modal from "../../ui/modal";
import InputText from "../../ui/input-text";
import { usePatch } from "../../hooks/use-https";
import { PATCH_CONNECTIONS } from "../../constants/api-endpoints";
import ErrorView from "../../components/ErrorView";
import Button from "../../ui/button";
import { isValidUrl, setClipboardText } from "../../helpers/utils";
import Icon from "../../ui/icon";
import { useAuthContext } from "../../store";
import { STRINGS } from "./helpers";
import { CONNECT_URL } from "../../constants";

const CreateModal: React.FC<EditModalProps> = ({ onSuccess }) => {
  const { id } = useAuthContext();
  const [formData, setFormData] = useState<ConnectionFormData>({
    name: "",
    url: "",
  });
  const [errors, setErrors] = useState<ConnectionFormData>({
    name: "",
    url: "",
    description: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isURLCopied, setIsURLCopied] = useState(false);

  const { error, execute, success, loading } = usePatch(PATCH_CONNECTIONS, {
    sendAuthToken: true,
    lazy: true,
  });

  useEffect(() => {
    if (!error && success) {
      onSuccess();
      closeModal();
    }
  }, [error, success]);

  const setError = (field: string, value: string) => {
    setErrors((prev) => ({ ...prev, [field]: value }));
  };

  const validateFormData = (
    fields: string[],
    returnEarly: boolean = true,
    shouldTrim: boolean = false
  ) => {
    let hasError = false;

    if (shouldTrim) {
      for (const field of fields) {
        const val = formData[field as ConnectionDataField]?.trim();
        setFormData((prev) => ({
          ...prev,
          [field]: val,
        }));
      }
    }

    if (fields.includes(ConnectionDataField.name)) {
      if (!formData.name) {
        hasError = true;
        setError(
          ConnectionDataField.name,
          STRINGS.create_modal.error.empty_name.label
        );

        if (returnEarly) {
          return hasError;
        }
      }

      if (formData.name.length < 5) {
        hasError = true;
        setError(
          ConnectionDataField.name,
          STRINGS.create_modal.error.invalid_name.label
        );

        if (returnEarly) {
          return hasError;
        }
      }
    }

    if (fields.includes(ConnectionDataField.url)) {
      if (!isValidUrl(formData.url)) {
        hasError = true;
        setError(
          ConnectionDataField.url,
          STRINGS.create_modal.error.invalid_url.label
        );

        if (returnEarly) {
          return hasError;
        }
      }
    }

    return hasError;
  };

  const openModal = () => {
    resetFormData();
    resetErrors();
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  const resetErrors = () => {
    setErrors({
      name: "",
      url: "",
      description: "",
    });
  };

  const resetFormData = () => {
    setFormData({
      name: "",
      url: "",
      description: "",
    });
  };

  const handleFormSubmission = () => {
    resetErrors();

    if (
      validateFormData(
        [
          ConnectionDataField.name,
          ConnectionDataField.url,
          ConnectionDataField.description,
        ],
        false,
        true
      )
    ) {
      return;
    }

    execute(PATCH_CONNECTIONS, {
      name: formData.name,
      url: formData.url,
      description: formData.description,
    });
  };

  const onChange = (field: string, value: string) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setFormData((prev) => {
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const onCopyURL = async (t: string) => {
    await setClipboardText(t);
    setIsURLCopied(true);
  };

  const URL = CONNECT_URL + id;

  return (
    <>
      <div className="d-flex justify-content-start align-items-center gap-3">
        <Button onClick={() => openModal()}>
          {STRINGS.create_modal.action.create.button.label}
        </Button>
        <a href={URL} className="text-break">
          {URL}
        </a>
        <Icon
          name={isURLCopied ? "clipboard-check" : "clipboard"}
          size={24}
          onClick={() => onCopyURL(URL)}
        />
      </div>
      <Modal
        title={STRINGS.create_modal.title}
        onSave={handleFormSubmission}
        showFooter
        isLoading={loading}
        isVisible={isVisible}
        setIsVisible={setIsVisible as () => {}}
      >
        <InputText
          label={STRINGS.create_modal.input.name.label}
          value={formData.name}
          error={errors.name}
          onBlur={() => validateFormData([ConnectionDataField.name])}
          onChange={(value) => onChange(ConnectionDataField.name, value)}
        />
        <InputText
          label={STRINGS.create_modal.input.url.label}
          value={formData.url}
          error={errors.url}
          onBlur={() => validateFormData([ConnectionDataField.url])}
          onChange={(value) => onChange(ConnectionDataField.url, value)}
        />
        <InputText
          label={STRINGS.create_modal.input.description.label}
          value={formData.description}
          onChange={(value) => onChange(ConnectionDataField.description, value)}
        />
        <ErrorView error={error} mode="danger"></ErrorView>
      </Modal>
    </>
  );
};

export default CreateModal;
