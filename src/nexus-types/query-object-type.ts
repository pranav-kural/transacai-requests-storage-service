import { intArg, nonNull, objectType, stringArg, arg } from 'nexus'
import { Context } from '../context'

export const Query = objectType({
  name: 'Query',
  definition(t) {
    /**
     * Get a request by its ID and client ID.
     */
    t.field('requestById', {
      type: 'Request',
      args: {
        id: nonNull(intArg()),
        clientId: nonNull(stringArg()),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.request.findUnique({
          where: {
            id: args.id,
            clientId: args.clientId,
          },
        })
      },
    })

    /**
     * Get all requests for a given client.
     */
    t.list.field('requestsByClientId', {
      type: 'Request',
      args: {
        clientId: nonNull(stringArg()),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.request.findMany({
          where: {
            clientId: args.clientId,
          },
        })
      },
    })

    /**
     * Get all requests with a given status.
     */
    t.list.field('requestsByStatus', {
      type: 'Request',
      args: {
        data: nonNull(
          arg({
            type: 'RequestGetByStatusInput',
          }),
        ),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.request.findMany({
          where: {
            clientId: args.data.clientId,
            status: args.data.status,
          },
        })
      },
    })

    /**
     * Get all requests within a given time range.
     */
    t.list.field('requestsByTimeRange', {
      type: 'Request',
      args: {
        data: nonNull(
          arg({
            type: 'RequestGetByTimeRangeInput',
          }),
        ),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.request.findMany({
          where: {
            clientId: args.data.clientId,
            fromTime: {
              gte: args.data.fromTime,
            },
            toTime: {
              lte: args.data.toTime,
            },
          },
        })
      },
    })

    /**
     * Get all requests ordered by creation date.
     */
    t.list.field('requestsOrderedByCreatedAt', {
      type: 'Request',
      args: {
        data: nonNull(
          arg({
            type: 'OrderRequestsByCreatedAtInput',
          }),
        ),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.request.findMany({
          where: {
            clientId: args.data.clientId,
          },
          orderBy: {
            createdAt: args.data.createdAt,
          },
        })
      },
    })

    /**
     * Get all requests ordered by from time.
     */
    t.list.field('requestsOrderedByFromTime', {
      type: 'Request',
      args: {
        data: nonNull(
          arg({
            type: 'OrderRequestsByFromTimeInput',
          }),
        ),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.request.findMany({
          where: {
            clientId: args.data.clientId,
          },
          orderBy: {
            fromTime: args.data.fromTime,
          },
        })
      },
    })

    /**
     * Get all requests ordered by to time.
     */
    t.list.field('requestsOrderedByToTime', {
      type: 'Request',
      args: {
        data: nonNull(
          arg({
            type: 'OrderRequestsByToTimeInput',
          }),
        ),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.request.findMany({
          where: {
            clientId: args.data.clientId,
          },
          orderBy: {
            toTime: args.data.toTime,
          },
        })
      },
    })

    /**
     * Get all requests matching the provided filter.
     */
    t.list.field('filteredRequests', {
      type: 'Request',
      args: {
        data: nonNull(
          arg({
            type: 'GetFilteredRequests',
          }),
        ),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.request.findMany({
          where: {
            id: args.data.id,
            clientId: args.data.clientId,
            promptId: args.data.promptId,
            recordsSourceId: args.data.recordsSourceId,
            promptTemplatesSourceId: args.data.promptTemplatesSourceId,
            fromTime: args.data.fromTime,
            toTime: args.data.toTime,
            status: args.data.status,
            insightsId: args.data.insightsId,
            createdAt: args.data.createdAt,
          },
        })
      },
    })
  },
})
