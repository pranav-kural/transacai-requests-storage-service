import { makeSchema } from 'nexus'
import {
  Request,
  RequestStatus,
  RequestCreateInput,
  RequestUpdateInput,
  GetRequestByIdInput,
  GetRequestsByClientIdInput,
  GetRequestsByStatusInput,
  GetRequestsByTimeRangeInput,
  GetRequestsByRecordsSourceIdInput,
  GetRequestsByPromptTemplatesSourceIdInput,
  GetRequestsByPromptIdInput,
  GetRequestsByInsightsIdInput,
  OrderRequestsByCreatedAtInput,
  OrderRequestsByFromTimeInput,
  OrderRequestsByToTimeInput,
} from './nexus-types/requests-object-types'
import { Query } from './nexus-types/query-object-type'
import { Mutation } from './nexus-types/mutation-object-type'
import { DateTime } from './nexus-types/date-time-type'
import { SortOrder } from './nexus-types/sort-order-enum-type'

/**
 * The makeSchema function is used to create a GraphQL schema from the provided types.
 *
 * Type definitions can be found in the `nexus-types` directory.
 */
export const schema = makeSchema({
  types: [
    Query,
    Mutation,
    Request,
    RequestStatus,
    RequestCreateInput,
    RequestUpdateInput,
    GetRequestByIdInput,
    GetRequestsByClientIdInput,
    GetRequestsByStatusInput,
    GetRequestsByTimeRangeInput,
    GetRequestsByRecordsSourceIdInput,
    GetRequestsByPromptTemplatesSourceIdInput,
    GetRequestsByPromptIdInput,
    GetRequestsByInsightsIdInput,
    OrderRequestsByCreatedAtInput,
    OrderRequestsByFromTimeInput,
    OrderRequestsByToTimeInput,
    SortOrder,
    DateTime,
  ],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})
