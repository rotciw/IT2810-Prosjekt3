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
          type: GraphQLString
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
            type: GraphQLString
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

var queryType = new GraphQLObjectType({
name: 'Query',
fields: function () {
    return {
    products: {
        type: new GraphQLList(productType),
        resolve: function () {
        const products = ProductModel.find().exec()
        console.log("success");

        if (!products) {
            throw new Error('Error')
        }
        return products
        }
    },
    product: {
        type: new GraphQLList(productType),
        args: {
            Varenummer: {
                name: 'Varenummer',
                type: GraphQLString
            }
        },
        resolve: function (root, params) {
        const productDetails = ProductModel.find({Varenummer: params.Varenummer}).exec()
        if (!productDetails) {
            throw new Error('Error')
        }
        return productDetails
        }
    }
    }
}
});

var mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: function () {
    return {
      addProduct: {
        type: productType,
        args: {
          Varenummer: {
            type: new GraphQLNonNull(GraphQLString)
          },
          Varenavn: {
            type: new GraphQLNonNull(GraphQLString)
          },
          Volum: {
            type: new GraphQLNonNull(GraphQLString)
          },
          Pris: {
            type: new GraphQLNonNull(GraphQLString)
          },
          Literpris: {
            type: new GraphQLNonNull(GraphQLString)
          },
          Varetype: {
            type: new GraphQLNonNull(GraphQLString)
          },
          Produktutvalg: {
            type: new GraphQLNonNull(GraphQLString)
          },
          Fylde: {
            type: new GraphQLNonNull(GraphQLString)
          },
          Friskhet: {
            type: new GraphQLNonNull(GraphQLString)
          },
          Garvestoffer: {
            type: new GraphQLNonNull(GraphQLString)
          },
          Bitterhet: {
            type: new GraphQLNonNull(GraphQLString)
          },
          Sodme: {
            type: new GraphQLNonNull(GraphQLString)
          },
          Smak: {
            type: new GraphQLNonNull(GraphQLString)
          },
          Land: {
            type: new GraphQLNonNull(GraphQLString)
          },
          Argang: {
            type: new GraphQLNonNull(GraphQLString)
          },
          Rastoff: {
              type: new GraphQLNonNull(GraphQLString)
          },
          Alkohol: {
              type: new GraphQLNonNull(GraphQLString)
          },
          Emballasjetype: {
              type: new GraphQLNonNull(GraphQLString)
          },
          Vareurl: {
              type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: function (root, params) {
          const productModel = new ProductModel(params);
          const newProduct = productModel.save();
          if (!newProduct) {
            throw new Error('Error');
          }
          return newProduct
        }
      },

      removeProduct: {
        type: productType,
        args: {
          Varenummer: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(root, params) {
          const removeProduct = ProductModel.findByIdAndRemove(params.varenummer).exec();
          if (!removeProduct) {
            throw new Error('Error')
          }
          return removeProduct;
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({query: queryType, mutation: mutation});
