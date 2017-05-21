import Knapsack from './KnapsackUnbounded';

// Creates a tie breaker function that makes the following preferences
// 1. The fewest total bundles
// 2. The best value sum of the bundles (eg. cheapest)
// 3. Fall back to the first value
function decisionFactory(bundles) {
    // hydrates the bundle by looking up it's size and sums the prices together.
    const sum = combination => combination
        .reduce((memo, size) => memo + bundles.find(bundle => bundle.size === size).price, 0);

    return (a, b) => {
        // If the combinations have different lengths, choose the fewest bundles
        if (a.length < b.length) {
            return a;
        }
        if (b.length < a.length) {
            return b;
        }

        // If the lengths are the same, compare the total price,
        // choosing b if it's better value.
        if (sum(b) < sum(a)) {
            return b;
        }

        // fall back to a.
        return a;
    };
}


export default class BundlePacker {

    static choose(quantity, bundles) {
        // Map the bundles to an array of sizes that is suitable for Knapsack input.
        const items = bundles.map(({ size }) => size);

        // create a custom tie breaker function to give to the Knapsack
        const decision = decisionFactory(bundles);

        // If the result is less than the requested quantity, run a loop that increments
        // the value passed to Knapsack.solve until the quantity is met or exceeded.
        let result = null;
        let counter = 0;
        do {
            result = Knapsack.solve(quantity + counter, items, decision);
            counter += 1;
        }
        while (quantity > result.reduce((memo, value) => memo + value, 0));

        // Aggregate the Knapsack results into unique/distinct bundles with a quantity property.
        return result
            .reduce((memo, value) => {
                const match = memo.find(({ size }) => size === value);
                if (match) {
                    // If a match is found, increment the quantity.
                    // eslint-disable-next-line no-param-reassign
                    memo[memo.indexOf(match)].quantity += 1;
                }
                else {
                    // If no match is found, add the bundle to the aggregate.
                    const bundle = bundles.find(({ size }) => size === value);
                    memo.push({ ...bundle, quantity: 1 });
                }
                return memo;
            }, []);
    }
}
