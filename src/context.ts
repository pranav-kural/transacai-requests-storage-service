import { PrismaClient } from '@prisma/client'
import { GraphQLError } from 'graphql'
import type { IncomingMessage, ServerResponse } from 'http'

export interface Context {
  prisma: PrismaClient
}

const prisma = new PrismaClient()

export const createContext = async ({
  req,
}: {
  req: IncomingMessage
  res: ServerResponse
}) => {
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

  return {
    prisma: prisma,
  }
}
