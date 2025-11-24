/**
 * Amount Input Handlers
 * Handle amount input and swap direction
 */

import { store } from "../store/index.js";
import { isValidAmount, parseNumber, formatNumber } from "../utils/helpers.js";
import { calculateOutput } from "../domain/exchange.js";
import { showError } from "../ui/render.js";
import { $, addClass, removeClass } from "../utils/dom.js";

/**
 * Handle from amount input
 */
export const handleFromAmountInput = (event) => {
  const value = event.target.value;

  // Validate input
  if (value && !isValidAmount(value)) {
    showError("from-error", "Invalid amount");
    return;
  }

  showError("from-error", "");
  const state = store.getState();
  const amount = parseNumber(value);

  // Calculate output amount
  const outputAmount =
    state.fromToken && state.toToken
      ? calculateOutput(state.exchangeRate, amount)
      : 0;

  store.setState({
    fromAmount: value,
    toAmount: outputAmount > 0 ? formatNumber(8, outputAmount) : "",
  });
};

/**
 * Handle swap direction
 */
export const handleSwapDirection = () => {
  const state = store.getState();

  if (!state.fromToken && !state.toToken) return;

  const button = $("swap-direction-btn");
  if (button) {
    addClass("pulse", button);
    setTimeout(() => removeClass("pulse", button), 300);
  }

  store.setState({
    fromToken: state.toToken,
    toToken: state.fromToken,
    fromAmount: state.toAmount,
    toAmount: state.fromAmount,
    exchangeRate: state.exchangeRate > 0 ? 1 / state.exchangeRate : 0,
  });
};

