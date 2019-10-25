import RootStore from '../../stores/RootStore';

describe("FilterStore", () => {
    it("Test if search value is correct", () => {
        const rootStore = new RootStore();
        const filterStore = rootStore.filterStore;
        // Button values
        filterStore.addCountryFilter("Norge");
        filterStore.addPackagingFilter("Glass");
        filterStore.addProductSelectionFilter("Basisutvalget");
        // Slider values
        filterStore.addYearMaxFilter("2019");
        filterStore.addYearMinFilter("2010");
        filterStore.addPriceMinFilter(2);
        filterStore.addPriceMaxFilter(300);
        // Should match strings
        expect(filterStore.countryFilter).toMatch("Norge");
        expect(filterStore.packagingFilter).toMatch("Glass");
        expect(filterStore.productSelectionFilter).toMatch("Basisutvalget");
        expect(filterStore.yearMaxFilter).toMatch("2019");
        expect(filterStore.yearMinFilter).toMatch("2010");
        // Should be integers
        expect(filterStore.priceMinFilter).toEqual(2);
        expect(filterStore.priceMaxFilter).toEqual(300);
    });
});
