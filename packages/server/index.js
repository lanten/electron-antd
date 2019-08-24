const { prisma } = require('./db/generated/prisma-client')
const { GraphQLServer } = require('graphql-yoga')

const resolvers = {
  Query: {
    users(root, args, context) {
      return context.prisma.users()
    },
    userByName(root, args, context) {
      return context.prisma.user({
        name: args.name
      })
    },
  },
  Mutation: {
    createUser(root, args, context) {
      return context.prisma.createUser({
        name: args.name,
      })
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: {
    prisma,
  },
})

server.start(() => console.log('Server is running on http://localhost:4000'))