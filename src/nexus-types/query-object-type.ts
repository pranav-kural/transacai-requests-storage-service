import { intArg, nonNull, objectType, stringArg, arg } from 'nexus'
import { Context } from '../context'

export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.field('insightById', {
      type: 'Insight',
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.insight.findUnique({
          where: {
            id: args.id,
          },
        })
      },
    })

    t.list.field('allInsightsForClient', {
      type: 'Insight',
      args: {
        clientId: nonNull(stringArg()),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.insight.findMany({
          where: {
            clientId: args.clientId,
          },
        })
      },
    })

    t.field('insightByRequestId', {
      type: 'Insight',
      args: {
        data: nonNull(
          arg({
            type: 'InsightGetByRequestIdInput',
          }),
        ),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.insight.findUnique({
          where: {
            requestId: args.data.requestId,
            clientId: args.data.clientId,
          },
        })
      },
    })

    t.list.field('insightsInTimeRange', {
      type: 'Insight',
      args: {
        data: nonNull(
          arg({
            type: 'InsightsTimeRangeInput',
          }),
        ),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.insight.findMany({
          where: {
            createdAt: {
              gte: args.data.fromTime,
              lte: args.data.toTime,
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        })
      },
    })

    t.nonNull.list.field('insightsOrderedByCreatedAt', {
      type: 'Insight',
      args: {
        data: nonNull(
          arg({
            type: 'InsightsOrderedByCreatedAtInput',
          }),
        ),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.insight.findMany({
          where: {
            clientId: args.data.clientId,
          },
          orderBy: {
            createdAt: args.data.createdAt,
          },
          take: args.data.limit || undefined,
        })
      },
    })
  },
})
