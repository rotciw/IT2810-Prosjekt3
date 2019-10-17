import React, { Component } from 'react';
import './App.css';
import { decorate, observable, action, computed } from 'mobx';
import Table from '../table/Table';
import Viewing from '../Viewing';
import CatalogStore from '../../stores/CatalogStore';

decorate(CatalogStore, {
  catalogList: observable,
  addItem: action,
  expandRow: action,
  catalogCount: computed
})

const catalogStore = new CatalogStore();

function App() {
  return (
    <div>
    <Table store={catalogStore}/>
    <Viewing store={catalogStore}/>
    </div>
  );
}

export default App;