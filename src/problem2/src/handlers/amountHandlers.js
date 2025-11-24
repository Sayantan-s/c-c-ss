/**
 * Amount Input Handlers
 * Handle amount input and swap direction
 */

import { store } from "../store/index.js";
import { isValidAmount, parseNumber, formatNumber } from "../utils/helpers.js";
import { calculateOutput } from "../domain/exchange.js";
import { showError } from "../ui/render.js";
import { $, addClass, removeClass } from "../utils/dom.js";
import { debounce } from "../utils/functional.js";
import { CONFIG } from "../config/constants.js";

/**
 * Calculate and update output amount (debounced)
 * This is the expensive calculation that should be debounced
 */
const updateOutputAmount = debounce((value) => {
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
}, CONFIG.DEBOUNCE_DELAY);

/**
 * Handle from amount input
 * Validates immediately but debounces the calculation
 */
export const handleFromAmountInput = (event) => {
  const value = event.target.value;

  // Immediate validation (no debounce for instant feedback)
  if (value && !isValidAmount(value)) {
    showError("from-error", "Invalid amount");
    return;
  }

  showError("from-error", "");

  // Update fromAmount immediately for responsive input
  store.setState({ fromAmount: value });

  // Debounce the calculation to avoid unnecessary updates
  updateOutputAmount(value);
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
