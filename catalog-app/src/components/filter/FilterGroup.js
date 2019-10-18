import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import BootstrapTable from 'react-bootstrap-table-next';
import './FilterGroup.css'

export default class CustomTable extends Component {

    render() {
        const data = [{
            dataField: 'Varenavn',
            text: 'Varenavn'
          }
          ];
        const columns = [{
            dataField: 'Varenavn',
            text: 'Filter'
          }
          ];
      return (
       <div className="container">
           <div className="row">
           <BootstrapTable
                id="table"
                headerClasses="tableHeader"
                keyField='Varenummer'
                data={ data }
                columns={ columns }
                bootstrap4={true}
                hover={true}
                bordered={true}
              />
           </div>
       </div>
      );
    }
  }