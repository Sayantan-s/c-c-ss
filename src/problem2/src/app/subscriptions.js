/**
 * State Subscriptions
 * Subscribe to state changes and update UI
 */

import { store } from "../store/index.js";
import {
  renderTokenButton,
  renderExchangeRate,
  updateSubmitButton,
} from "../ui/render.js";
import { $ } from "../utils/dom.js";

/**
 * Setup state subscriptions
 */
export const setupSubscriptions = () => {
  store.subscribe((state) => {
    // Update token buttons
    renderTokenButton("from-token-btn", state.fromToken);
    renderTokenButton("to-token-btn", state.toToken);

    // Update exchange rate display
    renderExchangeRate(state.fromToken, state.toToken, state.exchangeRate);

    // Update amounts
    const fromInput = $("from-amount");
    const toInput = $("to-amount");

    if (fromInput && fromInput.value !== state.fromAmount) {
      fromInput.value = state.fromAmount;
    }

    if (toInput && toInput.value !== state.toAmount) {
      toInput.value = state.toAmount;
    }

    // Update submit button
    updateSubmitButton(state);
  });
};

