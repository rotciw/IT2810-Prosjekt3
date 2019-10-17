var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var PopularSearchesModel = require('../models/PopularSearches');

var popularSearchesType = new GraphQLObjectType({
  name: 'popularSearche',
  fields: function () {
    return {
      Searched: {
        type: GraphQLString
      },
      Times: {
        type: GraphQLInt
      }
    }
  }
});

var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      popularSearches: {
        type: new GraphQLList(popularSearchesType),
        resolve: function () {
          const popularSearches = PopularSearchesModel.find().limit(10).exec()
          console.log("Success");

           if (!popularSearches) {
             throw new Error('Error')
           }
           return popularSearches
        }
      }
    }
  }
});

var mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: function () {
    return {
      addPopularSearch: {
        type: popularSearchesType,
        args: {
          Searched: {
            type: new GraphQLNonNull(GraphQLString)
          },
          Times: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: function (root, params) {
          const popularSearchesModel = new PopularSearchesModel(params);
          const newPopularSearch = popularSearchesModel.save();
          if (!newPopularSearch){
            throw new Error('Error');
          }
          return newPopularSearch
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({query: queryType, mutation: mutation});
