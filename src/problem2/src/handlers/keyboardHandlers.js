/**
 * Keyboard Navigation Handlers
 * Handle keyboard navigation in token list
 */

import { $ } from "../utils/dom.js";

let currentFocusedIndex = -1;
let currentHoveredIndex = -1;

/**
 * Handle keyboard navigation in token list
 */
export const handleTokenListKeyboard = (event, onTokenSelect) => {
  const tokenList = $("token-list");
  if (!tokenList) return;

  const items = Array.from(tokenList.querySelectorAll(".token-item"));
  if (items.length === 0) return;

  const searchInput = $("token-search");

  switch (event.key) {
    case "ArrowDown":
      event.preventDefault();
      
      // If starting navigation and an item is hovered, start from there
      if (currentFocusedIndex === -1 && currentHoveredIndex >= 0) {
        currentFocusedIndex = currentHoveredIndex;
      }
      
      currentFocusedIndex = Math.min(currentFocusedIndex + 1, items.length - 1);
      removeHoverFromAllItems(items);
      focusTokenItem(items, currentFocusedIndex);
      break;

    case "ArrowUp":
      event.preventDefault();
      
      // If starting navigation and an item is hovered, start from there
      if (currentFocusedIndex === -1 && currentHoveredIndex >= 0) {
        currentFocusedIndex = currentHoveredIndex;
      }
      
      currentFocusedIndex = Math.max(currentFocusedIndex - 1, -1);
      removeHoverFromAllItems(items);
      
      if (currentFocusedIndex === -1) {
        // Go back to search input
        searchInput?.focus();
        removeFocusFromAllItems(items);
      } else {
        focusTokenItem(items, currentFocusedIndex);
      }
      break;

    case "Enter":
      event.preventDefault();
      if (currentFocusedIndex >= 0 && currentFocusedIndex < items.length) {
        const symbol = items[currentFocusedIndex].dataset.symbol;
        onTokenSelect(symbol);
      }
      break;

    case "Escape":
      event.preventDefault();
      // Modal close is handled elsewhere
      break;

    default:
      break;
  }
};

/**
 * Focus on a specific token item
 */
const focusTokenItem = (items, index) => {
  removeFocusFromAllItems(items);
  
  // Blur search input
  const searchInput = $("token-search");
  if (searchInput) {
    searchInput.blur();
  }
  
  if (index >= 0 && index < items.length) {
    const item = items[index];
    item.classList.add("focused");
    item.setAttribute("tabindex", "0");
    
    // Scroll into view if needed
    item.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }
};

/**
 * Remove focus class from all items
 */
const removeFocusFromAllItems = (items) => {
  items.forEach((item) => {
    item.classList.remove("focused");
    item.setAttribute("tabindex", "-1");
  });
};

/**
 * Remove hover state from all items
 */
const removeHoverFromAllItems = (items) => {
  items.forEach((item) => {
    item.classList.remove("keyboard-nav-active");
  });
};

/**
 * Set up hover tracking for token items
 */
export const setupHoverTracking = () => {
  const tokenList = $("token-list");
  if (!tokenList) return;

  const items = Array.from(tokenList.querySelectorAll(".token-item"));
  
  items.forEach((item, index) => {
    item.addEventListener("mouseenter", () => {
      currentHoveredIndex = index;
      // Remove hover effect when keyboard nav starts
      if (currentFocusedIndex >= 0) {
        item.classList.add("keyboard-nav-active");
      }
    });
    
    item.addEventListener("mouseleave", () => {
      if (currentHoveredIndex === index) {
        currentHoveredIndex = -1;
      }
    });
  });
};

/**
 * Reset keyboard navigation state
 */
export const resetKeyboardNavigation = () => {
  currentFocusedIndex = -1;
  currentHoveredIndex = -1;
};

