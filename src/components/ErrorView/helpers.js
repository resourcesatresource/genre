export const getUIDetailsBasedOnMode = (mode) => {
  const MODE_UI_INFO = {
    danger: {
      border: "border-danger rounded-1",
      background: "bg-danger-subtle",
    },
  };

  return (
    MODE_UI_INFO[mode] ?? {
      border: "border-secondary rounded-1",
      background: "bg-secondary-subtle",
    }
  );
};
