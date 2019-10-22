import React, { Component } from 'react';
import "./SearchBar.css"
import { inject, observer } from 'mobx-react';

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
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-8 pr-0">
              <input
                id="searchBar"
                type="text"
                value={this.state.searchBarValue}
                onChange={this.handleChange}
                placeholder="Navn, type, land.."
                />
              </div>
            <div className="col-4 pl-0">
              <input id="button" type="submit" value="SØK"/>
            </div>
          </div>
        </form>
      );
    }
  }

  export default inject("searchBarStore")(observer(SearchBar));