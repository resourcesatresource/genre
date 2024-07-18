import axios from "axios";
import { useCookies } from "react-cookie";
import { useState, useEffect, useCallback, lazy } from "react";

const api = axios.create({
  baseURL: "https://node-api-3m9u.onrender.com/api",
});

export const useGet = (
  path,
  options = { lazy: false, sendAuthToken: true }
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cookies] = useCookies(["token"]);

  const execute = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      if (options.sendAuthToken && !cookies.token) {
        return;
      }
      const response = await api.get(path, {
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
