class CatalogStore {
    searchBarValue = "";

    addSearchBarValue(value) {
        this.searchBarValue = value;
    };

    get getSearchBarValue() {
        return this.searchBarValue;
    }

}

export default CatalogStore;