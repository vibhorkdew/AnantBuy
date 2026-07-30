import { useState, useMemo, useCallback } from "react";

import { AuthContext } from "./AuthContext";

const jwtPattern = /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/;

function decodeJwtSection(section) {
  const base64 = section
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(section.length / 4) * 4, "=");

  return JSON.parse(atob(base64));
}

function isValidToken(token) {
  if (typeof token !== "string" || !jwtPattern.test(token)) {
    return false;
  }

  try {
    const [encodedHeader, encodedPayload] = token.split(".");
    const header = decodeJwtSection(encodedHeader);
    const payload = decodeJwtSection(encodedPayload);

    return (
      typeof header?.alg === "string" &&
      header.alg !== "none" &&
      typeof payload === "object" &&
      payload !== null
    );
  } catch {
    return false;
  }
}

function getStoredToken() {
  const storedToken = localStorage.getItem("token");

  return isValidToken(storedToken) ? storedToken : null;
}

export const AuthProvider = ({
  children
}) => {

  const [token, setToken] =
    useState(getStoredToken);

  const login = useCallback((jwt) => {
  if (!isValidToken(jwt)) {
    return;
  }

  localStorage.setItem("token", jwt);
  setToken(jwt);
}, []);

 const logout = useCallback(() => {
  localStorage.removeItem("token");
  setToken(null);
}, []);

const value = useMemo(
  () => ({
    token,
    login,
    logout,
  }),
  [token, login, logout]
);

return (
  <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
);
};

export default AuthProvider;