import { store } from "../store/index.js";
import { getPrices } from "../services/api.js";
import { processTokens } from "../domain/token.js";
import { $ } from "../utils/dom.js";
import { handleFromAmountInput } from "../handlers/amountHandlers.js";
import { handleSwapDirection } from "../handlers/amountHandlers.js";
import {
  handleTokenButtonClick,
  handleModalClose,
  handleTokenSelect,
} from "../handlers/tokenHandlers.js";
import { handleTokenSearch } from "../handlers/searchHandlers.js";
import { handleFormSubmit } from "../handlers/formHandlers.js";
import { setupSubscriptions } from "./subscriptions.js";
import {
  handleTokenListKeyboard,
  resetKeyboardNavigation,
} from "../handlers/keyboardHandlers.js";

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

  document.addEventListener("keydown", (e) => {
    const state = store.getState();

    if (state.modalOpen) {
      if (["ArrowDown", "ArrowUp", "Enter"].includes(e.key)) {
        handleTokenListKeyboard(e, handleTokenSelect);
      }

      if (e.key === "Escape") {
        handleModalClose();
        resetKeyboardNavigation();
      }
    }
  });
};

export const init = async () => {
  const result = await getPrices();

  if (!result.success) {
    alert("Failed to load token prices. Please refresh the page.");
    return;
  }

  const tokens = processTokens(result.value);
  store.setState({ tokens, loading: false });

  setupSubscriptions();
  setupEventListeners();

  console.log("🚀 Currency Swap App Initialized");
  console.log(`📊 Loaded ${tokens.length} tokens`);
};
