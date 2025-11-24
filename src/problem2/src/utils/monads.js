/**
 * Functional Monads
 * Result and Maybe monads for functional error handling
 */

/**
 * Result type for error handling (Functional pattern)
 */
export const Result = {
  Ok: (value) => ({ success: true, value }),
  Err: (error) => ({ success: false, error }),
  map: (fn) => (result) =>
    result.success ? Result.Ok(fn(result.value)) : result,
  flatMap: (fn) => (result) => result.success ? fn(result.value) : result,
  getOrElse: (defaultValue) => (result) =>
    result.success ? result.value : defaultValue,
};

/**
 * Maybe type for null handling
 */
export const Maybe = {
  Just: (value) => ({ hasValue: true, value }),
  Nothing: () => ({ hasValue: false }),
  map: (fn) => (maybe) =>
    maybe.hasValue ? Maybe.Just(fn(maybe.value)) : Maybe.Nothing(),
  getOrElse: (defaultValue) => (maybe) =>
    maybe.hasValue ? maybe.value : defaultValue,
};
