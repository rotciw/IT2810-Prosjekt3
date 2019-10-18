import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { decorate, action } from 'mobx';
import CatalogStore from '../../stores/CatalogStore';
import BootstrapTable from 'react-bootstrap-table-next';
import './Table.css'

decorate(CatalogStore, {
  expandRow: action,
})

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
      <div class="row">
        <div class="col-sm text-center">
          {/* Images are fetched from vinmonopolet's website */}
        <img
          src={"https://bilder.vinmonopolet.no/cache/250x250-0/"+ row.Varenummer + "-1.jpg"}
          alt="Item"
        />
        </div>
        {/* We want to always show this information for each item */}
        <div class="col-sm">
          <p>{ `Varenummer: ${row.Varenummer}` }</p>
          <p>{ `Varenavn: ${row.Varenavn}` }</p>
          <p>{ `Varetype: ${row.Varetype}` }</p>
          <p>{ `Land: ${row.Land}` }</p>
        </div>
        <div class="col-sm">
          <p>{ `Volum: ${row.Volum} liter` }</p>
          <p>{ `Alkoholprosent: ${row.Alkohol}%` }</p>
          <p>{ `Årgang: ${row.Argang}` }</p>
          <p>{ `Smak: ${row.Smak}` }</p>
        </div>
        <div class="col-sm">
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

export default class CustomTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchBarValue: "",
      submittedSearchBarValue: "vin"
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  refreshQuery(keys="", packaging="", productSelection="", year="", skipping=0){
    const GET_PRODUCTQUERY = gql`
      {
        productQuery(Keys: "${keys}", Packaging: "${packaging}", ProductSelection: "${productSelection}", Year: "${year}", Skipping: ${skipping}) {
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
    
    return(
      <Query query={GET_PRODUCTQUERY}>
        {({ loading, error, data }) => {
          if (loading) return "Loading..";
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
    )
  }
  handleChange(event){
    //console.log(this.state.searchBarValue);
    this.setState({
      searchBarValue: event.target.value,
    })
  }
  handleSubmit(event){
    event.preventDefault();
    let value = this.state.searchBarValue;
    this.setState({
      submittedSearchBarValue: value,
    })
    //console.log(this.state.submittedSearchBarValue2);
    

  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.searchBarValue} onChange={this.handleChange}></input>
          <input type="submit" value="søk"></input>
          {console.log(this.state.submittedSearchBarValue)}
          {this.refreshQuery(this.state.submittedSearchBarValue)}
        </form>
      </div>
    );
  }
}