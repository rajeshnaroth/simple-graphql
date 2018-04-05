const express = require("express")
const graphqlHTTP = require("express-graphql")
const { makeExecutableSchema } = require("graphql-tools")
const { pipe } = require("ramda")

const { schema: typeDefs, resolvers } = require("../graphql/schema")

const getExpress = () => express()

function prepareGraphQL(app) {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  })

  app.use(
    "/graphql",
    graphqlHTTP((req) => ({
      schema,
      graphiql: true
    }))
  )
  return app
}

function startServer(app, port) {
  app.listen(port, () =>
    console.log("GraphQL running at localhost:4000/graphql")
  )
}

module.exports = {
  start: (port) =>
    pipe(getExpress, prepareGraphQL, (app) => startServer(app, port))() //IIFE
}
