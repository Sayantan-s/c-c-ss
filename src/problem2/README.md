# Currency Swap Application

A modern, production-ready currency swap interface built with **atomic functional programming patterns** and **modular architecture**.

## 🚀 Quick Start

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build
```

## 📁 Project Structure

```
src/problem2/
├── index.html              # Main HTML file
├── style.css               # Global styles
├── src/
│   ├── main.js            # Application entry point
│   │
│   ├── config/            # Configuration
│   │   └── constants.js   # App constants (API URLs, etc.)
│   │
│   ├── utils/             # Pure utility functions
│   │   ├── functional.js  # FP utilities (compose, pipe, curry)
│   │   ├── monads.js      # Result/Maybe monads
│   │   ├── helpers.js     # General helpers
│   │   └── dom.js         # DOM utilities
│   │
│   ├── services/          # External services
│   │   ├── api.js         # API calls
│   │   └── cache.js       # Caching logic
│   │
│   ├── domain/            # Business logic (Pure functions)
│   │   ├── token.js       # Token transformations
│   │   └── exchange.js    # Exchange calculations
│   │
│   ├── store/             # State management
│   │   └── index.js       # Immutable state store
│   │
│   ├── ui/                # UI rendering
│   │   └── render.js      # DOM rendering functions
│   │
│   ├── handlers/          # Event handlers
│   │   ├── tokenHandlers.js   # Token selection
│   │   ├── amountHandlers.js  # Amount input
│   │   ├── searchHandlers.js  # Search functionality
│   │   └── formHandlers.js    # Form submission
│   │
│   └── app/               # Application setup
│       ├── init.js        # Initialization
│       └── subscriptions.js # State subscriptions
│
├── package.json
└── README.md
```

## 🏗️ Architecture Overview

### Layered Architecture

```
┌─────────────────────────────────────────┐
│  APPLICATION LAYER (app/)                │
│  • Initialization                        │
│  • Event binding                         │
│  • State subscriptions                   │
├─────────────────────────────────────────┤
│  PRESENTATION LAYER (ui/, handlers/)     │
│  • DOM Rendering                         │
│  • Event Handlers                        │
│  • User Interactions                     │
├─────────────────────────────────────────┤
│  DOMAIN LAYER (domain/)                  │
│  • Business Logic (Pure)                 │
│  • Token Processing                      │
│  • Exchange Calculations                 │
├─────────────────────────────────────────┤
│  STATE LAYER (store/)                    │
│  • Immutable Store                       │
│  • Pub-Sub Pattern                       │
│  • State Updates                         │
├─────────────────────────────────────────┤
│  INFRASTRUCTURE LAYER (services/)        │
│  • API Integration                       │
│  • Caching                               │
│  • External Services                     │
├─────────────────────────────────────────┤
│  FOUNDATION LAYER (utils/, config/)      │
│  • Pure Utilities                        │
│  • Configuration                         │
│  • Common Helpers                        │
└─────────────────────────────────────────┘
```

## 🎯 Module Responsibilities

### 📦 config/
**Purpose**: Application-wide configuration
- `constants.js`: Frozen configuration object (API URLs, timeouts, limits)

### 🛠️ utils/
**Purpose**: Pure, reusable utility functions
- `functional.js`: FP patterns (compose, pipe, curry, debounce, deepFreeze)
- `monads.js`: Result/Maybe monads for functional error handling
- `helpers.js`: Common helpers (parseNumber, formatNumber, validation)
- `dom.js`: DOM manipulation utilities (side effects isolated)

### 🌐 services/
**Purpose**: External service integration
- `api.js`: API calls to fetch token prices
- `cache.js`: Caching mechanism with TTL

### 💼 domain/
**Purpose**: Pure business logic
- `token.js`: Token data transformations (filter, sort, process)
- `exchange.js`: Exchange rate calculations and token filtering

### 🗄️ store/
**Purpose**: State management
- `index.js`: Immutable state container with pub-sub pattern

### 🎨 ui/
**Purpose**: UI rendering (side effects)
- `render.js`: DOM rendering functions (buttons, lists, modals)

### 🎮 handlers/
**Purpose**: Event handling
- `tokenHandlers.js`: Token selection logic
- `amountHandlers.js`: Amount input and swap direction
- `searchHandlers.js`: Token search functionality
- `formHandlers.js`: Form submission

### 🚀 app/
**Purpose**: Application bootstrap
- `init.js`: App initialization and event binding
- `subscriptions.js`: State change subscriptions

## 🔄 Data Flow

```
User Action
    ↓
Event Handler (handlers/)
    ↓
Business Logic (domain/)
    ↓
State Update (store/)
    ↓
Subscription Trigger (app/subscriptions.js)
    ↓
UI Re-render (ui/render.js)
    ↓
DOM Update
```

## 🎨 Design Patterns

### 1. **Module Pattern**
Each file exports focused, single-responsibility modules.

### 2. **Pub-Sub Pattern**
State changes trigger UI updates via subscriptions.

```javascript
// store/index.js
store.subscribe((state) => {
  // UI updates automatically
});
```

### 3. **Pure Functions**
All business logic is side-effect free.

```javascript
// domain/exchange.js
export const calculateExchangeRate = curry((fromToken, toToken) => {
  return fromToken.price / toToken.price;
});
```

### 4. **Function Composition**
Complex operations built from simple functions.

```javascript
// domain/token.js
export const processTokens = pipe(
  filterValidPrices,
  getLatestPrices,
  createTokenObjects,
  sortTokens
);
```

### 5. **Dependency Injection**
Functions receive dependencies as parameters.

```javascript
// ui/render.js
export const renderTokenList = (tokens, onTokenSelect) => {
  // onTokenSelect is injected
};
```

### 6. **Monads for Error Handling**
Result/Maybe types for functional error handling.

```javascript
// services/api.js
const result = await fetchPrices();
if (result.success) {
  // Handle success
} else {
  // Handle error
}
```

## 🧪 Testing Strategy

### Unit Tests (Pure Functions)
```javascript
// Easy to test - no mocking needed
import { calculateExchangeRate } from './domain/exchange.js';

test('calculates exchange rate', () => {
  const from = { price: 1000 };
  const to = { price: 1 };
  expect(calculateExchangeRate(from, to)).toBe(1000);
});
```

### Integration Tests
```javascript
// Test data flow through layers
import { processTokens } from './domain/token.js';

test('processes raw API data', () => {
  const raw = [/* mock data */];
  const tokens = processTokens(raw);
  expect(tokens).toHaveLength(30);
});
```

## 🎯 Key Features

### ✅ Atomic Functional Programming
- **Pure Functions**: 80% of codebase
- **Immutability**: No mutations anywhere
- **Function Composition**: pipe/compose patterns
- **Currying**: Partial application
- **Monads**: Functional error handling

### ✅ Modular Architecture
- **Separation of Concerns**: Each module has single responsibility
- **Loose Coupling**: Modules interact via clean interfaces
- **High Cohesion**: Related functions grouped together
- **Easy Testing**: Pure functions are naturally testable

### ✅ Scalability
- **Add New Features**: Just add new modules
- **Extend Functionality**: Compose existing functions
- **Refactor Safely**: Pure functions can't break others
- **Team Development**: Clear module boundaries

## 🔧 Development Guidelines

### Adding a New Feature

1. **Domain Logic** (Pure):
   - Add to `domain/` if it's business logic
   - Keep it pure (no side effects)

2. **UI Changes**:
   - Add rendering to `ui/render.js`
   - Keep side effects isolated

3. **Event Handling**:
   - Add to appropriate handler in `handlers/`
   - Wire up in `app/init.js`

4. **State Changes**:
   - Update store schema in `store/index.js`
   - Add subscription if needed

### Example: Adding Price Chart Feature

```javascript
// 1. Add to domain/
// domain/chart.js
export const processChartData = pipe(
  filterHistoricalPrices,
  groupByTimeframe,
  calculateMovingAverage
);

// 2. Add to ui/
// ui/render.js
export const renderPriceChart = (data) => {
  // Render chart
};

// 3. Add handler
// handlers/chartHandlers.js
export const handleTimeframeChange = (timeframe) => {
  // Handle timeframe selection
};

// 4. Wire up in init
// app/init.js
import { handleTimeframeChange } from './handlers/chartHandlers.js';
// ... setup listeners
```

## 📊 Performance

### Optimizations Applied
- ✅ Debounced search (300ms)
- ✅ Price caching (1 minute TTL)
- ✅ Selective re-rendering
- ✅ Event delegation where possible
- ✅ Lazy image loading with fallbacks

### Bundle Size
- Main JS: ~25KB (minified)
- CSS: ~8KB (minified)
- Total: ~33KB + assets

## 🔒 Code Quality

### Principles
- **DRY**: Don't Repeat Yourself
- **SOLID**: Single Responsibility, Open/Closed, etc.
- **KISS**: Keep It Simple
- **YAGNI**: You Aren't Gonna Need It

### Standards
- ES6+ modules
- Consistent naming conventions
- JSDoc comments for complex functions
- Pure functions where possible
- Side effects isolated in specific modules

## 🚀 Deployment

```bash
# Build for production
yarn build

# Output in dist/
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
```

Deploy `dist/` folder to:
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

## 🔮 Future Enhancements

### Easy Additions (Same Pattern)
- [ ] Price charts → Add `domain/chart.js`, `ui/chartRender.js`
- [ ] Transaction history → Add `services/history.js`, `domain/transaction.js`
- [ ] User preferences → Add `services/storage.js`, `store/preferences.js`
- [ ] Multi-language → Add `config/i18n.js`, `utils/translate.js`

### Framework Migration
The modular structure makes it easy to migrate to:
- **React**: Components map to modules
- **Vue**: Similar component structure
- **Svelte**: Stores align with state management

## 📚 Learning Resources

### Understanding the Code
1. Start with `src/main.js` - entry point
2. Read `app/init.js` - see how it's wired up
3. Explore `domain/` - pure business logic
4. Check `handlers/` - see event flow
5. Study `utils/functional.js` - FP patterns

### Functional Programming
- **Compose/Pipe**: Combine functions
- **Curry**: Partial application
- **Pure Functions**: Predictable behavior
- **Immutability**: No mutations
- **Monads**: Functional error handling

## 🤝 Contributing

### Code Style
- Use ES6+ features
- Keep functions small (< 20 lines)
- Write pure functions when possible
- Document complex logic with JSDoc
- Follow existing patterns

### Adding Dependencies
```bash
yarn add package-name
```

Update imports and maintain module structure.

## 📄 License

Educational code challenge submission.

---

**Built with functional programming principles and modular architecture.**

For questions or improvements, feel free to refactor and extend!

