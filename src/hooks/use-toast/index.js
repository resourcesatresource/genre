import { toast } from "react-toastify";

const defaultOptions = {
  autoClose: 1500,
};

const validToastType = ["error", "info", "success", "warning"];

export const useToast = () => {
  const openToast = (
    message = "",
    type = "info",
    options = { ...defaultOptions }
  ) => {
    const validType = validToastType.includes(type) ? type : "info";

    toast[validType](message, {
      autoClose: options.autoClose,
    });
  };

  return { openToast };
};
