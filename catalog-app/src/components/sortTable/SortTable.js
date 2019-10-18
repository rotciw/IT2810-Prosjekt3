import React, { Component } from 'react';
import SortButton from '../sortButton/SortButton';
import CatalogStore from '../../stores/CatalogStore';
import { inject, observer } from 'mobx-react';


class SortTable extends Component {
    render() {
      return(
        <div>
          <SortButton name="Varenavn"/>
          {(this.props.sortStore.sortElement)}
        </div>
        )
      }
    }

  export default inject('sortStore')(observer(SortTable));