// Task
// Provide 3 unique implementations of the following function in JavaScript.
// **Input**: `n` - any integer
// *Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.
// **Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.

var sum_to_n_a = function (n) {
  // Implementation 1: Using the mathematical formula n * (n + 1) / 2
  return (n * (n + 1)) / 2;
};

var sum_to_n_b = function (n) {
  // Implementation 2: Using the reduce method, functional approach
  return new Array(n).fill(0).reduce((acc, _, index) => acc + index + 1);
};

var sum_to_n_c = function (n) {
  // Implementation 3: Using tail recursion
  if (n <= 0) return 0;
  return n + sum_to_n_c(n - 1);
};
