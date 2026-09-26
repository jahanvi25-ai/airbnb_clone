import apiClient from "./client";

export const getFavourites = () =>
  apiClient.get("/favourites").then((res) => res.data.favourites);

export const addFavourite = (homeId) =>
  apiClient.post("/favourites", { homeId }).then((res) => res.data.favourites);

export const removeFavourite = (homeId) =>
  apiClient.delete(`/favourites/${homeId}`).then((res) => res.data.favourites);
