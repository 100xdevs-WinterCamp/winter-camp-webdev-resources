import axios from "axios";

export const binance = axios.create({
    baseURL: "https://data-api.binance.vision/api/v3",
  });