import React, { Component } from 'react';
import "./Table.css";
import ReactTable from 'react-table'
import 'react-table/react-table.css'

export default class CustomTable extends Component {
    render() {
      const data = [{
        name: 'Tanner Linsley',
        age: 26,
      }
      ]
      const columns = [{
        Header: 'Name',
        accessor: 'name' // String-based value accessors!
      }, {
        Header: 'Age',
        accessor: 'age',
        Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
      }]
      return <ReactTable
        data={ data }
        columns={ columns }
        SubComponent={row=> {
          return (
            <div>{row}</div>
          );
        }}
      />
    }
}
