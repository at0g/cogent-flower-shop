import { expect } from 'chai';
import BundlePacker from './BundlePacker';
import flowers from './flowers.json';

const { roses, lillies, tulips } = flowers;

describe('BundlePacker', () => {
    describe('choose()', () => {
        it('returns a bundle of 10 roses', () => {
            const bundles = roses.bundles;
            const bundle = bundles[1];
            expect(BundlePacker.choose(10, bundles))
                .to.eql([{ quantity: 1, ...bundle }]);
        });

        it('returns 15 lillies (1 x 9, 1 x 6)', () => {
            const bundles = lillies.bundles;
            expect(BundlePacker.choose(15, bundles))
                .to.eql([
                    { quantity: 1, ...bundles[2] },
                    { quantity: 1, ...bundles[1] },
                ]);
        });

        it('returns 13 tulips (2 x 5, 1 x 3)', () => {
            const bundles = tulips.bundles;
            expect(BundlePacker.choose(13, bundles))
                .to.eql([
                    { quantity: 2, ...bundles[1] },
                    { quantity: 1, ...bundles[0] },
                ]);
        });

        // This logic is debatable...
        // In the knapsack problem, the capacity can never be exceeded.
        // However in the case of making a shopping order (such as 4 roses), is it
        // better to receive 3 roses or 5 roses?
        // In my opinion, I think 5 would be better for both consumer and supplier.
        it('returns 5 tulips when 4 have been requested', () => {
            const bundles = tulips.bundles;
            expect(BundlePacker.choose(4, bundles))
                .to.eql([{ quantity: 1, ...bundles[1] }]);
        });
    });
});
