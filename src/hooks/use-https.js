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
  const [serverIdle, setServerIdle] = useState(false);
  const { authToken } = useAuthContext();

  const execute = useCallback(async (pathOnExecution) => {
    setLoading(true);
    setError("");
    setSuccess(null);
    setServerIdle(false);

    let serverIdleTimeout = setTimeout(() => {
      setServerIdle(true);
    }, 5000);

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
      setServerIdle(false);
      clearTimeout(serverIdleTimeout);
    }
  }, []);

  useEffect(() => {
    if (!options?.lazy) {
      execute();
    }
  }, []);

  return { data, loading, error, execute, success, serverIdle };
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
  const [errorKind, setErrorKind] = useState(null);
  const [success, setSuccess] = useState(null);
  const [serverIdle, setServerIdle] = useState(false);
  const { authToken } = useAuthContext();

  const execute = useCallback(async (pathOnExecution, payloadOnExecution) => {
    setLoading(true);
    setSuccess(null);
    setError("");
    setErrorKind("");

    let serverIdleTimeout = setTimeout(() => {
      setServerIdle(true);
    }, 5000);

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
      setErrorKind(error?.response?.data?.id ?? "");
    } finally {
      setLoading(false);
      setServerIdle(false);
      clearTimeout(serverIdleTimeout);
    }
  }, []);

  useEffect(() => {
    if (!options?.lazy) {
      execute();
    }
  }, []);

  return { data, loading, error, execute, success, serverIdle, errorKind };
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
