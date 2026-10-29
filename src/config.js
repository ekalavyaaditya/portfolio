const normalizeBasePath = (path) => {
  if (!path) {
    return "";
  }

  const trimmed = path.trim().replace(/\/+$/, "");
  if (!trimmed) {
    return "";
  }

  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
};

const basePath = normalizeBasePath(
  process.env.REACT_APP_BASE_PATH ?? process.env.PUBLIC_URL ?? ""
);

const config = {
  basePath,
  homePath: basePath || "/",
};

export default config;
