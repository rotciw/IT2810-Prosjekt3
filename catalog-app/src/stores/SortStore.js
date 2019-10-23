class SortStore {
    sortAfter = "Pris";

    addSortAfter(value) {
        this.sortAfter = value;
    };
    get getSortAfter() {
        return this.sortAfter;
    };
    
}

export default SortStore;