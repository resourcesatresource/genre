import { ReactNode } from "react";
import { User } from "../../types/commons";

export interface DataViewProps {
  label?: string;
  children: ReactNode;
}

export interface VerifiedData {
  status: string;
  user: User;
}
