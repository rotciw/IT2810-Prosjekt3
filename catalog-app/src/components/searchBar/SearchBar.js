import React, { Component } from 'react';

export default class SearchBar extends Component {
    _handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        console.log('do validate');
      }
    }
  
    render() {
      return <input type="text" onKeyDown={this._handleKeyDown} />
    }
  }