let GraphQLSchema = require('graphql').GraphQLSchema;
let GraphQLObjectType = require('graphql').GraphQLObjectType;
let GraphQLList = require('graphql').GraphQLList;
let GraphQLNonNull = require('graphql').GraphQLNonNull;
let GraphQLString = require('graphql').GraphQLString;
let GraphQLInt = require('graphql').GraphQLInt;
let GraphQLFloat = require('graphql').GraphQLFloat;
let ProductModel = require('../models/Product');
let PopularSearchesModel = require('../models/PopularSearches');
let TypeData = require('./Types');

// Import GraphQL object types from separate file
let productType = TypeData.productType;
let popularSearchesType = TypeData.popularSearchesType;

// GraphQL queries
let queryType = new GraphQLObjectType({
name: 'Query',
fields: function () {
    return {
    // Main query which handles search, filters, pagination and sorting. Returns a GraphQLList containing all relevant results.
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
            // filter dictionary handles filtering on packaging, product selection, price, year and country
            let filters = {};
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
                filters['Pris'] = {$gte: params.PriceMin, $lte: params.PriceMax};
            }
            if (params.Country){
                filters['Land'] = params.Country;
            }

            // Mongoose query using:
            // find(...) for filtering on arguments
            // or(...) with regex for searching on product type, product name and country
            // sort(...) for sorting by specified database field
            // skip(...) for pagination
            const products = ProductModel.find(filters).or(
                [{Varetype: { $regex: ".*"+params.Keys+".*",'$options' : 'i' }},
                {Varenavn: { $regex: ".*"+params.Keys+".*",'$options' : 'i' }},
                {Land: { $regex: ".*"+params.Keys+".*",'$options' : 'i' }},])
                .sort(params.SortAfter).limit(20).skip(20*params.Skipping).exec();
            if (!products) {
                throw new Error('Error');
            }
            return products;
        }
    },
    // Returns a GraphQLList of all distinct values in a specified field in the database
    distinctValues: {
        type: new GraphQLList(productType),
        resolve: function (root, params) {
            let distinctCountriesResult = new GraphQLList(GraphQLString);
            ProductModel.find().distinct("Varetype", function(error, countries) {
                if (error){
                    console.log(error);
                }else{
                    let resultArray = [];
                    for (let i = 0; i < countries.length; i++){
                        resultArray.push(countries[i]);
                    }
                    console.log(resultArray);
                }
                return distinctCountriesResult;
            });
        }
    },
    // Returns a GraphQLList of popularSearches in decending order. Used for advanced view functionality.
    popularSearches: {
        type: new GraphQLList(popularSearchesType),
        resolve: function () {
          const popularSearches = PopularSearchesModel.find().sort("-Times").limit(30).exec();
          console.log("Success");

           if (!popularSearches) {
             throw new Error('Error');
           }
           return popularSearches;
        }
    },
    };
}
});

// GraphQL mutations
let mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: function () {
    return {
    // Mutation for adding a new popularSearch to the database
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
            {Searched:params.Searched.toLowerCase()},{$set:{Searched:params.Searched.toLowerCase()},$inc:{Times: 1}}, {upsert: true},
            function (err){
                if (err)
                    throw new Error(err);
                });
        }
    },
    // If popularSearch is already in the database, increment Times field by 1
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
    };
  }
});

module.exports = new GraphQLSchema({query: queryType, mutation: mutation});
