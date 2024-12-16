import React, { useState } from "react";

import { useAuthContext } from "../../store";
import AdminRequest from "../../components/actions/admin-request";
import ErrorView from "../../components/ErrorView";
import Icon from "../../ui/icon";
import { DataViewProps } from "./typings";

const DataView: React.FC<DataViewProps> = ({ label, children }) => {
  return (
    <div className="d-flex flex-row justify-content-between align-items-center bg-light-subtle border rounded-2 p-2 mb-2">
      {label && <span className="ps-2">{label}</span>}
      <span className="pe-2">{children}</span>
    </div>
  );
};

const Profile = () => {
  const { email, id, name, isAdmin } = useAuthContext();
  const [adminRequestError, setAdminRequestError] = useState("");
  const [adminRequestSuccess, setAdminRequestSuccess] = useState("");

  const profileData = [
    {
      key: "Name",
      value: name,
    },
    {
      key: "Email",
      value: email,
    },
    {
      key: "User Id",
      value: id,
    },
  ];

  return (
    <div className="container my-4">
      <>
        {profileData.map((attribute, index) => {
          return (
            <DataView key={index} label={attribute.key}>
              {attribute.value}
            </DataView>
          );
        })}
      </>
      <DataView label="Admin">
        {isAdmin ? (
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

      <ErrorView mode="danger" error={adminRequestError} />
      <ErrorView error={adminRequestSuccess} />
    </div>
  );
};

export default Profile;
