import React from "react";
import { EmptyViewProps } from "./types";
import Icon from "../icon";

const EmptyView: React.FC<EmptyViewProps> = ({ title, icon, iconSize }) => {
  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center"
      style={{
        height: 500,
      }}
    >
      {icon && <Icon name={icon} size={iconSize}></Icon>}
      {title && <h1>{title}</h1>}
    </div>
  );
};

export default EmptyView;
