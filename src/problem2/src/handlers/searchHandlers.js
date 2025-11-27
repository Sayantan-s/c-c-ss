import { store } from "../store/index.js";
import { debounce } from "../utils/functional.js";
import { filterTokens } from "../domain/exchange.js";
import { renderTokenList } from "../ui/render.js";
import { CONFIG } from "../config/constants.js";
import { handleTokenSelect } from "./tokenHandlers.js";

export const handleTokenSearch = debounce((event) => {
  const query = event.target.value;
  store.setState({ searchQuery: query });

  const state = store.getState();
  const filtered = filterTokens(query, state.tokens);
  renderTokenList(filtered, handleTokenSelect);
}, CONFIG.DEBOUNCE_DELAY);
