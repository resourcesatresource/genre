import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import configs from "../configs";
import { useAuthContext } from "../store";

const api = axios.create({
  baseURL: configs.API_BASE_URL,
});

/* GET, DELETE */
export const useQuery = (
  method,
  path,
  options = { lazy: false, sendAuthToken: true }
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { authToken } = useAuthContext();

  const execute = useCallback(async (pathOnExecution) => {
    setLoading(true);
    setError("");
    setSuccess(null);
    try {
      if (options.sendAuthToken && !authToken) {
        return;
      }
      const response = await api[method](pathOnExecution ?? path, {
        headers: {
          ...(options.sendAuthToken && { "x-auth-token": authToken }),
        },
      });

      if (response?.status === 200) {
        setSuccess(true);
      }
      setData(response.data);
    } catch (error) {
      setSuccess(null);
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

  return { data, loading, error, execute, success };
};

/* POST, PATCH, PUT */
const useHttps = (
  method,
  path,
  options = { lazy: false, sendAuthToken: true, payload }
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { authToken } = useAuthContext();

  const execute = useCallback(async (pathOnExecution, payloadOnExecution) => {
    setLoading(true);
    setSuccess(null);
    setError("");
    options;
    try {
      if (options.sendAuthToken && !authToken) {
        return;
      }

      const response = await api[method](
        pathOnExecution || path,
        payloadOnExecution || options?.payload || {},
        {
          headers: {
            "x-auth-token": authToken,
          },
        }
      );

      if (response?.status === 200) {
        setSuccess(true);
      }

      setData(response.data);
    } catch (error) {
      setSuccess(null);
      setError(error?.response?.data?.message ?? "Something went wrong!!");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!options?.lazy) {
      execute();
    }
  }, []);

  return { data, loading, error, execute, success };
};

export const useGet = (path, options) => {
  return useQuery("get", path, options);
};

export const usePost = (path, options) => {
  return useHttps("post", path, options);
};

export const usePut = (path, options) => {
  return useHttps("put", path, options);
};

export const useDelete = (path, options) => {
  return useQuery("delete", path, options);
};
