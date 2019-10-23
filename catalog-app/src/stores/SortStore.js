class SortStore {
    sortAfter = "-AlkoholPrKrone";
    activeButton = "Sorter etter"

    addSortAfter(value) {
        this.sortAfter = value;
    };

    addActiveButton(value) {
        this.activeButton = value
    };
}

export default SortStore;