let GraphQLObjectType = require('graphql').GraphQLObjectType;
let GraphQLString = require('graphql').GraphQLString;
let GraphQLInt = require('graphql').GraphQLInt;
let GraphQLFloat = require('graphql').GraphQLFloat;

let productType = new GraphQLObjectType({
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
        AlkoholPrKrone: {
            type: GraphQLFloat
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

let popularSearchesType = new GraphQLObjectType({
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

module.exports = {productType, popularSearchesType}