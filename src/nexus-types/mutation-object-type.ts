import { intArg, nonNull, objectType, stringArg, arg } from 'nexus'
import { Context } from '../context'

export const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    /**
     * Create a new request.
     */
    t.field('createRequest', {
      type: 'Request',
      args: {
        data: nonNull(
          arg({
            type: 'RequestCreateInput',
          }),
        ),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.request.create({
          data: {
            clientId: args.data.clientId,
            promptId: args.data.promptId,
            recordsSourceId: args.data.recordsSourceId,
            promptTemplatesSourceId: args.data.promptTemplatesSourceId,
            fromTime: args.data.fromTime,
            toTime: args.data.toTime,
            status: args.data.status,
          },
        })
      },
    })

    /**
     * Update an existing request.
     *
     * Only the status and insights ID can be updated.
     */
    t.field('updateRequest', {
      type: 'Request',
      args: {
        data: nonNull(
          arg({
            type: 'RequestUpdateInput',
          }),
        ),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.request.update({
          where: {
            id: args.data.id,
            clientId: args.data.clientId,
          },
          data: {
            status: args.data.status,
            insightsId: args.data.insightsId,
          },
        })
      },
    })

    /**
     * Delete a request by its ID and client ID.
     */
    t.field('deleteRequest', {
      type: 'Request',
      args: {
        id: nonNull(intArg()),
        clientId: nonNull(stringArg()),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.request.delete({
          where: {
            id: args.id,
            clientId: args.clientId,
          },
        })
      },
    })
  },
})
