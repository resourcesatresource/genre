import { useEffect, useState } from "react";
import { snakeCase } from "lodash";

import Button from "../../ui/button";
import InputText from "../../ui/input-text";
import PageWrapper from "../../ui/page-wrapper";
import { InputFields } from "./types";
import { usePost } from "../../hooks/use-https";
import {
  POST_AUTH_RESET_PASSWORD,
  POST_AUTH_VERIFY_TOKEN,
} from "../../constants/api-endpoints";
import { useToast } from "../../hooks/use-toast";
import { t } from "../../services/i18n";
import { PAGES } from "../../constants/navigation";
import { useNavigation } from "../../hooks/use-navigation";
import Card from "../../ui/card";
import ErrorView from "../../components/ErrorView";

const ResetPassword = () => {
  const { openToast } = useToast();
  const { getQueryParams, navigateTo } = useNavigation();

  const { token } = getQueryParams<{ token?: string }>();

  const [validationToken, setValidationToken] = useState<string>();

  const [inputFields, setInputFields] = useState({
    newPassword: "",
    confirmedNewPassword: "",
  });

  const [errors, setErrors] = useState({
    newPassword: "",
    confirmedNewPassword: "",
  });

  const {
    execute: verifyToken,
    error: verifyTokenError,
    loading: verifyTokenLoading,
  } = usePost(POST_AUTH_VERIFY_TOKEN, {
    lazy: true,
  });

  const { execute, error, success, errorKind, loading } = usePost(
    POST_AUTH_RESET_PASSWORD,
    {
      lazy: true,
    }
  );
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
    if (field === InputFields.newPassword) {
      if (inputFields[field].length == 0) {
        errors.newPassword = setValidationError(field);
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
    return !!errors.newPassword || !!errors.confirmedNewPassword;
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

    return isValidationPassed;
  };

  const onResetPassword = () => {
    resetValidationErrors();

    validateAllFields();

    if (isValidationError()) {
      return;
    }

    execute(POST_AUTH_RESET_PASSWORD, {
      validationToken,
      newPassword: inputFields.newPassword,
    });
  };

  useEffect(() => {
    if (!error && success) {
      openToast(
        t("reset_password.toasts.successful_password_change.label"),
        "success"
      );

      resetInputFields();
      navigateTo(PAGES.LOGIN);
    }
  }, [success, error, errorKind]);

  useEffect(() => {
    if (!token) {
      navigateTo(PAGES.HOME);

      return;
    }

    setValidationToken(token);
    verifyToken(POST_AUTH_VERIFY_TOKEN, { token });
  }, [token]);

  useEffect(() => {
    if (verifyTokenError) {
      openToast(t("reset_password.toasts.invalid_credentials.label"), "error");

      resetInputFields();
      navigateTo(PAGES.HOME);
    }
  }, [verifyTokenError]);

  return (
    <PageWrapper isLoading={verifyTokenLoading}>
      <ErrorView error={error ?? undefined} mode="danger"></ErrorView>
      <Card padding="lg">
        <InputText
          label={t("reset_password.inputs.new_password.label")}
          value={inputFields.newPassword}
          error={errors.newPassword}
          onChange={(v) => onInputChange(v, InputFields.newPassword)}
          onBlur={() => validateInputFields(InputFields.newPassword)}
        ></InputText>

        <InputText
          label={t("reset_password.inputs.confirmed_new_password.label")}
          value={inputFields.confirmedNewPassword}
          error={errors.confirmedNewPassword}
          onChange={(v) => onInputChange(v, InputFields.confirmedNewPassword)}
          onBlur={() => validateInputFields(InputFields.confirmedNewPassword)}
        ></InputText>

        <Button
          icon="key"
          onClick={onResetPassword}
          isLoading={loading}
          disabled={loading}
        >
          {t("commons.buttons.update.label")}
        </Button>
      </Card>
    </PageWrapper>
  );
};

export default ResetPassword;
