import Knapsack from './KnapsackUnbounded';

export default class BundlePacker {

    static choose(quantity, bundles) {
        // Map the bundles to an array of sizes that is suitable for Knapsack input.
        const items = bundles.map(({ size }) => size);

        // If the result is less than the requested quantity, run a loop that increments
        // the value passed to Knapsack.solve until the quantity is met or exceeded.
        let result = null;
        let counter = 0;
        do {
            result = Knapsack.solve(quantity + counter, items);
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
                } else {
                    // If no match is found, add the bundle to the aggregate.
                    const bundle = bundles.find(({ size }) => size === value);
                    memo.push({ ...bundle, quantity: 1 });
                }
                return memo;
            }, []);
    }
}
