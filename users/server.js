const express = require('express')
const expressGraphQL = require('express-graphql')

const app = express()

app.use('/graphql', expressGraphQL({
  graphiql: true // todo only in development
}))

app.listen(4000, () => {
  console.log('Listening')
})
