const API_BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
const DEV_BASE_URL = import.meta.env.VITE_REACT_DEV_BASE_URL;
const API_SUPER_ADMIN = import.meta.env.VITE_REACT_APP_SUPER_ADMIN;
const DEV_SUPER_ADMIN = import.meta.env.VITE_REACT_DEV_SUPER_ADMIN;
const NODE_ENV = import.meta.env.VITE_REACT_APP_NODE_ENV;

const configs = {
  API_BASE_URL: NODE_ENV === "development" ? DEV_BASE_URL : API_BASE_URL,
  SUPER_ADMIN_EMAIL:
    NODE_ENV === "development" ? DEV_SUPER_ADMIN : API_SUPER_ADMIN,
};

export default configs;
