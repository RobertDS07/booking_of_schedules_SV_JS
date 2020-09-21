const {buildSchema} = require('graphql')

const schema = buildSchema(`
    type Query {
        hello(args:String): String!
    }
`)

const resolvers = {
    hello: ({args}) => args
}

module.exports = schema
module.exports = resolvers