import RootStore from '../../stores/RootStore';

describe("SortStore", () => {
    it("Sort after AlkoholPrKrone", () => {
        const rootStore = new RootStore();
        const sortStore = rootStore.sortStore;
        // When sorted after AlkoholPrKrone
        sortStore.addSortAfter("AlkoholPrKrone");
        // The button should have prop value AlkoholPrKrone, which is later
        // used to display "Alkohol Pr Krone (lav til høy) for button"
        sortStore.addActiveButton("AlkoholPrKrone");
        // Should match
        expect(sortStore.sortAfter).toMatch("AlkoholPrKrone");
        expect(sortStore.activeButton).toMatch("AlkoholPrKrone");
    });
});
