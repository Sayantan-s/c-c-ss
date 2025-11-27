import { curry } from "./functional.js";

export const $ = (id) => document.getElementById(id);

export const $$ = (selector) => document.querySelector(selector);

export const on = curry((event, handler, element) => {
  element.addEventListener(event, handler);
  return element;
});

export const setText = curry((text, element) => {
  if (element) element.textContent = text;
  return element;
});

export const setHTML = curry((html, element) => {
  if (element) element.innerHTML = html;
  return element;
});

export const toggleClass = curry((className, element) => {
  if (element) element.classList.toggle(className);
  return element;
});

export const addClass = curry((className, element) => {
  if (element) element.classList.add(className);
  return element;
});

export const removeClass = curry((className, element) => {
  if (element) element.classList.remove(className);
  return element;
});
