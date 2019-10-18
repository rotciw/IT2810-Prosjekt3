class CatalogStore {
    yearlist = [];

    addYear(year) {
        this.catalogList.push(year)
    };
    get catalogCount() {
        return this.yearlist.length
    }

}

export default CatalogStore;