class CatalogStore {
    searchBarValue = "";
    countryFilter = "";
    packagingFilter = "";
    productSelectionFilter = "";
    yearMinFilter = "2000";
    yearMaxFilter = "2004";

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
    addYearMinFilter(value) {
        this.yearMinFilter = value;
    };
    get getYearMinFilter() {
        return this.yearMinFilter;
    };
    addYearMaxFilter(value) {
        this.yearMaxFilter = value;
    };
    get getYearMaxFilter() {
        return this.yearMaxFilter;
    };
    
}

export default CatalogStore;