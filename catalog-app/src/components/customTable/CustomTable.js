import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';


const GET_PRODUCTQUERY = gql`
  {
    productQuery(Keys:"", Year:"", Skipping:0) {
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
  }
`;
export default class CustomTable extends Component {
  render() {
    return (
      <Query query={GET_PRODUCTQUERY}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          return (
            <div className="container">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">
                    LIST OF PRODUCTS
                  </h3>
                  <h4><Link to="/create">Add Product</Link></h4>
                </div>
                <div className="panel-body">
                  <table className="table table-stripe">
                    <thead>
                      <tr>
                        <th>Varenummer</th>
                        <th>Varenavn</th>
                        <th>Årgang</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.productQuery.map((product, index) => (
                        <tr key={index}>
                          <td><Link to={`/show/${product.Varenummer}`}>{product.Varenummer}</Link></td>
                          <td>{product.Varenavn}</td>
                          <td>{product.Argang}</td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}