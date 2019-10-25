import RootStore from '../../stores/RootStore';

describe("SearchBar", () => {
    it("Test if search value is correct", () => {
        const rootStore = new RootStore();
        const searchBarStore = rootStore.searchBarStore;
        expect(searchBarStore.searchBarValue).toMatch("");
        searchBarStore.addSearchBarValue("Hvitvin");
        // Should match
        expect(searchBarStore.searchBarValue).toMatch("Hvitvin");
    });
});
