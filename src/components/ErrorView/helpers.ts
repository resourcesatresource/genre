import { ErrorViewMode } from "./typings";

export const getUIDetailsBasedOnMode = (mode: ErrorViewMode = "default") => {
  const MODE_UI_INFO = {
    danger: {
      border: "border-danger rounded-1",
      background: "bg-danger-subtle",
    },
    default: {
      border: "border-secondary rounded-1",
      background: "bg-secondary-subtle",
    },
  };

  return MODE_UI_INFO?.[mode] ?? MODE_UI_INFO.default;
};
