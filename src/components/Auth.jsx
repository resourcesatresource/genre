import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { usePost } from "../hooks/use-https";
import {
  POST_AUTH,
  POST_AUTH_REQUEST_RESET_PASSWORD,
} from "../constants/api-endpoints";
import { useUser } from "../services/user";
import { useAuthContext } from "../store";
import ErrorView from "./ErrorView";
import Card from "../ui/card";
import Icon from "../ui/icon";
import Button from "../ui/button";
import RequestResetPasswordModal from "../pages/login/request-reset-password-modal";
import { useToast } from "../hooks/use-toast";
import { t } from "../services/i18n";

const Login = () => {
  const navigate = useNavigate();
  const { openToast } = useToast();
  const { isAuthenticated } = useAuthContext();
  const { authenticateUser: authenticate } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordResetModalOpen, setIsPasswordResetModalOpen] =
    useState(false);

  const {
    execute: authenticateUser,
    error: authenticationError,
    data: authContext,
    loading,
  } = usePost(POST_AUTH, {
    lazy: true,
  });

  const {
    execute: requestForResetPassword,
    error: requestResetPasswordError,
    loading: isRequestResetPasswordLoading,
    success: requestResetPasswordSuccess,
  } = usePost(POST_AUTH_REQUEST_RESET_PASSWORD, {
    lazy: true,
  });

  const onRequestResetPasswordClick = () => {
    setIsPasswordResetModalOpen(true);
  };

  const onPasswordResetRequest = (email) => {
    requestForResetPassword(POST_AUTH_REQUEST_RESET_PASSWORD, {
      email,
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!authenticationError && authContext) {
      const { secureToken, user } = authContext;

      authenticate({
        ...user,
        token: secureToken,
      });
    }
  }, [authContext, authenticationError]);

  useEffect(() => {
    if (!requestResetPasswordError && requestResetPasswordSuccess) {
      setIsPasswordResetModalOpen(false);
      openToast(t("login.toasts.successful_reset_request.label"), "success");
    }
  }, [requestResetPasswordError, requestResetPasswordSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    authenticateUser(POST_AUTH, {
      email,
      password,
    });
  };

  return (
    <div className="mx-3">
      {!isPasswordResetModalOpen && (
        <Card padding="xl" radius="lg" marginTop="xl" marginBottom="xl">
          <div className="text-center">
            <h1>Login</h1>
          </div>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-row mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="form-control"
                required
              />
            </div>
            <div className="form-row mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="form-control"
                  required
                />
                <button
                  className="btn border border-secondary-subtle"
                  type="button"
                  id="button-addon2"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <Icon
                    type="solid"
                    name={showPassword ? "eye-slash" : "eye"}
                  />
                </button>
              </div>
            </div>
            <div className="form-row">
              <Button
                icon="sign-in-alt"
                type="submit"
                disabled={loading}
                isLoading={loading}
              >
                Login
              </Button>
            </div>
            <ErrorView mode="danger" error={authenticationError} />
          </form>
          {!isRequestResetPasswordLoading && (
            <p className="mt-2 text-center">
              <strong className="text-danger">Forgot password?</strong>{" "}
              <a
                role="button"
                className="text-primary"
                onClick={onRequestResetPasswordClick}
              >
                request here
              </a>
            </p>
          )}
        </Card>
      )}

      <RequestResetPasswordModal
        error={requestResetPasswordError}
        isVisible={isPasswordResetModalOpen}
        setIsVisible={setIsPasswordResetModalOpen}
        onSave={onPasswordResetRequest}
      ></RequestResetPasswordModal>
    </div>
  );
};

export default Login;
