# Problem 1: Sum to N

## Task Description

Provide 3 unique implementations of a function that calculates the summation from 1 to n.

**Input:** `n` - any integer  
**Output:** `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`

_Assumption: The input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`_

---

## Implementations

### Implementation A: Mathematical Formula

Uses the arithmetic series formula: **n × (n + 1) / 2**

```javascript
var sum_to_n_a = function (n) {
  return (n * (n + 1)) / 2;
};
```

**Complexity:**

- Time: O(1) - constant time
- Space: O(1) - no extra space needed

**Pros:** Most efficient approach, no loops or recursion needed  
**Cons:** Requires mathematical knowledge of the formula

---

### Implementation B: Functional Approach with Reduce

Uses array creation and the `reduce` method for a functional programming style.

```javascript
var sum_to_n_b = function (n) {
  return new Array(n).fill(0).reduce((acc, _, index) => acc + index + 1, 0);
};
```

**Complexity:**

- Time: O(n) - iterates through n elements
- Space: O(n) - creates an array of size n

**Pros:** Functional, declarative style  
**Cons:** Higher space complexity due to array creation

---

### Implementation C: Recursion

Uses simple linear recursion to break down the problem into smaller subproblems.

```javascript
var sum_to_n_c = function (n) {
  if (n <= 0) return 0;
  return n + sum_to_n_c(n - 1);
};
```

**How it works:**

1. **Base case:** if n ≤ 0, return 0 (stops the recursion)
2. **Recursive case:** return n + sum of all numbers from 1 to (n-1)

**Example trace for sum_to_n_c(5):**

```
→ 5 + sum_to_n_c(4)
→ 5 + (4 + sum_to_n_c(3))
→ 5 + (4 + (3 + sum_to_n_c(2)))
→ 5 + (4 + (3 + (2 + sum_to_n_c(1))))
→ 5 + (4 + (3 + (2 + (1 + sum_to_n_c(0)))))
→ 5 + (4 + (3 + (2 + (1 + 0))))     [base case reached]
→ 5 + (4 + (3 + (2 + 1)))           [unwinding starts]
→ 5 + (4 + (3 + 3))
→ 5 + (4 + 6)
→ 5 + 10
→ 15
```

**Complexity:**

- Time: O(n) - makes n recursive calls
- Space: O(n) - call stack depth of n

**Pros:** Elegant, demonstrates recursion concept  
**Cons:** Risk of stack overflow for large n, not tail-call optimized in JavaScript

---

## Comparison

| Implementation | Time | Space | Best Use Case                            |
| -------------- | ---- | ----- | ---------------------------------------- |
| A (Formula)    | O(1) | O(1)  | Production code, large values of n       |
| B (Reduce)     | O(n) | O(n)  | Functional programming style, moderate n |
| C (Recursion)  | O(n) | O(n)  | Educational purposes, small n            |

**Recommendation:** Use Implementation A (mathematical formula) for real-world applications due to its optimal performance.
