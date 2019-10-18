import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './index.css';
import App from './components/app/App';
import * as serviceWorker from './serviceWorker';
import Show from './components/Show';

const client = new ApolloClient({ uri: 'http://localhost:3000/graphql' });

ReactDOM.render(
    <ApolloProvider client={client}>
        <Router>
            <div>
                <Route exact path='/' component={App} />
                <Route path='/show/:id' component={Show} />

            </div>
        </Router>
    </ApolloProvider>,
    document.getElementById('root')
);

//<Route path='/create' component={Create} /> 
//<Route path='/show/:id' component={Show} />

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();