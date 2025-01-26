import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useNavigation = () => {
  const navigate = useNavigate();

  const navigateTo = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate]
  );

  const getQueryParams = <T extends Record<string, string>>(): T => {
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);

    const params = {} as T;

    queryParams.forEach((value, key) => {
      params[key as keyof T] = value as unknown as T[keyof T];
    });

    return params;
  };

  return { getQueryParams, navigateTo };
};
