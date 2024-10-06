import React from "react";
import { useAuthContext } from "../../store";

const Profile = () => {
  const { email, id, name } = useAuthContext();

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
      {profileData.map((attribute, index) => {
        return (
          <div
            key={index}
            className="d-flex flex-row justify-content-between bg-light-subtle border rounded-2 p-2 mb-2"
          >
            <span className="ps-2">{attribute.key}</span>
            <span className="pe-2">{attribute.value}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Profile;
