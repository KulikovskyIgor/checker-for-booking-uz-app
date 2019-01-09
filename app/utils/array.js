import { find, intersectionBy, differenceBy } from "lodash";

export const setDiff = (list = [], listCompare = [], compareId, compareBy) => {
    const diffList = intersectionBy(list, listCompare, compareId)
        .map(i => {
            const j = find(listCompare, [compareId, i[compareId]]);
            const diff = j[compareBy] - i[compareBy];

            return diff ? { ...i, diff } : i;
        });
    const addedList = differenceBy(listCompare, list, compareId)
        .map(i => ({ ...i, added: true }));
    const deletedList = differenceBy(list, listCompare, compareId)
        .map(i => ({ ...i, deleted: true }));

    return [...diffList, ...addedList, ...deletedList];
};