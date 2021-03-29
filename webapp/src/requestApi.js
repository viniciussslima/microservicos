import axios from "axios";

export const requestAuthApi = axios.create({
  baseURL: "http://localhost:3002",
  withCredentials: true,
});

export const requestFeedApi = axios.create({
  baseURL: "http://localhost:3003",
  withCredentials: true,
});

export const requestChatApi = axios.create({
  baseURL: "http://localhost:3004",
  withCredentials: true,
});

export const requestApi = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});
