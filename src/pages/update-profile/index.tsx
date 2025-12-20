import { useEffect, useState } from "react";
import { snakeCase } from "lodash";

import Button from "../../ui/button";
import InputText from "../../ui/input-text";
import PageWrapper from "../../ui/page-wrapper";
import { InputFields } from "./types";
import { usePatch, usePost } from "../../hooks/use-https";
import {
  PATCH_USER,
  POST_AUTH_VERIFY_TOKEN,
} from "../../constants/api-endpoints";
import { useToast } from "../../hooks/use-toast";
import { t } from "../../services/i18n";
import { useNavigation } from "../../hooks/use-navigation";
import { PAGES } from "../../constants/navigation";
import Card from "../../ui/card";
import { User } from "../../types/commons";
import ErrorView from "../../components/ErrorView";
import { useAuthContext } from "../../store";
import { useUser } from "../../services/user";

const UpdateProfile = () => {
  const { openToast } = useToast();
  const { navigateTo } = useNavigation();
  const { authToken } = useAuthContext();
  const { authenticateUser } = useUser();

  const {
    data: verifiedData,
    error: verifyTokenError,
    loading: verifyTokenLoading,
  } = usePost<{ user: User }>(POST_AUTH_VERIFY_TOKEN, {
    payload: {
      token: authToken,
    },
  });

  const {
    execute: patchProfile,
    error: patchProfileError,
    success: patchProfileSuccess,
    loading: patchProfileLoading,
  } = usePatch(PATCH_USER, {
    lazy: true,
  });

  const [inputFields, setInputFields] = useState({
    name: "",
    username: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    username: "",
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
      error ?? t(`edit_profile.inputs.${snakeCase(field)}.errors.empty.label`);

    setErrors((prev) => {
      return {
        ...prev,
        [field]: errorMessage,
      };
    });

    return errorMessage;
  };

  const validateInputFields = (field: string) => {
    if (field === InputFields.name) {
      if (inputFields[field].trim().length == 0) {
        errors.name = setValidationError(field);
        return;
      }
    }

    if (field === InputFields.username) {
      if (inputFields[field].trim().length == 0) {
        errors.username = setValidationError(field);
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
    return !!errors.name || !!errors.username;
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

  const onEditProfile = () => {
    resetValidationErrors();

    validateAllFields();

    if (isValidationError()) {
      return;
    }

    patchProfile(PATCH_USER, {
      name: inputFields.name?.trim(),
      username: inputFields.username?.trim(),
    });
  };

  useEffect(() => {
    if (verifyTokenLoading) {
      return;
    }

    if (!verifyTokenError && verifiedData) {
      setInputFields({
        name: verifiedData.user.name || "",
        username: verifiedData.user.username || "",
      });

      authenticateUser(verifiedData.user);
    }
  }, [verifiedData, verifyTokenError, verifyTokenLoading]);

  useEffect(() => {
    if (!patchProfileError && patchProfileSuccess) {
      openToast(
        t("edit_profile.toasts.successful_profile_update.label"),
        "success"
      );
      resetInputFields();
      navigateTo(PAGES.PROFILE);
    }
  }, [patchProfileSuccess, patchProfileError]);

  return (
    <PageWrapper isLoading={verifyTokenLoading}>
      <Card padding="lg">
        <InputText
          label={t("edit_profile.inputs.name.label")}
          placeholder={t("edit_profile.inputs.name.placeholder")}
          value={inputFields.name}
          error={errors.name}
          onChange={(v) => onInputChange(v, InputFields.name)}
          onBlur={() => validateInputFields(InputFields.name)}
        ></InputText>

        <InputText
          label={t("edit_profile.inputs.username.label")}
          placeholder={t("edit_profile.inputs.username.placeholder")}
          value={inputFields.username}
          error={errors.username}
          onChange={(v) => onInputChange(v, InputFields.username)}
          onBlur={() => validateInputFields(InputFields.username)}
        ></InputText>

        <ErrorView
          error={verifyTokenError || patchProfileError}
          mode="danger"
          marginBottom="md"
        ></ErrorView>

        <Button
          icon="pen-square"
          onClick={onEditProfile}
          isLoading={patchProfileLoading}
          disabled={patchProfileLoading}
        >
          {t("commons.buttons.update.label")}
        </Button>
      </Card>
    </PageWrapper>
  );
};

export default UpdateProfile;
