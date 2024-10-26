import { inputObjectType, objectType } from 'nexus'

/**
 * Definition of Insight object type
 */
export const Insight = objectType({
  name: 'Insight',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('requestId')
    t.nonNull.string('clientId')
    t.nonNull.string('insights')
    t.nonNull.field('fromTime', { type: 'DateTime' })
    t.nonNull.field('toTime', { type: 'DateTime' })
    t.nonNull.field('createdAt', { type: 'DateTime' })
  },
})

/**
 * Definition of InsightCreateInput object type
 */
export const InsightCreateInput = inputObjectType({
  name: 'InsightCreateInput',
  definition(t) {
    t.nonNull.string('requestId')
    t.nonNull.string('clientId')
    t.nonNull.string('insights')
    t.nonNull.field('fromTime', { type: 'DateTime' })
    t.nonNull.field('toTime', { type: 'DateTime' })
  },
})

export const InsightsOrderedByCreatedAtInput = inputObjectType({
  name: 'InsightsOrderedByCreatedAtInput',
  definition(t) {
    t.nonNull.field('clientId', { type: 'String' })
    t.nonNull.field('createdAt', { type: 'SortOrder' })
    t.field('limit', { type: 'Int' })
  },
})

export const InsightsTimeRangeInput = inputObjectType({
  name: 'InsightsTimeRangeInput',
  definition(t) {
    t.nonNull.field('fromTime', { type: 'DateTime' })
    t.nonNull.field('toTime', { type: 'DateTime' })
  },
})

export const InsightGetByRequestIdInput = inputObjectType({
  name: 'InsightGetByRequestIdInput',
  definition(t) {
    t.nonNull.string('requestId')
    t.nonNull.string('clientId')
  },
})
