import { intArg, nonNull, objectType, stringArg, arg } from 'nexus'
import { Context } from '../context'
import { RequestStatus } from '@prisma/client'

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
            status: args.data.status || RequestStatus.PENDING,
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
        const newStatus = args.data.status
        const newInsightsId = args.data.insightsId
        // confirm at least one of the fields is being updated
        if (!newStatus && !newInsightsId) {
          throw new Error(
            'At least one of the fields must be updated: status or insightsId. No action taken.',
          )
        }

        // determine the data to update
        let data:
          | undefined
          | { status: RequestStatus }
          | { insightsId: string }
          | { status: RequestStatus; insightsId: string } = undefined

        if (newStatus && newInsightsId) {
          data = {
            status: newStatus,
            insightsId: newInsightsId,
          }
        } else if (newStatus) {
          data = {
            status: newStatus,
          }
        } else if (newInsightsId) {
          data = {
            insightsId: newInsightsId,
          }
        } else {
          throw new Error('Unexpected error parsing new data. No action taken.')
        }

        // update the request
        return context.prisma.request.update({
          where: {
            id: args.data.id,
            clientId: args.data.clientId,
          },
          data,
        })
      },
    })

    /**
     * Delete a request by its ID and client ID.
     */
    t.field('deleteRequest', {
      type: 'Request',
      args: {
        id: nonNull(stringArg()),
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
