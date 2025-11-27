import { CONFIG } from "../config/constants.js";
import { Result } from "../utils/monads.js";
import { createCache } from "./cache.js";

const priceCache = createCache();

export const fetchPrices = async () => {
  try {
    const response = await fetch(CONFIG.API_URL);
    if (!response.ok) {
      return Result.Err("Failed to fetch prices");
    }
    const data = await response.json();
    return Result.Ok(data);
  } catch (error) {
    return Result.Err(error.message);
  }
};

export const getPrices = async () => {
  const cached = priceCache.get();
  if (cached.hasValue) {
    return Result.Ok(cached.value);
  }

  const result = await fetchPrices();
  if (result.success) {
    priceCache.set(result.value);
  }
  return result;
};
