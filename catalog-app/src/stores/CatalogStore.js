class CatalogStore {
    searchBarValue = "";
    countryFilter = "";
    packagingFilter = "";
    productSelectionFilter = "";
    yearFilter = "";

    addSearchBarValue(value) {
        this.searchBarValue = value;
    };
    get getSearchBarValue() {
        return this.searchBarValue;
    };
    addCountryFilter(value) {
        this.countryFilter = value;
    };
    get getCountryFilter() {
        return this.countryFilter;
    };
    addPackagingFilter(value) {
        this.packagingFilter = value;
    };
    get getPackagingFilter() {
        return this.packagingFilter;
    };
    addProductSelectionFilter(value) {
        this.productSelectionFilter = value;
    };
    get getProductSelectionFilter() {
        return this.productSelectionFilter;
    };
    addYearFilter(value) {
        this.yearFilter = value;
    };
    get getYearFilter() {
        return this.yearFilter;
    };
}

export default CatalogStore;