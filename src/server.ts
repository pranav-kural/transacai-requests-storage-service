import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { schema } from './schema'
import { Context, createContext } from './context'

// Method to start the server
const start = async () => {
  // Create a new Apollo Server instance using the schema and context
  const server = new ApolloServer<Context>({
    schema,
    introspection: process.env.NODE_ENV !== 'production', // Disable introspection in production
  })

  // Start standalone server with createContext function
  const { url } = await startStandaloneServer(server, {
    context: createContext,
    listen: { port: 4000 },
  })

  console.log(`\
  🚀 Transac AI ISS listening at: ${url}`)
}

// start on load
start()
