import { makeSchema, enumType } from 'nexus'
import {
  Insight,
  InsightCreateInput,
  InsightGetByRequestIdInput,
  InsightsOrderedByCreatedAtInput,
  InsightsTimeRangeInput,
} from './nexus-types/insight-object-types'
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
    Insight,
    InsightCreateInput,
    InsightsOrderedByCreatedAtInput,
    InsightsTimeRangeInput,
    InsightGetByRequestIdInput,
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
