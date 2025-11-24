/**
 * Currency Swap Application
 * Built with Atomic Functional Programming Patterns
 *
 * Architecture:
 * - Pure Functions: All business logic is side-effect free
 * - Function Composition: Small functions combined into complex behavior
 * - Immutable State: No data mutations anywhere
 * - Functional Error Handling: Result/Maybe monads
 * - Declarative UI: State-driven rendering
 *
 * Directory Structure:
 * - config/      : Application configuration
 * - utils/       : Pure utility functions
 * - services/    : API and caching
 * - domain/      : Business logic
 * - store/       : State management
 * - ui/          : UI rendering
 * - handlers/    : Event handlers
 * - app/         : Application initialization
 */

import { init } from "./app/init.js";

// Start the application
init();
