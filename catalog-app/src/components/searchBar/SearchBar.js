import React, { Component } from 'react';
import "./SearchBar.css";
import gql from 'graphql-tag';
import { Mutation } from '@apollo/react-components';
import { inject, observer } from 'mobx-react';

const ADD_SEARCH = gql`
mutation AddSearch($Searched: String!) {
  addPopularSearch(Searched:$Searched, Times:1){
    Searched,
    Times
  }
}`

class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchBarValue: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

    handleChange(event){
      this.setState({
        searchBarValue: event.target.value
      })
    }

    handleSubmit(event){
      event.preventDefault();
      let value = this.state.searchBarValue.toLowerCase();
      this.props.searchBarStore.addSearchBarValue(value)

      //Reset pagination
      this.props.paginationStore.firstPage()
    }

    render() {
      let input;
      //const [addPopularSearch, { data }] = useMutation(ADD_SEARCH);

      return (
        <Mutation mutation={ADD_SEARCH}>
           {(addPopularSearch, { data }) => (
            <form onSubmit={ e => {
              e.preventDefault();
              this.handleSubmit(e);
              addPopularSearch({variables: {Searched: input.value}});
              input.value = '';
              }}>
              <div className="row">
                <div className="col-8 pr-0">
                  <input
                    id="searchBar"
                    type="text"
                    value={this.state.searchBarValue}
                    onChange={this.handleChange}
                    placeholder="Navn, type, land.."
                    ref={node => {
                      input = node;
                    }}
                    />
                  </div>
                <div className="col-4 pl-0">
                  <input id="button" type="submit" value="SØK"/>
                </div>
              </div>
            </form>
           )}
        </Mutation>
      );
    }
  }

  export default inject("searchBarStore", "paginationStore")(observer(SearchBar));
