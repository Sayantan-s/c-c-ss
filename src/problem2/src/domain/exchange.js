/**
 * Exchange Domain Logic
 * Pure functions for exchange rate calculations
 */

import { curry } from "../utils/functional.js";

/**
 * Calculate exchange rate between two tokens
 * @param {Object} fromToken - Source token
 * @param {Object} toToken - Target token
 * @returns {number} Exchange rate
 */
export const calculateExchangeRate = curry((fromToken, toToken) => {
  if (!fromToken || !toToken || !fromToken.price || !toToken.price) {
    return 0;
  }
  return fromToken.price / toToken.price;
});

/**
 * Calculate output amount
 * @param {number} rate - Exchange rate
 * @param {number} inputAmount - Input amount
 * @returns {number} Output amount
 */
export const calculateOutput = curry((rate, inputAmount) => {
  if (!rate || !inputAmount) return 0;
  return inputAmount * rate;
});

/**
 * Filter tokens by search query
 * @param {string} query - Search query
 * @param {Array} tokens - Token array
 * @returns {Array} Filtered tokens
 */
export const filterTokens = curry((query, tokens) => {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return tokens;

  return tokens.filter((token) =>
    token.symbol.toLowerCase().includes(lowerQuery)
  );
});

