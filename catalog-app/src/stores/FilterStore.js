class FilterStore {
    countryFilter = "";
    packagingFilter = "";
    productSelectionFilter = "";
    yearMinFilter = 1930;
    yearMaxFilter = 2019;
    priceMinFilter = 1;
    priceMaxFilter = 50000;

    addCountryFilter(value) {
        this.countryFilter = value;
    };
    addPackagingFilter(value) {
        this.packagingFilter = value;
    };
    addProductSelectionFilter(value) {
        this.productSelectionFilter = value;
    };
    addYearMinFilter(value) {
        this.yearMinFilter = value;
    };
    addYearMaxFilter(value) {
        this.yearMaxFilter = value;
    };
    addPriceMinFilter(value) {
        this.priceMinFilter = value;
    };
    addPriceMaxFilter(value) {
        this.priceMaxFilter = value;
    };
}

export default FilterStore;