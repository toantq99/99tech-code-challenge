/**
 * Calculates the sum of all integers from 1 to n using the arithmetic formula.
 * Time complexity: O(1)
 *
 * @param {number} n - Any integer
 * @returns {number} The summation from 1 to n
 */
const sum_to_n_a = (n: number): number => {
  if (n < 1) return 0;
  return (n * (n + 1)) / 2;
};

/**
 * Calculates the sum of all integers from 1 to n using an iterative approach.
 * Time complexity: O(n)
 *
 * @param {number} n - Any integer
 * @returns {number} The summation from 1 to n
 */
const sum_to_n_b = (n: number): number => {
  if (n < 1) return 0;

  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

/**
 * Calculates the sum of all integers from 1 to n using recursion.
 * Time complexity: O(n)
 *
 * @param {number} n - Any integer
 * @returns {number} The summation from 1 to n
 */
const sum_to_n_c = (n: number): number => {
  if (n < 1) return 0;
  return n + sum_to_n_c(n - 1);
};

export { sum_to_n_a, sum_to_n_b, sum_to_n_c };
