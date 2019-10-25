import React from 'react';
import renderer from 'react-test-renderer';
import Pagination from '../components/pagination/Pagination.js';
import { Provider } from 'mobx-react';
import RootStore from '../stores/RootStore';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';

const cache = new InMemoryCache();
const client = new ApolloClient({
    link: createHttpLink({
        uri: 'http://it2810-38.idi.ntnu.no:3000/graphql',
        fetch: fetch,
    }),
    cache: cache,
});
const rootStore = new RootStore();


describe("Pagination component", () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(
                <ApolloProvider client={client}>
                    <Provider
                        rootStore={rootStore}
                        filterStore={rootStore.filterStore}
                        sortStore={rootStore.sortStore}
                        searchBarStore={rootStore.searchBarStore}
                        paginationStore={rootStore.paginationStore}>
                        <Pagination />
                    </Provider>
                </ApolloProvider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});