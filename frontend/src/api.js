export const API = import.meta.env.VITE_API_URL;
export const apiFetch = (url, options = {}) => {
  return fetch(url, {
    credentials: "include",
    ...options,
  });
};
