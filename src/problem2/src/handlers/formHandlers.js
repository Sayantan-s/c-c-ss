import { store } from "../store/index.js";
import { $$, addClass, removeClass } from "../utils/dom.js";

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

  alert(
    `Swap Confirmed!\n\n` +
      `You pay: ${fromAmount} ${fromToken.symbol}\n` +
      `You receive: ${toAmount} ${toToken.symbol}\n\n` +
      `This is a demo. No actual transaction will occur.`
  );
};
