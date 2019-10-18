import React, { Component } from "react";
import { TagCloud } from "react-tagcloud";
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

const GET_POPULARSEARCHES = gql`
{
  popularSearches{
    Searched,
    Times
  }
}`;


const Wordcloud = (<Query query={GET_POPULARSEARCHES}>
  {({ loading, error, data }) => {
    if (loading) return "Loading..";
    if (error) return `Error! ${error.message}`;
    return <TagCloud minSize={1}
              maxSize={200}
              tags={this.cloud}
              onClick={tag => alert(`'${tag.value}' was selected!`)} />;
  }}
</Query>)





export default Wordcloud;
