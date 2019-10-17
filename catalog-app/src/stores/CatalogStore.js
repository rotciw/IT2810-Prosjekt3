class CatalogStore {
    catalogList = ["En","to"
    ];

    addItem(item) {
        this.catalogList.push(item)
    };
    get catalogCount() {
        return this.catalogList.length
    }
}

export default CatalogStore;