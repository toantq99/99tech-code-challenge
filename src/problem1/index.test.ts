import { describe, it, expect } from "vitest";
import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from "./index";

describe.each([
  { name: "sum_to_n_a (arithmetic formula)", fn: sum_to_n_a },
  { name: "sum_to_n_b (iterative for loop)", fn: sum_to_n_b },
  { name: "sum_to_n_c (recursion)", fn: sum_to_n_c },
])("$name", ({ fn }) => {
  it.each([
    { input: 0, expected: 0 },
    { input: 1, expected: 1 },
    { input: 5, expected: 15 },
    { input: 10, expected: 55 },
    { input: 100, expected: 5050 },
    { input: 1000, expected: 500500 },
    { input: -5, expected: 0 },
    { input: -10, expected: 0 },
  ])("should return $expected for n = $input", ({ input, expected }) => {
    expect(fn(input)).toBe(expected);
  });
});
