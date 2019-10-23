import React from 'react';
import './App.css';
import { decorate, observable, action } from 'mobx';
import { Provider } from 'mobx-react';
import Table from '../table/Table';
import FilterStore from '../../stores/FilterStore';
import SearchBarStore from '../../stores/SearchBarStore';
import SortStore from '../../stores/SortStore';
import PaginationStore from '../../stores/PaginationStore';
import FilterGroup from '../filterGroup/FilterGroup';
import Header from '../header/Header';
import ModalContainer from '../modalContainer/ModalContainer';
import SearchBar from '../searchBar/SearchBar';
import Pagination from '../pagination/Pagination';
import SortDropdown from '../sortDropdown/SortDropdown';

decorate(FilterStore, {
  countryFilter: observable,
  packagingFilter: observable,
  productSelectionFilter: observable,
  yearMinFilter: observable,
  yearMaxFilter: observable,
  priceMinFilter: observable,
  priceMaxFilter: observable,
  addCountryFilter: action,
  addPackagingFilter: action,
  addProductSelectionFilter: action,
  addYearMinFilter: action,
  addYearMaxFilter: action,
  addPriceMinFilter: action,
  addPriceMaxFilter: action,
})
decorate(SortStore, {
  sortAfter: observable,
  activeButton: observable,
  addSortAfter: action,
  addActiveButton: action
})
decorate(SearchBarStore, {
  searchBarValue: observable,
  addSearchBarValue: action,
})
decorate(PaginationStore, {
  paginationPage: observable,
  buttonIsDisabled: observable,
  incrementPage: action,
  decrementPage: action,
  firstPage: action
})

class RootStore {
  constructor(){
    this.filterStore = new FilterStore();
    this.sortStore = new SortStore();
    this.searchBarStore = new SearchBarStore();
    this.paginationStore = new PaginationStore();
  }
}
const rootStore = new RootStore();

function App() {
  return (
    <Provider
      rootStore = {rootStore}
      filterStore = {rootStore.filterStore}
      sortStore = {rootStore.sortStore}
      searchBarStore = {rootStore.searchBarStore}
      paginationStore = {rootStore.paginationStore}
    >
    <div className="container-fluid">
      <div className="row">
        <Header />
        <div className="col-md-4">
        <SearchBar/>
        <FilterGroup/>
        <SortDropdown/>
        <ModalContainer />
        </div>
        <div className="col-md-8">
          <Pagination />
          <Table/>
          <Pagination />
        </div>
      </div>
    </div>
    </Provider>
  );
}

export default App;
