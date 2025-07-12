import React from "react";

import { EmptyViewProps } from "./types";
import Icon from "../icon";

const EmptyView: React.FC<EmptyViewProps> = ({
  title,
  icon,
  iconSize,
  subTitle,
}) => {
  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center"
      style={{
        height: 500,
      }}
    >
      {icon && <Icon name={icon} size={iconSize}></Icon>}
      {title && <h1 className="text-center">{title}</h1>}
      {subTitle && <h4 className="text-center">{subTitle}</h4>}
    </div>
  );
};

export default EmptyView;
