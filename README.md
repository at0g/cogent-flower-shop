# @at0g/cogent-code-test

This package is a solution to the ["flower-shop" code test](./flower_shop.pdf) from [Cogent](https://cogent.co),
 written in JavaScript. The implementation uses a domain specific BundlePicker, that relies on an unbounded
 knapsack algorythm.


## Installation
`yarn` (or `npm install`)

## Scripts
- `npm test`: runs mocha.
- `npm run test:watch`: runs mocha in watch mode with the min reporter.

## The solution...

The "meat" of the solution is the `KnapsackUnbounded.solve()` method.
In a nutshell, `solve` works by doing the following steps:

1. Creating a map (an `Array`) of the best known combination (the `value`) for a given integar (key) to be
  referenced in step 2. When a `key` exists in the input values, it is added as the best combination.
  If not, otherwise step 2 is used to find the best combination.

2. An aggregation function is run that traverses the already solved combinations in reverse. For each combination
 the remainder is calculated and then the corresponding combination is looked up from the map in step 1. These
 2 combinations are concatenated together for the aggregator to compare them with the last combination and ultimately
 to pick the best values.

The "glue" to the solution is the `BundlePacker.choose()` method.
- Maps the flower data to simple values for the knapsack and vice-versa.
- Logic to invert the behavior of the knapsack, ensuring the requested quantity is either provided
 or exceeded by the minimum amount.

## Thoughts

I enjoyed this code test, the scope of the problem is concise and finding a solution was challenging.

The "grey areas" of the test are interesting...

- __4 tulips?__ I believe the Knapsack answer is 3, while the domain answer is 5
- __12 lillies?__ I believe 2 x 6 is the correct answer, as it is slightly less cost
- __16 tulips?__ For your consideration
