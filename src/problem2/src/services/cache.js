/**
 * Caching Service
 * Create and manage cache stores
 */

import { deepFreeze } from "../utils/functional.js";
import { Maybe } from "../utils/monads.js";
import { CONFIG } from "../config/constants.js";

/**
 * Create a cache store
 */
export const createCache = () => {
  let cache = null;
  let timestamp = null;

  return {
    get: () => {
      if (
        !cache ||
        !timestamp ||
        Date.now() - timestamp > CONFIG.CACHE_DURATION
      ) {
        return Maybe.Nothing();
      }
      return Maybe.Just(cache);
    },
    set: (data) => {
      cache = deepFreeze(data);
      timestamp = Date.now();
      return cache;
    },
    clear: () => {
      cache = null;
      timestamp = null;
    },
  };
};
