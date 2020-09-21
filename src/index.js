const express = require('express')
const http = require('http')
const {graphqlHTTP} = require('express-graphql')
const mongoose = require('mongoose')

const app = express()
const server = http.createServer(app)

const schema = require('./graphql/index')
const resolvers = require('./graphql/index')

mongoose.connect(process.env.DB || 'mongodb://localhost:27017/dev', ({
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}), () => console.log('db connected'))

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true
}))

server.listen(8081, () => console.log('8081'))