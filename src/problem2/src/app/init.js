/**
 * Application Initialization
 * Bootstrap the application
 */

import { store } from "../store/index.js";
import { getPrices } from "../services/api.js";
import { processTokens } from "../domain/token.js";
import { $ } from "../utils/dom.js";
import { handleFromAmountInput } from "../handlers/amountHandlers.js";
import { handleSwapDirection } from "../handlers/amountHandlers.js";
import {
  handleTokenButtonClick,
  handleModalClose,
} from "../handlers/tokenHandlers.js";
import { handleTokenSearch } from "../handlers/searchHandlers.js";
import { handleFormSubmit } from "../handlers/formHandlers.js";
import { setupSubscriptions } from "./subscriptions.js";

/**
 * Setup event listeners
 */
const setupEventListeners = () => {
  const fromInput = $("from-amount");
  const fromButton = $("from-token-btn");
  const toButton = $("to-token-btn");
  const swapButton = $("swap-direction-btn");
  const modalClose = $("modal-close");
  const tokenSearch = $("token-search");
  const tokenModal = $("token-modal");
  const swapForm = $("swap-form");

  if (fromInput) {
    fromInput.addEventListener("input", handleFromAmountInput);
  }

  if (fromButton) {
    fromButton.addEventListener("click", () => handleTokenButtonClick("from"));
  }

  if (toButton) {
    toButton.addEventListener("click", () => handleTokenButtonClick("to"));
  }

  if (swapButton) {
    swapButton.addEventListener("click", handleSwapDirection);
  }

  if (modalClose) {
    modalClose.addEventListener("click", handleModalClose);
  }

  if (tokenModal) {
    tokenModal.addEventListener("click", (e) => {
      if (e.target === tokenModal) {
        handleModalClose();
      }
    });
  }

  if (tokenSearch) {
    tokenSearch.addEventListener("input", handleTokenSearch);
  }

  if (swapForm) {
    swapForm.addEventListener("submit", handleFormSubmit);
  }

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && store.getState().modalOpen) {
      handleModalClose();
    }
  });
};

/**
 * Initialize application
 */
export const init = async () => {
  // Fetch token prices
  const result = await getPrices();

  if (!result.success) {
    alert("Failed to load token prices. Please refresh the page.");
    return;
  }

  // Process tokens
  const tokens = processTokens(result.value);
  store.setState({ tokens, loading: false });

  // Setup subscriptions and event listeners
  setupSubscriptions();
  setupEventListeners();

  console.log("🚀 Currency Swap App Initialized");
  console.log(`📊 Loaded ${tokens.length} tokens`);
};
