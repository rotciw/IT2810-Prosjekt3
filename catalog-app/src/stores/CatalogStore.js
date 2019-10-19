class CatalogStore {
    searchBarValue = "";
    countryFilter = "";
    packagingFilter = "";
    productSelectionFilter = "";

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
}

export default CatalogStore;