import { PrismaClient } from '@prisma/client'
import { GraphQLError } from 'graphql'
import type { IncomingMessage, ServerResponse } from 'http'

// Define the context type for data to be shared API-wide
export interface Context {
  prisma: PrismaClient
}

// Instantiate a new Prisma client
const prisma = new PrismaClient()

/*
 * Method to create the API-wide context (will be passed to the ApolloServer constructor)
 */
export const createContext = async ({
  req,
}: {
  req: IncomingMessage
  res: ServerResponse
}): Promise<Context> => {
  // Get API key from headers
  const apiKey = req.headers.authorization || ''

  // Verify API key
  if (apiKey !== process.env.TRANSAC_AI_ISS_API_KEY) {
    // if the API key is invalid, return status 401
    throw new GraphQLError('Invalid API key', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 },
      },
    })
  }

  // return context object
  return {
    prisma: prisma,
  }
}
