/**
 * Functional Programming Utilities
 * Pure functional helpers: compose, pipe, curry, etc.
 */

/**
 * Compose functions from right to left
 * @param {...Function} fns - Functions to compose
 * @returns {Function} Composed function
 */
export const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((acc, fn) => fn(acc), x);

/**
 * Pipe functions from left to right
 * @param {...Function} fns - Functions to pipe
 * @returns {Function} Piped function
 */
export const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((acc, fn) => fn(acc), x);

/**
 * Curry a function
 * @param {Function} fn - Function to curry
 * @returns {Function} Curried function
 */
export const curry = (fn) => {
  const arity = fn.length;
  return function $curry(...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }
    return fn.call(null, ...args);
  };
};

/**
 * Debounce function execution
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Deep freeze an object for immutability
 * @param {Object} obj - Object to freeze
 * @returns {Object} Frozen object
 */
export const deepFreeze = (obj) => {
  Object.keys(obj).forEach((prop) => {
    if (typeof obj[prop] === "object" && obj[prop] !== null) {
      deepFreeze(obj[prop]);
    }
  });
  return Object.freeze(obj);
};
