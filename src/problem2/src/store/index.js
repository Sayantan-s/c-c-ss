const createStore = (initialState) => {
  let state = { ...initialState };
  const listeners = new Set();

  return {
    getState: () => ({ ...state }),
    setState: (updates) => {
      state = { ...state, ...updates };
      listeners.forEach((listener) => listener(state));
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
};

export const store = createStore({
  tokens: [],
  fromToken: null,
  toToken: null,
  fromAmount: "",
  toAmount: "",
  exchangeRate: 0,
  modalOpen: false,
  selectingFor: null,
  searchQuery: "",
  loading: false,
  error: null,
});
