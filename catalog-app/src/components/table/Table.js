import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { observer, inject } from 'mobx-react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
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
  constructor(props){ 
    super(props);
    this.state = {
      page: 1,
      sizePerPage: 10,
    }
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSizePerPageChange = this.handleSizePerPageChange.bind(this);
  }

  refreshQuery(keys="", packaging="", productSelection="", country="", yearMin="", yearMax="", priceMin="", priceMax="", skipping=0, sortAfter=""){
    const GET_PRODUCTQUERY = gql`
      {
        productQuery(Keys: "${keys}", Packaging: "${packaging}", ProductSelection: "${productSelection}", Country: "${country}", YearMin: "${yearMin}", YearMax: "${yearMax}", PriceMin: ${priceMin}, PriceMax: ${priceMax}, Skipping: ${skipping}, SortAfter: "${sortAfter}") {
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
  handlePageChange(page, sizePerPage){
    console.log("page change");
    this.fetchData(page, sizePerPage)
    
  }
  handleSizePerPageChange(sizePerPage){
    console.log("size per page");
    
  }
  fetchData(page = this.state.page, sizePerPage = this.state.sizePerPage){

  }

  render() {
    return(
      <div className="tableContainer">
        <Query query={
          this.refreshQuery(
            this.props.searchBarStore.searchBarValue,
            this.props.filterStore.packagingFilter,
            this.props.filterStore.productSelectionFilter,
            this.props.filterStore.countryFilter,
            this.props.filterStore.yearMinFilter,
            this.props.filterStore.yearMaxFilter,
            this.props.filterStore.priceMinFilter,
            this.props.filterStore.priceMaxFilter,
            0,
            this.props.sortStore.sortAfter)}
          >
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

            const options = {
              onPageChange: this.handlePageChange,
              onSizePerPageList: this.handleSizePerPageChange,
              page: this.state.page,
              sizePerPage: this.state.sizePerPage,
            };


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
                  pagination={ paginationFactory(options)}
                />
              </div>
            );
          }}
        </Query>
      </div>
      )
    }
  }

export default inject('sortStore', 'filterStore', 'searchBarStore')(observer(Table));