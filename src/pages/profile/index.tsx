import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../store";
import AdminRequest from "../../components/actions/admin-request";
import ErrorView from "../../components/ErrorView";
import Icon from "../../ui/icon";
import { DataViewProps, VerifiedData } from "./typings";
import Button from "../../ui/button";
import { PAGES } from "../../constants/navigation";
import { t } from "../../services/i18n";
import { usePost } from "../../hooks/use-https";
import { POST_AUTH_VERIFY_TOKEN } from "../../constants/api-endpoints";
import PageWrapper from "../../ui/page-wrapper";
import { useUser } from "../../services/user";

const DataView: React.FC<DataViewProps> = ({ label, children }) => {
  return (
    <div className="d-flex flex-row justify-content-between align-items-center bg-light-subtle border rounded-2 p-2 mb-2">
      {label && <span className="ps-2">{label}</span>}
      <span className="pe-2">{children}</span>
    </div>
  );
};

const Profile = () => {
  const { authToken: token } = useAuthContext();
  const navigate = useNavigate();
  const { authenticateUser } = useUser();

  const [adminRequestError, setAdminRequestError] = useState("");
  const [adminRequestSuccess, setAdminRequestSuccess] = useState("");

  const {
    data: verifiedData,
    error: verifyTokenError,
    loading: verifyTokenLoading,
  } = usePost<VerifiedData>(POST_AUTH_VERIFY_TOKEN, {
    payload: {
      token,
    },
  });

  useEffect(() => {
    if (verifyTokenLoading) {
      return;
    }

    if (!verifyTokenError && verifiedData) {
      authenticateUser(verifiedData.user);
    }
  }, [verifiedData, verifyTokenError, verifyTokenLoading]);

  const profileData = [
    {
      key: "Name",
      value: verifiedData?.user.name,
    },
    {
      key: "Email",
      value: verifiedData?.user.email,
    },
    {
      key: "User Id",
      value: verifiedData?.user._id,
    },
  ];

  return (
    <PageWrapper isLoading={verifyTokenLoading}>
      <>
        <div className="d-flex justify-content-end bg-info-subtle p-2 rounded-3 mb-2">
          <Button
            icon="edit"
            onClick={() =>
              navigate(PAGES.EDIT_PROFILE, {
                state: verifiedData?.user,
              })
            }
            mode="dark"
          >
            Edit Profile
          </Button>
        </div>
        {profileData.map((attribute, index) => {
          return (
            <DataView key={index} label={attribute.key}>
              {attribute.value}
            </DataView>
          );
        })}
      </>

      <DataView label="Username">
        {verifiedData?.user.username ? (
          <div className="d-flex">{verifiedData.user.username}</div>
        ) : (
          <Icon
            name="edit"
            onClick={() =>
              navigate(PAGES.EDIT_PROFILE, {
                state: verifiedData?.user,
              })
            }
          ></Icon>
        )}
      </DataView>

      <DataView label="Admin">
        {verifiedData?.user.isAdmin ? (
          <div className="d-flex">
            You are an admin.&nbsp;
            <Icon name="check-circle" />
          </div>
        ) : (
          <AdminRequest
            onError={setAdminRequestError}
            onSuccess={setAdminRequestSuccess}
          />
        )}
      </DataView>

      <DataView label="Change password">
        <Button
          icon="exchange-alt"
          onClick={() => navigate(PAGES.CHANGE_PASSWORD)}
        >
          {t("commons.buttons.change.label")}
        </Button>
      </DataView>

      <ErrorView mode="danger" error={adminRequestError} />
      <ErrorView error={adminRequestSuccess} />
    </PageWrapper>
  );
};

export default Profile;
