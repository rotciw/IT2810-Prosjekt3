import React from 'react';
import renderer from 'react-test-renderer';
import Modal from '../components/modalContainer/modal/Modal';
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


describe("Modal component", () => {
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
                        <Modal />
                    </Provider>
                </ApolloProvider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});