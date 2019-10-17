class CatalogStore {
    open = false
    catalogList = ["En","to"
    ];

    addItem(item) {
        this.catalogList.push(item)
    };
    get catalogCount() {
        return this.catalogList.length
    }

    expandRow() {
        this.open = true;
    }
}

export default CatalogStore;