import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchText";

const config = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_PLACES_API_KEY,
    "X-Goog-FieldMask": ["places.photos", "places.displayName", "places.id"],
  },
};

export const GetPlaceDetails = (data) => axios.post(BASE_URL, data, config);

export const GetPhotoRefUrl = (name) =>
  `https://places.googleapis.com/v1/${name}/media?maxHeightPx=2000&maxWidthPx=3000&key=${
    import.meta.env.VITE_GOOGLE_PLACES_API_KEY
  }`;

export const GetDestinations = () =>
  axios.post(BASE_URL, { textQuery: "trending tourist cities" }, config);
