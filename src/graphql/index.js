import graphql from 'graphql'

export const schema = graphql.buildSchema(`
    type Query {
        hello(args:String): String!
    }
`)

export const resolvers = {
    hello: ({args}) => args
}