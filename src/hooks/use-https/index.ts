import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import configs from "../../configs";
import { useAuthContext } from "../../store";
import { HttpsResponse } from "./typings";

interface Options {
  lazy?: boolean;
  sendAuthToken?: boolean;
  payload?: any
}

type Method = "get" | "delete" | "post" | "put" | "patch";

const api = axios.create({
  baseURL: configs.API_BASE_URL,
});

/* GET, DELETE */
export const useQuery = <T>(
  method: Method,
  path: string,
  options: Options = { lazy: false, sendAuthToken: true }
): HttpsResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [serverIdle, setServerIdle] = useState(false);
  const { authToken } = useAuthContext();

  const execute = useCallback(async (pathOnExecution: string) => {
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

      const response = await api[method]<T>(pathOnExecution ?? path, {
        headers: {
          ...(options.sendAuthToken && { "x-auth-token": authToken }),
        },
      });

      if (response?.status === 200) {
        setSuccess(true);
      }
      setData(response.data);
    } catch (error: any) {
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
      execute(path);
    }
  }, []);

  return { data, loading, error, execute, success, serverIdle };
};

/* POST, PATCH, PUT */
const useHttps = <T>(
  method: Method,
  path: string,
  options: Options = { lazy: false, sendAuthToken: true }
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorKind, setErrorKind] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [serverIdle, setServerIdle] = useState(false);
  const { authToken } = useAuthContext();

  const execute = useCallback(async (pathOnExecution?: string, payloadOnExecution?: any) => {
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

      const response = await api[method]<T>(
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
    } catch (error: any) {
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
      execute(path, options?.payload);
    }
  }, []);

  return { data, loading, error, execute, success, serverIdle, errorKind };
};

export const useGet = <T>(path: string, options?: Options): HttpsResponse<T> => {
  return useQuery("get", path, options);
};

export const usePost = <T>(path: string, options?: Options) => {
  return useHttps("post", path, options);
};

export const usePut = <T>(path: string, options?: Options) => {
  return useHttps("put", path, options);
};

export const useDelete = <T>(path: string, options?: Options) => {
  return useQuery("delete", path, options);
};

export const usePatch = <T>(path: string, options?: Options) => {
  return useHttps("patch", path, options)
}