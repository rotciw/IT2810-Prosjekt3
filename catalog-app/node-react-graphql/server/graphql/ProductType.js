var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLFloat = require('graphql').GraphQLFloat;

let ProductType = new GraphQLObjectType({
    name: 'product',
    fields: function () {
      return {
        Varenummer: {
          type: GraphQLString
        },
        Varenavn: {
          type: GraphQLString
        },
        Volum: {
          type: GraphQLString
        },
        Pris: {
          type: GraphQLFloat
        },
        Literpris: {
          type: GraphQLString
        },
        Varetype: {
          type: GraphQLString
        },
        Produktutvalg: {
            type: GraphQLString
        },
        Fylde: {
            type: GraphQLString
        },
        Friskhet: {
            type: GraphQLString
        },
        Garvestoffer: {
            type: GraphQLString
        },
        Bitterhet: {
            type: GraphQLString
        },
        Sodme: {
            type: GraphQLString
        },
        Smak: {
            type: GraphQLString
        },
        Land: {
            type: GraphQLString
        },
        Argang: {
            type: GraphQLString
        },
        Rastoff: {
            type: GraphQLString
        },
        Alkohol: {
            type: GraphQLInt
        },
        Emballasjetype: {
            type: GraphQLString
        },
        Vareurl: {
            type: GraphQLString
        }
      }
    }
  });

module.exports = {ProductType}