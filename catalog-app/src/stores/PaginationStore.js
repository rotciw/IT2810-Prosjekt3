class PaginationStore {
    paginationPage = 0;
    buttonIsDisabled = true;

    incrementPage() {
        if (this.paginationPage >= 0) {
            this.buttonIsDisabled = false;
        }
        this.paginationPage++;
    }

    decrementPage() {
        if (this.paginationPage <= 1) {
            this.buttonIsDisabled = true;
        }
        this.paginationPage--;
    }

    firstPage() {
        this.buttonIsDisabled = true;
        this.paginationPage = 0;
    }
}

export default PaginationStore;