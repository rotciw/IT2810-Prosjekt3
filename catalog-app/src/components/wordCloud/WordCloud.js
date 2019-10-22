import React, { Component } from "react";
import { TagCloud } from "react-tagcloud";
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';

const GET_POPULAR = gql`
{
  popularSearches{
    Searched,
    Times
  }
}`;

function WordCloud() {
    const { loading, error, data } = useQuery(GET_POPULAR)
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    let cloudData = []
    data.popularSearches.map(popSearch => (
        cloudData.push({value:popSearch.Searched,count:popSearch.Times})
    ))
    return (
    <TagCloud minSize={50}
              maxSize={125}
              tags={cloudData}
    />
  );
}

export default WordCloud;