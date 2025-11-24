/**
 * Token Event Handlers
 * Handle token selection and modal interactions
 */

import { store } from "../store/index.js";
import { openModal, closeModal, renderTokenList } from "../ui/render.js";
import { calculateExchangeRate, calculateOutput } from "../domain/exchange.js";
import { formatNumber } from "../utils/helpers.js";
import { $, addClass, removeClass } from "../utils/dom.js";

/**
 * Handle token selection button click
 */
export const handleTokenButtonClick = (selectingFor) => {
  store.setState({ selectingFor, modalOpen: true });
  openModal();

  const state = store.getState();
  renderTokenList(state.tokens, handleTokenSelect);
};

/**
 * Handle token selection from modal
 */
export const handleTokenSelect = (symbol) => {
  const state = store.getState();
  const token = state.tokens.find((t) => t.symbol === symbol);

  if (!token) return;

  const updates = {};
  let shouldOpenOppositeSelector = false;

  if (state.selectingFor === "from") {
    updates.fromToken = token;

    // Prevent selecting the same token for both
    if (state.toToken && state.toToken.symbol === symbol) {
      updates.toToken = null;
      updates.toAmount = "";
    }

    // Auto-open "to" selector if not already selected
    if (!state.toToken || state.toToken.symbol === symbol) {
      shouldOpenOppositeSelector = true;
    }
  } else {
    updates.toToken = token;

    // Prevent selecting the same token for both
    if (state.fromToken && state.fromToken.symbol === symbol) {
      updates.fromToken = null;
      updates.fromAmount = "";
      updates.toAmount = "";
    }

    // Auto-open "from" selector if not already selected
    if (!state.fromToken || state.fromToken.symbol === symbol) {
      shouldOpenOppositeSelector = true;
    }
  }

  store.setState(updates);
  closeModal();
  store.setState({ modalOpen: false, searchQuery: "" });

  // Recalculate if both tokens are selected
  const newState = store.getState();
  if (newState.fromToken && newState.toToken) {
    const rate = calculateExchangeRate(newState.fromToken, newState.toToken);
    const amount = parseFloat(newState.fromAmount) || 0;
    const output = calculateOutput(rate, amount);

    store.setState({
      exchangeRate: rate,
      toAmount: output > 0 ? formatNumber(8, output) : "",
    });
  } else if (shouldOpenOppositeSelector) {
    // Focus on the opposite selector button after a short delay
    setTimeout(() => {
      const oppositeButtonId =
        state.selectingFor === "from" ? "to-token-btn" : "from-token-btn";
      const button = $(oppositeButtonId);

      if (button) {
        // Add pulse animation to draw attention
        addClass("pulse", button);
        button.focus();

        // Remove animation after it completes
        setTimeout(() => removeClass("pulse", button), 300);
      }
    }, 300);
  }
};

/**
 * Handle modal close
 */
export const handleModalClose = () => {
  closeModal();
  store.setState({ modalOpen: false, searchQuery: "" });
};

