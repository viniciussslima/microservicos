import axios from "axios";

export const requestAuthApi = axios.create({
  baseURL: process.env.REACT_APP_AUTH_API,
  withCredentials: true,
});

export const requestFeedApi = axios.create({
  baseURL: process.env.REACT_APP_FEED_API,
  withCredentials: true,
});

export const requestChatApi = axios.create({
  baseURL: process.env.REACT_APP_CHAT_API,
  withCredentials: true,
});
