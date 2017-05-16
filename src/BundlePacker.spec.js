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
    });
});
