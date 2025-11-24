/**
 * General Helper Functions
 * Pure utility functions for common operations
 */

import { curry } from "./functional.js";
import { CONFIG } from "../config/constants.js";

/**
 * Safe number parsing
 * @param {string} value - Value to parse
 * @returns {number} Parsed number or 0
 */
export const parseNumber = (value) => {
  const parsed = parseFloat(value);
  return isNaN(parsed) || !isFinite(parsed) ? 0 : parsed;
};

/**
 * Format number with decimals
 * @param {number} num - Number to format
 * @param {number} decimals - Decimal places
 * @returns {string} Formatted number
 */
export const formatNumber = curry((decimals, num) => {
  if (num === 0) return "0";
  if (num < 0.000001) return "< 0.000001";
  return num.toFixed(decimals).replace(/\.?0+$/, "");
});

/**
 * Validate amount string
 * @param {string} value - Amount string
 * @returns {boolean} Is valid
 */
export const isValidAmount = (value) => {
  if (!value || value.trim() === "") return false;
  const regex = /^\d*\.?\d*$/;
  return regex.test(value);
};

/**
 * Get token icon URL
 * @param {string} symbol - Token symbol
 * @returns {string} Icon URL
 */
export const getTokenIconUrl = (symbol) =>
  `${CONFIG.TOKEN_ICON_BASE_URL}/${symbol}.svg`;
