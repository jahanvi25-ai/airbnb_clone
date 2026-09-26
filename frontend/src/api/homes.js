import apiClient from "./client";

export const getHomes = () => apiClient.get("/homes").then((res) => res.data.homes);

export const getHome = (homeId) =>
  apiClient.get(`/homes/${homeId}`).then((res) => res.data.home);

// Accepts a FormData instance so a real photo file can be attached
// alongside the text fields (see components using this — they build the
// FormData themselves so this stays a thin wrapper).
export const createHome = (formData) =>
  apiClient
    .post("/homes", formData, { headers: { "Content-Type": "multipart/form-data" } })
    .then((res) => res.data.home);

export const updateHome = (homeId, formData) =>
  apiClient
    .put(`/homes/${homeId}`, formData, { headers: { "Content-Type": "multipart/form-data" } })
    .then((res) => res.data.home);

export const deleteHome = (homeId) => apiClient.delete(`/homes/${homeId}`);
