class CatalogStore {
    searchBarValue = "";
    countryFilter = "";

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

    

}

export default CatalogStore;