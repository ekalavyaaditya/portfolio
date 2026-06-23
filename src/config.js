const normalizeBasePath = (path) => {
  if (!path || path === "/") {
    return "";
  }

  return path.startsWith("/") ? path : `/${path}`;
};

const basePath = normalizeBasePath(process.env.REACT_APP_BASE_PATH || "/portfolio");

const config = {
  basePath,
  homePath: basePath || "/",
};

export default config;
