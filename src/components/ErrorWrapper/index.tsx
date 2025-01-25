import React from "react";

import { ErrorWrapperProps } from "./types";
import ErrorView from "../ErrorView";

const ErrorWrapper: React.FC<ErrorWrapperProps> = ({ error, children }) => {
  return <>{error ? <ErrorView error={error}></ErrorView> : children}</>;
};

export default ErrorWrapper;
