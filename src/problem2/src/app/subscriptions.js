import { store } from "../store/index.js";
import {
  renderTokenButton,
  renderExchangeRate,
  updateSubmitButton,
} from "../ui/render.js";
import { $ } from "../utils/dom.js";

export const setupSubscriptions = () => {
  store.subscribe((state) => {
    renderTokenButton("from-token-btn", state.fromToken);
    renderTokenButton("to-token-btn", state.toToken);

    renderExchangeRate(state.fromToken, state.toToken, state.exchangeRate);

    const fromInput = $("from-amount");
    const toInput = $("to-amount");

    if (fromInput && fromInput.value !== state.fromAmount) {
      fromInput.value = state.fromAmount;
    }

    if (toInput && toInput.value !== state.toAmount) {
      toInput.value = state.toAmount;
    }

    updateSubmitButton(state);
  });
};
