import React from 'react';
import './App.css';
import { decorate, observable, action } from 'mobx';
import Table from '../table/Table';
import FilterStore from '../../stores/FilterStore';
import SearchBarStore from '../../stores/SearchBarStore';
import SortStore from '../../stores/SortStore';
import FilterGroup from '../filterGroup/FilterGroup'
import Header from '../header/Header'
import ModalContainer from '../modalContainer/ModalContainer'
import SearchBar from '../searchBar/SearchBar';
import { Provider } from 'mobx-react';
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
  addSortAfter: action,
})
decorate(SearchBarStore, {
  searchBarValue: observable,
  addSearchBarValue: action,
})

class RootStore {
  constructor(){
    this.filterStore = new FilterStore();
    this.sortStore = new SortStore();
    this.searchBarStore = new SearchBarStore();
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
    >
    <div className="container-fluid">
      <div className="row">
        <Header />
        <div className="col-md-4">
        <SearchBar/>
        <SortDropdown/>
        <FilterGroup/>
        <ModalContainer />
        </div>
        <div className="col-md-8">
        <Table/>
        </div>
      </div>
    </div>
    </Provider>
  );
}

export default App;
