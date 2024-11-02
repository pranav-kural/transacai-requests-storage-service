import { enumType, inputObjectType, objectType } from 'nexus'

/**
 * Definition of Request Status enum type
 */
export const RequestStatus = enumType({
  name: 'RequestStatus',
  members: ['PENDING', 'PROCESSING', 'SUCCESS', 'FAILED'],
})

/**
 * Definition of Request object type
 */
export const Request = objectType({
  name: 'Request',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('clientId')
    t.nonNull.string('promptId')
    t.nonNull.string('recordsSourceId')
    t.nonNull.string('promptTemplatesSourceId')
    t.nonNull.field('fromTime', { type: 'DateTime' })
    t.nonNull.field('toTime', { type: 'DateTime' })
    t.nonNull.field('status', { type: RequestStatus })
    t.string('insightsId')
    t.nonNull.field('createdAt', { type: 'DateTime' })
  },
})

/**
 * Definition of RequestCreateInput object type
 */
export const RequestCreateInput = inputObjectType({
  name: 'RequestCreateInput',
  definition(t) {
    t.nonNull.string('clientId')
    t.nonNull.string('promptId')
    t.nonNull.string('recordsSourceId')
    t.nonNull.string('promptTemplatesSourceId')
    t.nonNull.field('fromTime', { type: 'DateTime' })
    t.nonNull.field('toTime', { type: 'DateTime' }),
      t.field('status', { type: RequestStatus })
  },
})

/**
 * Definition of RequestUpdateInput object type
 */
export const RequestUpdateInput = inputObjectType({
  name: 'RequestUpdateInput',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('clientId')
    t.field('status', { type: RequestStatus })
    t.string('insightsId')
  },
})

/**
 * Definition of GetRequestByIdInput object type
 *
 * Requires both request ID and client ID.
 */
export const GetRequestByIdInput = inputObjectType({
  name: 'RequestGetByIdInput',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('clientId')
  },
})

/**
 * Definition of GetRequestsByClientIdInput object type
 */
export const GetRequestsByClientIdInput = inputObjectType({
  name: 'RequestGetByClientIdInput',
  definition(t) {
    t.nonNull.string('clientId')
  },
})

/**
 * Definition of GetRequestsByStatusInput object type
 */
export const GetRequestsByStatusInput = inputObjectType({
  name: 'RequestGetByStatusInput',
  definition(t) {
    t.nonNull.string('clientId')
    t.nonNull.field('status', { type: RequestStatus })
  },
})

/**
 * Definition of GetRequestsByTimeRangeInput object type
 */
export const GetRequestsByTimeRangeInput = inputObjectType({
  name: 'RequestGetByTimeRangeInput',
  definition(t) {
    t.nonNull.string('clientId')
    t.nonNull.field('fromTime', { type: 'DateTime' })
    t.nonNull.field('toTime', { type: 'DateTime' })
  },
})

/**
 * Definition of OrderRequestsByCreatedAtInput object type
 */
export const OrderRequestsByCreatedAtInput = inputObjectType({
  name: 'OrderRequestsByCreatedAtInput',
  definition(t) {
    t.nonNull.string('clientId')
    t.nonNull.field('createdAt', { type: 'SortOrder' })
  },
})

/**
 * Definition of OrderRequestsByFromTimeInput object type
 */
export const OrderRequestsByFromTimeInput = inputObjectType({
  name: 'OrderRequestsByFromTimeInput',
  definition(t) {
    t.nonNull.string('clientId')
    t.nonNull.field('fromTime', { type: 'SortOrder' })
  },
})

/**
 * Definition of OrderRequestsByToTimeInput object type
 */
export const OrderRequestsByToTimeInput = inputObjectType({
  name: 'OrderRequestsByToTimeInput',
  definition(t) {
    t.nonNull.string('clientId')
    t.nonNull.field('toTime', { type: 'SortOrder' })
  },
})

/**
 * Definition of GetFilteredRequests object type
 */
export const GetFilteredRequests = inputObjectType({
  name: 'GetFilteredRequests',
  definition(t) {
    t.int('id')
    t.nonNull.string('clientId')
    t.string('promptId')
    t.string('recordsSourceId')
    t.string('promptTemplatesSourceId')
    t.field('fromTime', { type: 'DateTime' })
    t.field('toTime', { type: 'DateTime' })
    t.field('status', { type: RequestStatus })
    t.string('insightsId')
    t.field('createdAt', { type: 'DateTime' })
  },
})
