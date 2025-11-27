import { store } from "../store/index.js";
import { openModal, closeModal, renderTokenList } from "../ui/render.js";
import { calculateExchangeRate, calculateOutput } from "../domain/exchange.js";
import { formatNumber } from "../utils/helpers.js";
import { $, addClass, removeClass } from "../utils/dom.js";
import { resetKeyboardNavigation } from "./keyboardHandlers.js";

export const handleTokenButtonClick = (selectingFor) => {
  store.setState({ selectingFor, modalOpen: true });
  resetKeyboardNavigation();
  openModal();

  const state = store.getState();
  renderTokenList(state.tokens, handleTokenSelect);
};

export const handleTokenSelect = (symbol) => {
  const state = store.getState();
  const token = state.tokens.find((t) => t.symbol === symbol);

  if (!token) return;

  const updates = {};
  let shouldOpenOppositeSelector = false;

  if (state.selectingFor === "from") {
    updates.fromToken = token;

    if (state.toToken && state.toToken.symbol === symbol) {
      updates.toToken = null;
      updates.toAmount = "";
    }

    if (!state.toToken || state.toToken.symbol === symbol) {
      shouldOpenOppositeSelector = true;
    }
  } else {
    updates.toToken = token;

    if (state.fromToken && state.fromToken.symbol === symbol) {
      updates.fromToken = null;
      updates.fromAmount = "";
      updates.toAmount = "";
    }

    if (!state.fromToken || state.fromToken.symbol === symbol) {
      shouldOpenOppositeSelector = true;
    }
  }

  store.setState(updates);
  closeModal();
  resetKeyboardNavigation();
  store.setState({ modalOpen: false, searchQuery: "" });

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
    setTimeout(() => {
      const oppositeButtonId =
        state.selectingFor === "from" ? "to-token-btn" : "from-token-btn";
      const button = $(oppositeButtonId);

      if (button) {
        addClass("pulse", button);
        button.focus();

        setTimeout(() => removeClass("pulse", button), 300);
      }
    }, 300);
  }
};

export const handleModalClose = () => {
  closeModal();
  resetKeyboardNavigation();
  store.setState({ modalOpen: false, searchQuery: "" });
};
