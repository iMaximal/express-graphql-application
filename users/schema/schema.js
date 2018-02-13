const graphql = require('graphql')
const axios = require('axios')
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema
} = graphql
const DB_URL = require('./../constants')

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: {
    id: { type: GraphQLString },
    name: {type: GraphQLString },
    description: { type: GraphQLString }
  }
})

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType
    }
  }
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {
        id: {
          type: GraphQLString,
        }
      },
      resolve(parentValue, args) {
        return axios.get(`${DB_URL}/users/${args.id}`)
          .then(response => response.data)
      }
    }
  }
})


module.exports = new GraphQLSchema({
  query: RootQuery
})
