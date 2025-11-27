import { pipe } from "../utils/functional.js";
import { getTokenIconUrl } from "../utils/helpers.js";

export const filterValidPrices = (prices) =>
  prices.filter((item) => item.price && item.price > 0);

export const getLatestPrices = (prices) => {
  const grouped = prices.reduce((acc, item) => {
    const existing = acc.get(item.currency);
    if (!existing || new Date(item.date) > new Date(existing.date)) {
      acc.set(item.currency, item);
    }
    return acc;
  }, new Map());
  return grouped;
};

export const createTokenObjects = (priceMap) =>
  Array.from(priceMap.values()).map((item) => ({
    symbol: item.currency,
    price: item.price,
    date: item.date,
    iconUrl: getTokenIconUrl(item.currency),
  }));

export const sortTokens = (tokens) =>
  [...tokens].sort((a, b) => a.symbol.localeCompare(b.symbol));

export const processTokens = pipe(
  filterValidPrices,
  getLatestPrices,
  createTokenObjects,
  sortTokens
);
