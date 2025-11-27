import { curry } from "../utils/functional.js";

export const calculateExchangeRate = curry((fromToken, toToken) => {
  if (!fromToken || !toToken || !fromToken.price || !toToken.price) {
    return 0;
  }
  return fromToken.price / toToken.price;
});

export const calculateOutput = curry((rate, inputAmount) => {
  if (!rate || !inputAmount) return 0;
  return inputAmount * rate;
});

export const filterTokens = curry((query, tokens) => {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return tokens;

  return tokens.filter((token) =>
    token.symbol.toLowerCase().includes(lowerQuery)
  );
});
