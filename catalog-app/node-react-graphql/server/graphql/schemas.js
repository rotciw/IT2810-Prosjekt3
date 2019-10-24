let GraphQLSchema = require('graphql').GraphQLSchema;
let GraphQLObjectType = require('graphql').GraphQLObjectType;
let GraphQLList = require('graphql').GraphQLList;
let GraphQLNonNull = require('graphql').GraphQLNonNull;
let GraphQLString = require('graphql').GraphQLString;
let GraphQLInt = require('graphql').GraphQLInt;
let GraphQLFloat = require('graphql').GraphQLFloat;
let ProductModel = require('../models/Product');
let PopularSearchesModel = require('../models/PopularSearches');
let TypeData = require('./Types')

let productType = TypeData.productType;
let popularSearchesType = TypeData.popularSearchesType;

let queryType = new GraphQLObjectType({
name: 'Query',
fields: function () {
    return {
    products: {
        type: new GraphQLList(productType),
        resolve: function () {
        const products = ProductModel.find().limit(10).exec()

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
          const popularSearches = PopularSearchesModel.find().sort("-Times").limit(50).exec()
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

let mutation = new GraphQLObjectType({
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
            type: new GraphQLNonNull(GraphQLFloat)
          }
        },
        resolve: function (root, params) {
          return PopularSearchesModel.findOneAndUpdate(
            {Searched:params.Searched.toLowerCase()},{$set:{Searched:params.Searched.toLowerCase()},$inc:{Times: 1}},
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
