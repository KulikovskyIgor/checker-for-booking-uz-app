import { expect } from 'chai';

import { setDiff } from "../../../app/utils/array";

describe('setDiff', () => {
    const compareId = "id";
    const comapreBy = "count";

    it('should return a list without any diff if lists are equal', () => {
        const list = [{ id: "q", count: 1 }, { id: "w", count: 2 }];
        const listCompare = [{ id: "q", count: 1 }, { id: "w", count: 2 }];

        expect(setDiff(list, listCompare, compareId, comapreBy)).to.eql(list);
    });

    it('should return a list with diff if lists are not equal by count (positive)', () => {
        const list = [{ id: "q", count: 1 }, { id: "w", count: 2 }];
        const listCompare = [{ id: "q", count: 1 }, { id: "w", count: 3 }];
        const expected = [{ id: "q", count: 1 }, { id: "w", count: 2, diff: 1 }];

        expect(setDiff(list, listCompare, compareId, comapreBy)).to.eql(expected);
    });

    it('should return a list with diff if lists are not equal by count (negative)', () => {
        const list = [{ id: "q", count: 1 }, { id: "w", count: 2 }];
        const listCompare = [{ id: "q", count: 1 }, { id: "w", count: 1 }];
        const expected = [{ id: "q", count: 1 }, { id: "w", count: 2, diff: -1 }];

        expect(setDiff(list, listCompare, compareId, comapreBy)).to.eql(expected);
    });

    it('should return a list with deleted item', () => {
        const list = [{ id: "q", count: 1 }, { id: "w", count: 2 }];
        const listCompare = [{ id: "q", count: 1 }];
        const expected = [{ id: "q", count: 1 }, { id: "w", count: 2, deleted: true }];

        expect(setDiff(list, listCompare, compareId, comapreBy)).to.eql(expected);
    });

    it('should return a list with added item', () => {
        const list = [{ id: "q", count: 1 }];
        const listCompare = [{ id: "q", count: 1 }, { id: "w", count: 2 }];
        const expected = [{ id: "q", count: 1 }, { id: "w", count: 2, added: true }];

        expect(setDiff(list, listCompare, compareId, comapreBy)).to.eql(expected);
    });
});