import { $ } from "../utils/dom.js";

let currentFocusedIndex = -1;
let currentHoveredIndex = -1;

export const handleTokenListKeyboard = (event, onTokenSelect) => {
  const tokenList = $("token-list");
  if (!tokenList) return;

  const items = Array.from(tokenList.querySelectorAll(".token-item"));
  if (items.length === 0) return;

  const searchInput = $("token-search");

  switch (event.key) {
    case "ArrowDown":
      event.preventDefault();
      
      if (currentFocusedIndex === -1 && currentHoveredIndex >= 0) {
        currentFocusedIndex = currentHoveredIndex;
      }
      
      currentFocusedIndex = Math.min(currentFocusedIndex + 1, items.length - 1);
      removeHoverFromAllItems(items);
      focusTokenItem(items, currentFocusedIndex);
      break;

    case "ArrowUp":
      event.preventDefault();
      
      if (currentFocusedIndex === -1 && currentHoveredIndex >= 0) {
        currentFocusedIndex = currentHoveredIndex;
      }
      
      currentFocusedIndex = Math.max(currentFocusedIndex - 1, -1);
      removeHoverFromAllItems(items);
      
      if (currentFocusedIndex === -1) {
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
      break;

    default:
      break;
  }
};

const focusTokenItem = (items, index) => {
  removeFocusFromAllItems(items);
  
  const searchInput = $("token-search");
  if (searchInput) {
    searchInput.blur();
  }
  
  if (index >= 0 && index < items.length) {
    const item = items[index];
    item.classList.add("focused");
    item.setAttribute("tabindex", "0");
    
    item.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }
};

const removeFocusFromAllItems = (items) => {
  items.forEach((item) => {
    item.classList.remove("focused");
    item.setAttribute("tabindex", "-1");
  });
};

const removeHoverFromAllItems = (items) => {
  items.forEach((item) => {
    item.classList.remove("keyboard-nav-active");
  });
};

export const setupHoverTracking = () => {
  const tokenList = $("token-list");
  if (!tokenList) return;

  const items = Array.from(tokenList.querySelectorAll(".token-item"));
  
  items.forEach((item, index) => {
    item.addEventListener("mouseenter", () => {
      currentHoveredIndex = index;
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

export const resetKeyboardNavigation = () => {
  currentFocusedIndex = -1;
  currentHoveredIndex = -1;
};
