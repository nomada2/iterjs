import assert from 'assert';
import iter from '../src/iter';

describe('iter.setSymmetricDifference', function() {
    describe('first is strict superset of second', function () {
        it('should return first\'s values not in second', function () {
            const result = iter.setSymmetricDifference([1, 2, 3, 4, 5], [3, 4]);
            assert.deepEqual(result.toArray(), [1, 2, 5]);
        });
    });

    describe('first is strict subset of second', function () {
        it('should return second\'s values not in first', function () {
            const result = iter.setSymmetricDifference([1, 2], [1, 2, 3, 4]);
            assert.deepEqual(result.toArray(), [3, 4]);
        });
    });

    describe('first and second are equivalent', function () {
        it('is empty', function () {
            const result = iter.setSymmetricDifference([1, 2, 3], [1, 2, 3]);
            assert.deepEqual(result.toArray(), []);
        });
    });

    describe('interleaved but not overlapping', function () {
        it('contains all values', function () {
            const result = iter.setSymmetricDifference([2, 4, 6], [1, 3, 5]);
            assert.deepEqual(result.toArray(), [1, 2, 3, 4, 5, 6]);
        });
    });

    describe('first empty', function () {
        it('should return second\'s values', function () {
            const result = iter.setSymmetricDifference([], [7, 13]);
            assert.deepEqual(result.toArray(), [7, 13]);
        });
    });

    describe('second empty', function () {
        it('should return first\'s values', function () {
            const result = iter.setSymmetricDifference([1, 5], []);
            assert.deepEqual(result.toArray(), [1, 5]);
        });
    });

    describe('both empty', function () {
        it('is empty', function () {
            const result = iter.setSymmetricDifference([], []);
            assert.deepEqual(result.toArray(), []);
        });
    });

    describe('instance method', function () {
        it('should act just like the static method', function () {
            const it = iter([13, 15]).setSymmetricDifference([2, 9, 11, 13]);
            assert.deepEqual(it.toArray(), [2, 9, 11, 15]);
        });
    });

    describe('with callback', function () {
        it('callback gets values and indexes', function () {
            const seen = [];
            const result = iter.setSymmetricDifference([3, 6], [3, 5], (x, y, xi, yi) => { seen.push([x, y, xi, yi]); return 1; });
            assert.deepEqual(result.toArray(), [3, 5, 3, 6]);
            assert.deepEqual(seen, [[3, 3, 0, 0], [3, 5, 0, 1]]);
        });
    });
});