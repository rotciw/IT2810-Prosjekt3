var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDouble = require('graphql').GraphQLDouble;
var GraphQLFloat = require('graphql').GraphQLFloat;
var GraphQLDate = require('graphql-date');
var ProductModel = require('../models/Product');
var PopularSearchesModel = require('../models/PopularSearches');


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
    products: {
        type: new GraphQLList(productType),
        resolve: function () {
        const products = ProductModel.find().limit(10).exec()
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
    },
    distinctValues: {
        type: new GraphQLList(productType),
        resolve: function (root, params) {
            let distinctCountriesResult = new GraphQLList(GraphQLString);
            ProductModel.find().distinct("Varetype", function(error, countries) {
                if (error){
                    console.log(error);
                }else{
                    let resultArray = []
                    for (let i = 0; i < countries.length; i++){
                        resultArray.push(countries[i])
                    }
                    console.log(resultArray)
                }
                return distinctCountriesResult;
            });
        }
    },
    productQuery: {
        type: new GraphQLList(productType),
        args: {
            Keys: {
                name: 'Keys',
                type: GraphQLString
            },
            Packaging: {
                name: 'Packaging',
                type: GraphQLString
            },
            ProductSelection: {
                name: 'ProductSelection',
                type: GraphQLString
            },
            Country: {
                name: 'Country',
                type: GraphQLString
            },
            YearMin: {
                name: 'YearMin',
                type: GraphQLString
            },
            YearMax: {
                name: 'YearMax',
                type: GraphQLString
            },
            PriceMin: {
                name: 'PriceMin',
                type: GraphQLFloat
            },
            PriceMax: {
                name: 'PriceMax',
                type: GraphQLFloat
            },
            Skipping: {
                name: 'Skipping',
                type: GraphQLInt
            },
            SortAfter: {
                name: 'SortAfter',
                type: GraphQLString
            }
        },
        resolve: function (root, params) {
            let filters = {}
            if (params.Packaging){
                filters['Emballasjetype'] = params.Packaging;
            }
            if (params.ProductSelection){
                filters['Produktutvalg'] = params.ProductSelection;
            }
            if (params.YearMin && params.YearMax){
                filters['Argang'] = {$gte: params.YearMin, $lte: params.YearMax};
            }
            if (params.PriceMin && params.PriceMax){
                // $expr: { $lte: [ { $toDouble: "$Price" }, 1000.0 ] }
                filters['Pris'] = {$gte: params.PriceMin, $lte: params.PriceMax};
            }
            if (params.Country){
                filters['Land'] = params.Country;
            }
            

            const products = ProductModel.find(filters).or(
                [{Varetype: { $regex: ".*"+params.Keys+".*",'$options' : 'i' }},
                {Varenavn: { $regex: ".*"+params.Keys+".*",'$options' : 'i' }},
                {Land: { $regex: ".*"+params.Keys+".*",'$options' : 'i' }},])
                .sort(params.SortAfter).limit(20).skip(20*params.Skipping).exec()
            if (!products) {
                throw new Error('Error')
            }
            return products
        }
    },
    popularSearches: {
        type: new GraphQLList(popularSearchesType),
        resolve: function () {
          const popularSearches = PopularSearchesModel.find().sort("-Times").limit(10).exec()
          console.log("Success");

           if (!popularSearches) {
             throw new Error('Error')
           }
           return popularSearches
        }
    },
    popularSearch: {
        type: new GraphQLList(popularSearchesType),
        args: {
            Searched: {
                name: 'Searched',
                type: GraphQLString
            }
        },
        resolve: function (root, params) {
            const search = PopularSearchesModel.find({Searched: params.Searched}).exec();
            if (!search) {
              throw new Error('Error')
            }
            return search
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
    },
    addPopularSearch: {
        type: popularSearchesType,
        args: {
          Searched: {
            type: new GraphQLNonNull(GraphQLString)
          },
          Times: {
            type: new GraphQLNonNull(GraphQLFloat)
          }
        },
        resolve: function (root, params) {
          return PopularSearchesModel.findOneAndUpdate(
            {Searched:params.Searched.toLowerCase()},{$set:{Searched:params.Searched.toLowerCase()},$inc:{Times: 1/2}}, {upsert: true},
            function (err){
                if (err)
                    throw new Error(err);
                });
        }
    },
    updatePopularSearch: {
        type: popularSearchesType,
        args: {
            Searched: {
              type: new GraphQLNonNull(GraphQLString)
            },
            Times: {
              type: new GraphQLNonNull(GraphQLFloat)
            }
        },
        resolve(params) {
            return PopularSearchesModel.findOneAndUpdate(
                params.Searched, {$inc:{Times:1}},
                function (err){
                    if (err)
                        throw new Error(err);
                    });
        }
    }
    }
  }
});

module.exports = new GraphQLSchema({query: queryType, mutation: mutation});
