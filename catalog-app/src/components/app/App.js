import React, { Component } from 'react';
import './App.css';
import { decorate, observable, action, computed } from 'mobx';
import Table from '../table/Table';
import Viewing from '../Viewing';
import CatalogStore from '../../stores/CatalogStore';
import FilterGroup from '../filter/FilterGroup'
import Header from '../header/Header'
import Wordcloud from '../wordcloud/Wordcloud'

decorate(CatalogStore, {

})

const catalogStore = new CatalogStore();

function App() {
  return (
    <div className="container-fluid">
    <Wordcloud />
      <div className="row">
        <Header />
        <div className="col-sm-4">
        <FilterGroup store={catalogStore}/>
        </div>
        <div className="col-sm-8">
        <Table store={catalogStore}/>
        </div>
        <Viewing store={catalogStore}/>
      </div>
    </div>
  );
}

export default App;
