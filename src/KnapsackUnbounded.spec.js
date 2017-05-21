import { expect } from 'chai';
import sinon from 'sinon';
import Knapsack from './KnapsackUnbounded';

describe('KnapsackUnbounded', () => {
    describe('solve', () => {
        const solve = Knapsack.solve;

        it('has a static solve method', () => {
            expect(solve).to.be.a('function');
        });

        it('throws a TypeError if items is not provided', () => {
            expect(() => solve(42)).to.throw(TypeError);
        });

        it('throws a RangeError if items does not have a positive length', () => {
            expect(() => solve(42, [])).to.throw(RangeError);
        });

        it('throws a TypeError if capacity is not a positive integer', () => {
            [-1, 0, 1.2, 'foo', Infinity, () => null, null, undefined]
                .forEach(invalidInput =>
                    expect(() => solve(invalidInput, [1])).to.throw(TypeError),
                );
        });

        it('returns a single value that exists in items', () => {
            expect(solve(42, [42])).to.eql([42]);
        });

        it('returns a single value that best fits within the capacity', () => {
            expect(solve(5, [4])).to.eql([4]);
        });

        it('returns an empty array if all items are greater than the capacity', () => {
            expect(solve(1, [2])).to.eql([]);
        });

        it('returns multiples of a single value to fill the capacity', () => {
            expect(solve(2, [1])).to.eql([1, 1]);
        });

        it('returns multiples of a single value to best fill the capacity', () => {
            expect(solve(5, [2])).to.eql([2, 2]);
        });

        it('should call the tiebreaker function when multiple combinations are possible', () => {
            const spy = sinon.spy();
            solve(6, [2, 3], spy);
            // eslint-disable-next-line no-unused-expressions
            expect(spy).to.have.been.calledOnce;
            expect(spy.getCall(0).args).to.eql([
                [2, 2, 2],
                [3, 3],
            ]);
        });

        it('returns multiples of multiple values to fill the capacity', () => {
            expect(solve(10, [2, 3])).to.eql([3, 3, 2, 2]);
        });

        it('returns multiples of multiple values to best fill the capacity', () => {
            expect(solve(14, [3, 4])).to.eql([4, 4, 3, 3]);
        });

        it('returns the same results regardless of the order of values', () => {
            const expected = [4, 4, 2];
            [
                [1, 2, 3, 4],
                [2, 1, 3, 4],
                [2, 3, 4, 1],
                [2, 4, 1, 3],
                [3, 4, 1, 2],
                [3, 1, 2, 4],
                [3, 1, 4, 2],
                [4, 1, 2, 3],
                [4, 2, 3, 1],
                [4, 3, 1, 2],
            ].forEach(values => expect(solve(10, values)).to.eql(expected));
        });
    });
});
