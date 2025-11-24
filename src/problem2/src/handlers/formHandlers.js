/**
 * Form Event Handlers
 * Handle form submission
 */

import { store } from "../store/index.js";
import { $$, addClass, removeClass } from "../utils/dom.js";

/**
 * Handle form submit
 */
export const handleFormSubmit = (event) => {
  event.preventDefault();

  const state = store.getState();
  const { fromToken, toToken, fromAmount, toAmount } = state;

  if (!fromToken || !toToken || !fromAmount) {
    const card = $$(".swap-card");
    if (card) {
      addClass("shake", card);
      setTimeout(() => removeClass("shake", card), 400);
    }
    return;
  }

  // Simulate swap confirmation
  alert(
    `Swap Confirmed!\n\n` +
      `You pay: ${fromAmount} ${fromToken.symbol}\n` +
      `You receive: ${toAmount} ${toToken.symbol}\n\n` +
      `This is a demo. No actual transaction will occur.`
  );
};

