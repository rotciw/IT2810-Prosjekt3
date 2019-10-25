import RootStore from '../../stores/RootStore';

let rootStore, paginationStore;

beforeEach(() => {
    rootStore = new RootStore();
    paginationStore = rootStore.paginationStore;
});

describe("<PaginationStore />", () => {
    it("Shouldn't be able to go to previous page from page one", () => {
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
    it('Test empty table functions', () => {
        // Zero indexed
        expect(paginationStore.paginationPage).toEqual(0);
        expect(paginationStore.prevButtonDisabled).toBe(true);
        expect(paginationStore.nextButtonDisabled).toEqual(false);
        expect(paginationStore.tableIsEmpty).toEqual(false);
        paginationStore.tableEmpty();
        expect(paginationStore.nextButtonDisabled).toEqual(true);
        expect(paginationStore.tableIsEmpty).toEqual(true);
        paginationStore.tableNotEmpty();
        expect(paginationStore.nextButtonDisabled).toEqual(false);
        expect(paginationStore.tableIsEmpty).toEqual(false);
    });
    it('Should return to first page when function called', () => {
        // Zero indexed
        expect(paginationStore.paginationPage).toEqual(0);
        expect(paginationStore.prevButtonDisabled).toBe(true);
        paginationStore.incrementPage();
        paginationStore.incrementPage();
        paginationStore.incrementPage();
        expect(paginationStore.paginationPage).toEqual(3);
        expect(paginationStore.prevButtonDisabled).toBe(false);
        paginationStore.firstPage();
        expect(paginationStore.paginationPage).toEqual(0);
        expect(paginationStore.prevButtonDisabled).toBe(true);
    });
});
