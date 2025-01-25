import { getFormattedTime } from "../../helpers/utils";
import { AdminDetail, RequesterDetail } from "./types";

export const constructRequestersList = (
  requesterList: RequesterDetail[] | null
) => {
  const labels = ["Email", "Requested on", "User id", "Action"];

  const values = (requesterList ?? []).map((requester) => {
    return [
      requester.requesterEmailId,
      getFormattedTime(requester.timestamp),
      requester._id,
      "grant",
    ];
  });

  return {
    labels,
    values,
  };
};

export const constructAdminsTableData = (adminList: AdminDetail[] | null) => {
  const labels = ["Email", "Name", "User id", "Action"];

  const values = (adminList ?? []).map((admin) => {
    return [admin.email, admin.name, admin._id, "revoke"];
  });

  return {
    labels,
    values,
  };
};
