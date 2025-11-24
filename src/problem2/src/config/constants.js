/**
 * Application Configuration
 * Frozen constants for immutability
 */

export const CONFIG = Object.freeze({
  API_URL: "https://interview.switcheo.com/prices.json",
  TOKEN_ICON_BASE_URL:
    "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens",
  CACHE_DURATION: 60000, // 1 minute
  DEBOUNCE_DELAY: 300,
  MIN_AMOUNT: 0.000001,
  MAX_DECIMALS: 8,
});

