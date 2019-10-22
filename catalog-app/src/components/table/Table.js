import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { observer, inject } from 'mobx-react';
import BootstrapTable from 'react-bootstrap-table-next';
import Dropdown from 'react-bootstrap/Dropdown';
import './Table.css'

const columns = [{
  dataField: 'Varenavn',
  text: 'Varenavn'
}, {
  dataField: 'Varetype',
  text: 'Varetype'
}, {
  dataField: 'Land',
  text: 'Land'
}, {
  dataField: 'Pris',
  text: 'Pris (i kr)'
}, {
  dataField: 'Alkohol',
  text: 'Alkohol per krone'
}
];

const expandRow = {
  renderer: row => (
      <div className="row">
        <div className="col-sm text-center">
          {/* Images are fetched from vinmonopolet's website */}
        <img
          src={"https://bilder.vinmonopolet.no/cache/250x250-0/"+ row.Varenummer + "-1.jpg"}
          alt="Item"
        />
        </div>
        {/* We want to always show this information for each item */}
        <div className="col-sm">
          <p>{ `Varenummer: ${row.Varenummer}` }</p>
          <p>{ `Varenavn: ${row.Varenavn}` }</p>
          <p>{ `Varetype: ${row.Varetype}` }</p>
          <p>{ `Land: ${row.Land}` }</p>
        </div>
        <div className="col-sm">
          <p>{ `Volum: ${row.Volum} liter` }</p>
          <p>{ `Alkoholprosent: ${row.Alkohol}%` }</p>
          <p>{ `Årgang: ${row.Argang}` }</p>
          <p>{ `Smak: ${row.Smak}` }</p>
        </div>
        <div className="col-sm">
          <p>{ `Pris: ${row.Pris} kr` }</p>
          <p>{ `Literpris: ${row.Literpris} kr` }</p>
          <p>{ `Emballasjetype: ${row.Emballasjetype} ` }</p>
          <p>{ `Produktutvalg: ${row.Produktutvalg} ` }</p>
        </div>
      </div>

  ),
  className: 'expandedRow',
  parentClassName: 'parentExpandedRow'
};

class Table extends Component {
  refreshQuery(keys="", packaging="", productSelection="", country="", yearMin="", yearMax="", priceMin="", priceMax="", skipping=0){
    const GET_PRODUCTQUERY = gql`
      {
        productQuery(Keys: "${keys}", Packaging: "${packaging}", ProductSelection: "${productSelection}", Country: "${country}", YearMin: "${yearMin}", YearMax: "${yearMax}", PriceMin: ${priceMin}, PriceMax: ${priceMax}, Skipping: ${skipping}) {
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
      }`
    return GET_PRODUCTQUERY
  };
  render() {
    console.log("searchBar: " + this.props.store.searchBarValue);
    console.log("packaging: " + this.props.store.packagingFilter);
    console.log("productSelection: " + this.props.store.productSelectionFilter);
    console.log("country: " + this.props.store.countryFilter);
    console.log("year: " + this.props.store.yearFilter);
    
    
    return(
      <div>
        <h1 style={{display: "inline-block"}}>Søkeresultat</h1>
        <Dropdown className="sort_dropdown"  alignRight>
          <Dropdown.Toggle className="sort_toggle" id="dropdown-basic" size="sm">
            Sorter etter
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item className="sorting_item active_sorting_item" href="#/action-1">Pris (lav til høy)</Dropdown.Item>
            <Dropdown.Item className="sorting_item "href="#/action-2">Pris (høy til lav)</Dropdown.Item>
            <Dropdown.Item className="sorting_item "href="#/action-3">Alkohol (lav til høy)</Dropdown.Item>
            <Dropdown.Item className="sorting_item "href="#/action-3">Alkohol (høy til lav)</Dropdown.Item>
            <Dropdown.Item className="sorting_item "href="#/action-3">Alkohol pr. krone (lav til høy)</Dropdown.Item>
            <Dropdown.Item className="sorting_item "href="#/action-3">Alkohol pr. krone (høy til lav)</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      
        <Query query={this.refreshQuery(this.props.store.searchBarValue, this.props.store.packagingFilter, this.props.store.productSelectionFilter, this.props.store.countryFilter, this.props.store.yearMinFilter, this.props.store.yearMaxFilter, this.props.store.priceMinFilter, this.props.store.priceMaxFilter, 0)}>
          {({ loading, error, data }) => {
            if (loading && !data) return (
              <div className="card">
                <BootstrapTable
                  id="table"
                  headerClasses="tableHeader"
                  keyField='Varenummer'
                  data={[]}
                  columns={ columns }
                  expandRow={ expandRow }
                  bootstrap4={true}
                  hover={true}
                  bordered={true}
                />
              </div>
            );
            if (error) return `Error! ${error.message}`;
            return (
              <div className="card">
                <BootstrapTable
                  id="table"
                  headerClasses="tableHeader"
                  keyField='Varenummer'
                  data={ data.productQuery }
                  columns={ columns }
                  expandRow={ expandRow }
                  bootstrap4={true}
                  hover={true}
                  bordered={true}
                />
              </div>
            );
          }}
        </Query>
      </div>
      )
    }
  }

export default inject('store')(observer(Table));