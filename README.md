# @at0g/cogent-flower-shop

This package is a solution to the ["flower-shop" code test](./flower_shop.pdf) from [Cogent](https://cogent.co).
 The implementation is written in JavaScript and uses a brute-force unbounded knapsack algorythm.


## Installation

`yarn` (or `npm install`)


## Scripts

- `npm test`: runs mocha and istanbul.
- `npm run test:watch`: runs mocha in watch mode with the min reporter.
- `npm run lint`: runs eslint.
- `npm run coverage`: runs tests and generates a code coverage html report.


## The solution...

The "meat" of the solution is the `KnapsackUnbounded.solve()` method.
In a nutshell, `solve` works by doing the following steps:

1. Creating a map (an `Array`) of the best known combination (the `value`) for a given integer (the `key`) to
 be referenced in step 2. When a `key` exists in the input values, it is added as the best combination.
 Otherwise step 2 is used to find the best combination.

2. An aggregation function is run that traverses the already solved combinations in reverse. For each combination
 the remainder is calculated and then the corresponding combination is looked up from the map in step 1. These
 2 combinations are joined together for the aggregator to compare them with the previous result before
 picking the best set of values.

The "glue" to the solution is the `BundlePacker.choose()` method.
- Maps the flower data to simple values for the knapsack and vice-versa.
- Logic to invert the behavior of the knapsack, ensuring the requested quantity is either provided
 or exceeded by the minimum amount.
- The code is not optimised - it's quite likely some loops run more times than necessary.


## Shortcomings with this solution

- Performance deteriorates with larger inputs such as larger capacities, larger ranges between items, more items etc.
- As the knapsack implementation uses a simple integer for each item, it does not support duplicate values such as
 5 x roses + 5 x tulips.


## Final thoughts

The "grey areas" of the test are interesting...

- __4 tulips?__ I believe the Knapsack answer is 3, while the domain answer is 5
- __12 lillies?__ I believe 2 x 6 is the correct answer, as it is better value to the consumer
- __16 tulips?__ This combination forces the algorythm to look at a better combination of smaller numbers

I enjoyed this code test, the scope of the problem is concise and finding a solution was challenging.
