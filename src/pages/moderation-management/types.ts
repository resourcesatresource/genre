export interface RequesterDetail {
  _id: string;
  name: string;
  requesterEmailId: string;
  timestamp: string;
}

export interface AdminDetail {
  _id: string;
  name: string;
  email: string;
}

export enum ModerationActions {
  Grant = "grant",
  Revoke = "revoke",
}

export enum TableField {
  Email = 0,
  Name = 1,
  Id = 2,
  Action = 3,
}
