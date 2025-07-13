export interface EditModalProps {
  onSuccess: Function;
}

export interface Connection {
  _id: string;
  name: string;
  url: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerResponse {
  userId: string;
  name: string;
  isGold: string;
  connections: Connection[];
}

export interface ConnectionFormData {
  name: string;
  url: string;
  description: string;
}

export enum ConnectionDataField {
  name = "name",
  url = "url",
  description = "description",
}
