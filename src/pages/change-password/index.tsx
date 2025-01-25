import { useEffect, useState } from "react";

import Button from "../../ui/button";
import InputText from "../../ui/input-text";
import PageWrapper from "../../ui/page-wrapper";
import { InputFields } from "./types";
import { usePost } from "../../hooks/use-https";
import { POST_CHANGE_PASSWORD } from "../../constants/api-endpoints";
import { ERROR_KIND_MAP } from "./utils";
import { useToast } from "../../hooks/use-toast";
import { t } from "../../services/i18n";
import { camelCase, snakeCase } from "lodash";

const ChangePassword = () => {
  const { openToast } = useToast();

  const { execute, error, success, errorKind, loading } = usePost(
    POST_CHANGE_PASSWORD,
    {
      lazy: true,
    }
  );

  const [inputFields, setInputFields] = useState({
    currentPassword: "",
    newPassword: "",
    confirmedNewPassword: "",
  });

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmedNewPassword: "",
  });

  const setInputField = (field: string, value: string) => {
    setInputFields((prev) => {
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const onInputChange = (value: string, field: string) => {
    setValidationError(field, "");
    setInputFields((prev) => {
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const setValidationError = (field: string, error?: string) => {
    const errorMessage =
      error ??
      t(`change_password.inputs.${snakeCase(field)}.errors.empty.label`);

    setErrors((prev) => {
      return {
        ...prev,
        [field]: errorMessage,
      };
    });

    return errorMessage;
  };

  const validateInputFields = (field: string) => {
    if (field === InputFields.currentPassword) {
      if (inputFields[field].length == 0) {
        errors.currentPassword = setValidationError(field);
        return;
      }
    }

    if (field === InputFields.newPassword) {
      if (inputFields[field].length == 0) {
        errors.currentPassword = setValidationError(field);
        return;
      }
    }

    if (field === InputFields.confirmedNewPassword) {
      if (inputFields[field].length == 0) {
        errors.confirmedNewPassword = setValidationError(field);
        return;
      }

      if (inputFields.newPassword !== inputFields.confirmedNewPassword) {
        errors.confirmedNewPassword = setValidationError(
          field,
          t(
            "change_password.inputs.confirmed_new_password.errors.notSame.label"
          )
        );
        return;
      }
    }
  };

  const resetValidationErrors = () => {
    for (const field of Object.keys(InputFields)) {
      setValidationError(field, "");
    }
  };

  const resetInputFields = () => {
    for (const field of Object.keys(InputFields)) {
      setInputField(field, "");
    }
  };

  const isValidationError = () => {
    return (
      !!errors.currentPassword ||
      !!errors.newPassword ||
      !!errors.confirmedNewPassword
    );
  };

  const validateAllFields = () => {
    const validationFields = Object.keys(InputFields);

    let isValidationPassed = true;

    for (const field of validationFields) {
      validateInputFields(field);

      if (!!errors[field as keyof typeof errors]) {
        isValidationPassed = false;
      }
    }

    if (inputFields.currentPassword !== inputFields.confirmedNewPassword) {
      return false;
    }

    return isValidationPassed;
  };

  const onChangePassword = () => {
    resetValidationErrors();

    validateAllFields();

    if (isValidationError()) {
      return;
    }

    execute(POST_CHANGE_PASSWORD, {
      old: inputFields.currentPassword,
      new: inputFields.newPassword,
    });
  };

  useEffect(() => {
    if (error && errorKind) {
      setValidationError(ERROR_KIND_MAP[errorKind], error);
    }

    if (!error && success) {
      openToast(
        t("change_password.toasts.successful_password_change.label"),
        "success"
      );
      resetInputFields();
    }
  }, [success, error, errorKind]);

  return (
    <PageWrapper>
      <InputText
        label={t("change_password.inputs.current_password.label")}
        value={inputFields.currentPassword}
        error={errors.currentPassword}
        onChange={(v) => onInputChange(v, "currentPassword")}
        onBlur={() => validateInputFields(InputFields.currentPassword)}
      ></InputText>

      <InputText
        label={t("change_password.inputs.new_password.label")}
        value={inputFields.newPassword}
        error={errors.newPassword}
        onChange={(v) => onInputChange(v, "newPassword")}
        onBlur={() => validateInputFields(InputFields.newPassword)}
      ></InputText>

      <InputText
        label={t("change_password.inputs.confirmed_new_password.label")}
        value={inputFields.confirmedNewPassword}
        error={errors.confirmedNewPassword}
        onChange={(v) => onInputChange(v, "confirmedNewPassword")}
        onBlur={() => validateInputFields(InputFields.confirmedNewPassword)}
      ></InputText>

      <Button
        icon="pen-square"
        onClick={onChangePassword}
        isLoading={loading}
        disabled={loading || isValidationError()}
      >
        {t("commons.buttons.update.label")}
      </Button>
    </PageWrapper>
  );
};

export default ChangePassword;
