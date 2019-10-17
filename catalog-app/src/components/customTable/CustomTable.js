import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { decorate, action } from 'mobx';
import CatalogStore from '../../stores/CatalogStore';
import BootstrapTable from 'react-bootstrap-table-next';
import './CustomTable.css'

decorate(CatalogStore, {
  expandRow: action,
})

const catalogStore = new CatalogStore();

const GET_PRODUCTQUERY = gql`
  {
    productQuery(Keys:"", Year:"2019", Skipping:0) {
      Varenummer
      Varenavn
      Volum
      Pris
      Literpris
      Varetype
      Produktutvalg
      Fylde
      Friskhet
      Garvestoffer
      Bitterhet
      Sodme
      Smak
      Land
      Argang
      Rastoff
      Alkohol
      Emballasjetype
      Vareurl
    }
  }`;

const columns = [{
  dataField: 'Varenummer',
  text: 'Varenummer'
}, {
  dataField: 'Varenavn',
  text: 'Varenavn'
}, {
  dataField: 'Pris',
  text: 'Pris (i kr)'
}

]

const expandRow = {
  renderer: row => (
    <div>
      <img src='https://bilder.vinmonopolet.no/cache/250x250-0/-1.jpg' alt="bilde"/>
      <p>{ `Varenummer: ${row.Varenummer}` }</p>
      <p>{ `Volum (i liter): ${row.Volum}` }</p>
    </div>
  )
};

export default class CustomTable extends Component {

  render() {
    return (
      <Query query={GET_PRODUCTQUERY}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          return (
            <div className="container">
              <h3>
                LIST OF PRODUCTS
              </h3>
              <h4><Link to="/create">Add Product</Link></h4>
              <BootstrapTable
                id="table"
                headerClasses="tableHeader"
                keyField='Varenummer'
                data={ data.productQuery }
                columns={ columns }
                expandRow={ expandRow }
                bootstrap4={true}
                hover={true}

              />
            </div>
          );
        }}
      </Query>
    );
  }
}