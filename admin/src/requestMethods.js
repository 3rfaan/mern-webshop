import axios from "axios";

const appUrl = "http://localhost:4000";
const token = localStorage.getItem("persist:root")
  ? JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)
      ?.currentUser?.accessToken
  : "";

export const publicRequest = axios.create({
  baseURL: `${appUrl}/api`,
});

export const userRequest = axios.create({
  baseURL: `${appUrl}/api`,
  headers: { authorization: `Bearer ${token}` },
});
