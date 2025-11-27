import { curry } from "./functional.js";
import { CONFIG } from "../config/constants.js";

export const parseNumber = (value) => {
  const parsed = parseFloat(value);
  return isNaN(parsed) || !isFinite(parsed) ? 0 : parsed;
};

export const formatNumber = curry((decimals, num) => {
  if (num === 0) return "0";
  if (num < 0.000001) return "< 0.000001";
  return num.toFixed(decimals).replace(/\.?0+$/, "");
});

export const isValidAmount = (value) => {
  if (!value || value.trim() === "") return false;
  const regex = /^\d*\.?\d*$/;
  return regex.test(value);
};

export const getTokenIconUrl = (symbol) =>
  `${CONFIG.TOKEN_ICON_BASE_URL}/${symbol}.svg`;
