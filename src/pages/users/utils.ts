import { User } from "../../types/commons";

const EMPTY_FIELD_LABEL = "-";

export const constructUsersTableData = (combinedUserList: User[]) => {
  const labels = ["Email", "Name", "User id", "Role"];

  const userList = combinedUserList.filter((user) => user.isAdmin);
  const adminList = combinedUserList.filter((user) => !user.isAdmin);

  const sortedUserList = [...userList, ...adminList];

  const values = (sortedUserList ?? []).map((user) => {
    return [
      user.name ?? EMPTY_FIELD_LABEL,
      user.email,
      user._id,
      user.isAdmin ? "Admin" : "User",
    ];
  });

  return {
    labels,
    values,
  };
};
