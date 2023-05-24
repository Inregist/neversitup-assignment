import defaultAxios from "axios";

export const axios = defaultAxios.create({
  baseURL: "https://candidate.neversitup.com/todo",
});

export const setToken = (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};