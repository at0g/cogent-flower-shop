
function sum(arr) {
    return arr.reduce((memo, v) => memo + v, 0);
}

function sortBySizeDescending(a, b) {
    if (a > b) {
        return -1;
    }
    if (a < b) {
        return 1;
    }
    return 0;
}

// When the sums of two combinations of values are equal, this method will be called to decide
// which combination to use.
function defaultTieBreaker(a, b) {
    if (b.length < a.length) {
        return b;
    }
    return a;
}

function removeZeros(value) {
    return value > 0;
}

function isPositiveInt(input) {
    return !(typeof input !== 'number' || input < 1 || input === Infinity || Math.round(input) !== input);
}

export default class KnapsackUnbounded {

    static solve(capacity, items, tieBreaker = defaultTieBreaker) {
        if (!isPositiveInt(capacity)) {
            throw new TypeError('A non-negative integer must be provided as the first argument.');
        }
        if (!items || !Array.isArray(items) || items.filter(item => !isPositiveInt(item)).length) {
            throw new TypeError('An array of integers must be provided as the second argument.');
        }
        if (!items.length) {
            throw new RangeError('At least one item must be provided.');
        }

        // Create an array to store the best combinations of values.
        // Each value is an array of the "best fit" of numbers to fill that given key
        const combinations = [];

        // Get min/max values to avoid recalculating them during the loop
        const min = items.reduce((memo, value) =>
            Math.min(memo, value), Infinity);
        const max = items.reduce((memo, value) =>
            Math.max(memo, value), 0);

        for (let i = 0; i <= capacity; i += 1) {
            if (i < min) {
                combinations.push([0]);
            }
            else if (i <= max && items.includes(i)) {
                combinations.push([i]);
            }
            else {
                // if the value of this iteration does not exist in the items array, move backwards
                // through the solved combinations and reduce the results to the best fit.
                const combination = combinations.reduceRight((memo, values, j) => {
                    const remainder = i - j;
                    // combine the values of the previous combination with the values of the
                    // remainder to create the best combination for this iteration.
                    const bestValues = values.concat(combinations[remainder])
                        .filter(removeZeros)
                        .sort(sortBySizeDescending);

                    // create aggregates to compare the memo with the values of this sum.
                    const bestValuesSum = sum(bestValues);
                    const memoSum = sum(memo);

                    // Decision time...

                    if (bestValuesSum > memoSum) {
                        return bestValues;
                    }
                    if (bestValuesSum === memoSum) {
                        if (bestValues.toString() === memo.toString()) {
                            return memo;
                        }
                        // If the values are equal and distinct,
                        // call the tieBreaker function to decide which to keep.
                        else if (tieBreaker(memo, bestValues) === bestValues) {
                            return bestValues;
                        }
                    }
                    return memo;
                }, combinations[combinations.length - 1]);

                combinations.push(combination);
            }
        }

        return combinations[capacity]
            .filter(removeZeros)
            .sort(sortBySizeDescending);
    }
}
