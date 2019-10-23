class PageStore {
    pageNumber = "";

    addPageNumber(value) {
        this.pageNumber = value;
    };
    get getPageNumber() {
        return this.pageNumber;
    };
    
}

export default SearchBarStore;