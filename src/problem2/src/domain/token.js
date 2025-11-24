/**
 * Token Domain Logic
 * Pure functions for token data transformation
 */

import { pipe } from "../utils/functional.js";
import { getTokenIconUrl } from "../utils/helpers.js";

/**
 * Filter tokens with valid prices
 * @param {Array} prices - Raw price data
 * @returns {Array} Filtered prices
 */
export const filterValidPrices = (prices) =>
  prices.filter((item) => item.price && item.price > 0);

/**
 * Group prices by currency and get latest
 * @param {Array} prices - Price array
 * @returns {Map} Map of currency to latest price
 */
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

/**
 * Transform price data to token objects
 * @param {Map} priceMap - Map of prices
 * @returns {Array} Array of token objects
 */
export const createTokenObjects = (priceMap) =>
  Array.from(priceMap.values()).map((item) => ({
    symbol: item.currency,
    price: item.price,
    date: item.date,
    iconUrl: getTokenIconUrl(item.currency),
  }));

/**
 * Sort tokens by symbol alphabetically
 * @param {Array} tokens - Token array
 * @returns {Array} Sorted tokens
 */
export const sortTokens = (tokens) =>
  [...tokens].sort((a, b) => a.symbol.localeCompare(b.symbol));

/**
 * Process raw price data to tokens
 * Pure function composition
 */
export const processTokens = pipe(
  filterValidPrices,
  getLatestPrices,
  createTokenObjects,
  sortTokens
);
