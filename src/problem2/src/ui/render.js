import { $, addClass, removeClass } from "../utils/dom.js";
import { formatNumber } from "../utils/helpers.js";
import { setupHoverTracking } from "../handlers/keyboardHandlers.js";

export const renderTokenButton = (buttonId, token) => {
  const button = $(buttonId);
  if (!button) return;

  if (token) {
    button.innerHTML = `
      <div class="token-display">
        <img src="${token.iconUrl}" alt="${token.symbol}" class="token-icon" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <div class="token-icon-placeholder" style="display: none;">
          <span>${token.symbol[0]}</span>
        </div>
        <span class="token-symbol">${token.symbol}</span>
      </div>
      <svg class="chevron-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M4 6l4 4 4-4z"/>
      </svg>
    `;
  }
};

export const renderExchangeRate = (fromToken, toToken, rate) => {
  const rateElement = $("exchange-rate");
  if (!rateElement) return;

  if (!fromToken || !toToken || !rate) {
    rateElement.textContent = "";
    return;
  }

  const formattedRate = formatNumber(6, rate);
  rateElement.textContent = `1 ${fromToken.symbol} = ${formattedRate} ${toToken.symbol}`;
};

export const renderTokenList = (tokens, onTokenSelect) => {
  const tokenList = $("token-list");
  if (!tokenList) return;

  if (tokens.length === 0) {
    tokenList.innerHTML = `
      <div class="no-results">
        <p>No tokens found</p>
      </div>
    `;
    return;
  }

  const html = tokens
    .map(
      (token) => `
    <div class="token-item" data-symbol="${token.symbol}" tabindex="-1">
      <img src="${token.iconUrl}" alt="${
        token.symbol
      }" class="token-item-icon" onerror="this.style.display='none';">
      <div class="token-item-info">
        <div class="token-item-symbol">${token.symbol}</div>
      </div>
      <div class="token-item-price">
        <div class="token-item-price-value">$${formatNumber(
          6,
          token.price
        )}</div>
      </div>
    </div>
  `
    )
    .join("");

  tokenList.innerHTML = html;

  tokenList.dataset.onTokenSelect = "handleTokenSelect";

  tokenList.querySelectorAll(".token-item").forEach((item) => {
    item.addEventListener("click", () => {
      const symbol = item.dataset.symbol;
      onTokenSelect(symbol);
    });
  });

  setupHoverTracking();
};

export const showError = (elementId, message) => {
  const element = $(elementId);
  if (!element) return;

  if (message) {
    element.textContent = message;
    addClass("show", element);
  } else {
    removeClass("show", element);
  }
};

export const updateSubmitButton = (state) => {
  const button = $("submit-btn");
  if (!button) return;

  const { fromToken, toToken, fromAmount } = state;
  const amount = parseFloat(fromAmount);

  if (!fromToken || !toToken) {
    button.textContent = "SELECT TOKENS";
    button.disabled = true;
  } else if (!amount || amount <= 0) {
    button.textContent = "ENTER AMOUNT";
    button.disabled = true;
  } else {
    button.textContent = "CONFIRM SWAP";
    button.disabled = false;
  }
};

export const openModal = () => {
  const modal = $("token-modal");
  if (modal) {
    addClass("show", modal);
    setTimeout(() => $("token-search")?.focus(), 100);
  }
};

export const closeModal = () => {
  const modal = $("token-modal");
  if (modal) {
    removeClass("show", modal);
  }

  const searchInput = $("token-search");
  if (searchInput) searchInput.value = "";
};
