import React, { Component } from 'react';
import './App.css';
import { decorate, observable, action, computed } from 'mobx';
import Table from '../table/Table';
import Viewing from '../Viewing';
import CatalogStore from '../../stores/CatalogStore';
import FilterGroup from '../filter/FilterGroup'

decorate(CatalogStore, {

})

const catalogStore = new CatalogStore();

function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <h1 className="col-sm-12 justify-content-center header">
        <div class="textAnimation">
          <b>
            <div class="innerTextAnimation">
              Student<br />
              Vinmono<br />
              Hvaerdette<br />
              Polet
              </div>
              </b>
          <p>polet</p>
          </div>
        </h1>
        <div className="col-sm-3">
        <FilterGroup store={catalogStore}/>
        </div>
        <div className="col-sm-9">
        <Table store={catalogStore}/>
        </div>
        <Viewing store={catalogStore}/>
      </div>
    </div>
  );
}

export default App;