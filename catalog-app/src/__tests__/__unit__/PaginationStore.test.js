import RootStore from '../../stores/RootStore';

describe("PaginationStore", () => {
    it("Shouldn't be able to go to previous page from page one", () => {
        const rootStore = new RootStore();
        const paginationStore = rootStore.paginationStore;
        // Expect to be page 1 (zero indexed)
        expect(paginationStore.paginationPage).toEqual(0);
        expect(paginationStore.prevButtonDisabled).toBe(true);
        // Go to next page, and prev button shouldnt be disabled
        paginationStore.incrementPage();
        expect(paginationStore.paginationPage).toEqual(1);
        expect(paginationStore.prevButtonDisabled).toBe(false);
        // Go back, and should now not be able to go further back
        paginationStore.decrementPage();
        expect(paginationStore.paginationPage).toEqual(0);
        expect(paginationStore.prevButtonDisabled).toBe(true);
    });
});
