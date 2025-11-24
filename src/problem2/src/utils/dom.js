/**
 * DOM Utilities
 * Helper functions for DOM manipulation (Side Effects)
 */

import { curry } from "./functional.js";

/**
 * Get element by ID
 */
export const $ = (id) => document.getElementById(id);

/**
 * Query selector
 */
export const $$ = (selector) => document.querySelector(selector);

/**
 * Add event listener
 */
export const on = curry((event, handler, element) => {
  element.addEventListener(event, handler);
  return element;
});

/**
 * Set element text content
 */
export const setText = curry((text, element) => {
  if (element) element.textContent = text;
  return element;
});

/**
 * Set element HTML
 */
export const setHTML = curry((html, element) => {
  if (element) element.innerHTML = html;
  return element;
});

/**
 * Toggle class on element
 */
export const toggleClass = curry((className, element) => {
  if (element) element.classList.toggle(className);
  return element;
});

/**
 * Add class to element
 */
export const addClass = curry((className, element) => {
  if (element) element.classList.add(className);
  return element;
});

/**
 * Remove class from element
 */
export const removeClass = curry((className, element) => {
  if (element) element.classList.remove(className);
  return element;
});
