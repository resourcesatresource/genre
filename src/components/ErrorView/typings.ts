import { ReactNode } from "react";
import { SpacingNames } from "../../theme/typings";

export type ErrorViewMode = "default" | "danger";

export interface ErrorViewProps {
  error?: string | null;
  mode?: ErrorViewMode;
  marginBottom?: SpacingNames;
  children?: ReactNode;
}
