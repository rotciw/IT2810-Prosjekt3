import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { decorate, action } from 'mobx';
import CatalogStore from '../../stores/CatalogStore';
import BootstrapTable from 'react-bootstrap-table-next';
import './CustomTable.css'

decorate(CatalogStore, {
  expandRow: action,
})

const columns = [{
  dataField: 'Varenummer',
  text: 'Varenummer'
}, {
  dataField: 'Varenavn',
  text: 'Varenavn'
}, {
  dataField: 'Pris',
  text: 'Pris (i kr)'
}]

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
            <div className="container">
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