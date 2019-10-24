import React from 'react';
import './App.css';
import { Provider } from 'mobx-react';
import Table from '../table/Table';
import FilterGroup from '../filterGroup/FilterGroup';
import Header from '../header/Header';
import ModalContainer from '../modalContainer/ModalContainer';
import SearchBar from '../searchBar/SearchBar';
import Pagination from '../pagination/Pagination';
import SortDropdown from '../sortDropdown/SortDropdown';
import RootStore from '../../stores/RootStore';

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
