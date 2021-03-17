import React, { createContext, useContext, useState, useEffect } from "react";

import requestApi from "../requestApi";

const AuthContext = createContext({});

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verifyLogged() {
      try {
        const response = await requestApi.get("/");

        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }

    verifyLogged();
  }, []);

  async function login(username, password) {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      await requestApi.post("/account/getin", formData, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        },
      });

      const response = await requestApi.get("/");

      setUser(response.data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async function logout() {
    setUser(null);
    if (!!user) {
      await requestApi.get("/account/out");
    }
  }

  return (
    <AuthContext.Provider
      value={{ logged: !!user, user, loading, login, logout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
