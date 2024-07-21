import axios from "axios";
import { useCookies } from "react-cookie";
import { useState, useEffect, useCallback, lazy } from "react";
import configs from "../configs";

const api = axios.create({
  baseURL: configs.API_BASE_URL,
});

export const useGet = (
  path,
  options = { lazy: false, sendAuthToken: true }
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cookies] = useCookies(["token"]);

  const execute = useCallback(async (pathOnExecution) => {
    setLoading(true);
    setError("");
    try {
      if (options.sendAuthToken && !cookies.token) {
        return;
      }
      const response = await api.get(pathOnExecution ?? path, {
        headers: {
          ...(options.sendAuthToken && { "x-auth-token": cookies.token }),
        },
      });
      setData(response.data);
    } catch (error) {
      setError(error?.response?.data?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!options?.lazy) {
      execute();
    }
  }, []);

  return { data, loading, error, execute };
};
