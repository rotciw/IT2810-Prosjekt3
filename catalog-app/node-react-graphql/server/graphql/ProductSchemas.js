var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var ProductModel = require('../models/Product');

var productType = new GraphQLObjectType({
    name: 'product',
    fields: function () {
      return {
        _varenummer: {
          type: GraphQLString
        },
        varenavn: {
          type: GraphQLString
        },
        volum: {
          type: GraphQLString
        },
        pris: {
          type: GraphQLString
        },
        literpris: {
          type: GraphQLString
        },
        varetype: {
          type: GraphQLString
        },
        produktutvalg: {
            type: GraphQLString
        },
        fylde: {
            type: GraphQLString
        },
        friskhet: {
            type: GraphQLString
        },
        garvestoffer: {
            type: GraphQLString
        },
        bitterhet: {
            type: GraphQLString
        },
        sodme: {
            type: GraphQLString
        },
        farge: {
            type: GraphQLString
        },
        lukt: {
            type: GraphQLString
        },
        smak: {
            type: GraphQLString
        },
        land: {
            type: GraphQLString
        },
        argang: {
            type: GraphQLString
        }
      }
    }
  });

  var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
      return {
        products: {
          type: new GraphQLList(productType),
          resolve: function () {
            const products = ProductModel.find().exec()
            if (!products) {
              throw new Error('Error')
            }
            return products
          }
        },
        product: {
          type: productType,
          args: {
            id: {
              name: '_varenummer',
              type: GraphQLString
            }
          },
          resolve: function (root, params) {
            const productDetails = ProductModel.findById(params.varenummer).exec()
            if (!productDetails) {
              throw new Error('Error')
            }
            return productDetails
          }
        }
      }
    }
  });