const { ApolloServer } = require("apollo-server")
const mongoose = require("mongoose")

require("dotenv").config({ path: ".env" })

const types = require("./types/types")
const resolvers = require("./resolvers/resolvers")

const server = new ApolloServer({
  typeDefs: types,
  resolvers,
})

const PORT = process.env.PORT || 5000

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    server.listen(PORT).then(({ url }) => {
      console.log(`🚀 Server ready at ${url}`)
    })
  })
  .catch((err) => {
    console.log("Error", err)
  })
