import React, { Component } from 'react';
import './App.css';
import { decorate, observable, action, computed } from 'mobx';
import CustomTable from '../customTable/CustomTable';
import Viewing from '../Viewing';
import CatalogStore from '../../stores/CatalogStore';

decorate(CatalogStore, {
  catalogList: observable,
  addItem: action,
  catalogCount: computed
})

const catalogStore = new CatalogStore();

function App() {
  return (
    <div>
    <CustomTable store={catalogStore}/>
    <Viewing store={catalogStore}/>
    </div>
  );
}

export default App;