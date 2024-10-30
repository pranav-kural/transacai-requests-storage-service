import { intArg, nonNull, objectType, stringArg, arg } from 'nexus'
import { Context } from '../context'

export const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.nonNull.field('createInsight', {
      type: 'Int',
      args: {
        data: nonNull(
          arg({
            type: 'InsightCreateInput',
          }),
        ),
      },
      resolve: async (_, args, context: Context) => {
        const newInsight = await context.prisma.insight.create({
          data: {
            requestId: args.data.requestId,
            clientId: args.data.clientId,
            insights: args.data.insights,
            fromTime: args.data.fromTime,
            toTime: args.data.toTime,
          },
        })
        // Return the id of the newly created insight
        return newInsight.id
      },
    })

    t.field('deleteInsight', {
      type: 'Insight',
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.insight.delete({
          where: {
            id: args.id,
          },
        })
      },
    })

    t.field('deleteInsightByRequestId', {
      type: 'Insight',
      args: {
        data: nonNull(
          arg({
            type: 'InsightGetByRequestIdInput',
          }),
        ),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.insight.delete({
          where: {
            requestId: args.data.requestId,
            clientId: args.data.clientId,
          },
        })
      },
    })

    t.nonNull.field('deleteAllInsightsForClient', {
      type: 'Int',
      args: {
        clientId: nonNull(stringArg()),
      },
      resolve: async (_, args, context: Context) => {
        const { count } = await context.prisma.insight.deleteMany({
          where: {
            clientId: args.clientId,
          },
        })
        return count
      },
    })
  },
})
