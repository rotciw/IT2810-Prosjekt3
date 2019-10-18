import React, { Component } from 'react';
import './App.css';
import { decorate, observable, action, computed } from 'mobx';
import { Provider } from 'mobx-react';
import Table from '../table/Table';
import CatalogStore from '../../stores/CatalogStore';
import FilterGroup from '../filter/FilterGroup'
import Header from '../header/Header'
import SearchBar from '../searchBar/SearchBar';
import SortTable from '../sortTable/SortTable';
import SortStore from '../../stores/SortStore';

decorate(CatalogStore, {
  searchBarValue: observable,
  addSearchBarValue: action,
})

decorate(SortStore, {
  sortElement: observable,
  addSortElement: action
})

class RootStore {
  constructor() {
    this.catalogStore = new CatalogStore(this);
    this.sortStore = new SortStore(this);
  }
}
const rootStore = new RootStore();

function App() {
  return (
    <Provider
      rootStore={rootStore}
      catalogStore={rootStore.catalogStore}
      sortStore={rootStore.sortStore}
    >
    <div className="container-fluid">
      <div className="row">
        <Header />
        <div className="col-md-4">
        <SearchBar/>
        <FilterGroup/>
        <SortTable />
        </div>
        <div className="col-md-8">
        <Table />
        </div>
      </div>
    </div>
    </Provider>
  );
}

export default App;