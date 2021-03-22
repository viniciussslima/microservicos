import React, { createContext, useContext, useState, useEffect } from "react";

import { requestAuthApi } from "../requestApi";

const AuthContext = createContext({});

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verifyLogged() {
      try {
        let token = localStorage.getItem("x-access-token");
        if (token) {
          const response = await requestAuthApi.get("/user", {
            headers: { "x-access-token": token },
          });
          response.data.token = token;
          setUser(response.data);
        }
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

      const response1 = await requestAuthApi.post("/getin", formData, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        },
      });

      const response2 = await requestAuthApi.get("/user", {
        headers: { "x-access-token": response1.data.token },
      });
      response2.data.token = response1.data.token;
      setUser(response2.data);

      localStorage.setItem("x-access-token", response1.data.token);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async function singup(
    firtName,
    lastName,
    username,
    password,
    dayOfBirth,
    monthOfBirth,
    yearOfBirth
  ) {
    try {
      const formData = new FormData();
      formData.append("fn", firtName);
      formData.append("ln", lastName);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("day", dayOfBirth);
      formData.append("month", monthOfBirth);
      formData.append("year", yearOfBirth);

      const response1 = await requestAuthApi.post("/new", formData, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        },
      });

      const response2 = await requestAuthApi.get("/user", {
        headers: { "x-access-token": response1.data.token },
      });
      response2.data.token = response1.data.token;
      setUser(response2.data);

      localStorage.setItem("x-access-token", response2.data.token);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async function logout() {
    try {
      if (!!user) {
        await requestAuthApi.get("/out");
        localStorage.removeItem("x-access-token");
        setUser(null);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider
      value={{ logged: !!user, user, loading, singup, login, logout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
