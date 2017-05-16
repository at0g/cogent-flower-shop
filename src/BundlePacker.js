import Knapsack from './KnapsackUnbounded';

export default class BundlePacker {

    static choose(quantity, bundles) {
        // Map the bundles to an array of sizes that is suitable for Knapsack input.
        const items = bundles.map(({ size }) => size);

        // Aggregate the Knapsack results into unique/distinct bundles with a quantity property.
        return Knapsack.solve(quantity, items)
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
