/**
 * State Management
 * Functional state container with pub-sub pattern
 */

/**
 * Create an immutable state container with pub-sub pattern
 */
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

// Application State
export const store = createStore({
  tokens: [],
  fromToken: null,
  toToken: null,
  fromAmount: "",
  toAmount: "",
  exchangeRate: 0,
  modalOpen: false,
  selectingFor: null, // 'from' or 'to'
  searchQuery: "",
  loading: false,
  error: null,
});
