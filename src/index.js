import express from 'express'
import http from 'http'
import expressGql from 'express-graphql'
import mongoose from 'mongoose'

const app = express()
const server = http.createServer(app)

import {schema, resolvers} from './graphql/index.js'

mongoose.connect(process.env.DB || 'mongodb://localhost:27017/dev', ({
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}), () => console.log('db connected'))

app.use('/graphql', expressGql.graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true
}))

server.listen(8081, () => console.log('8081'))