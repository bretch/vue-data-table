import * as mutationTypes from './mutation-types'
import { applyFilter, applySort } from './helpers'

export default {
  async fetchPayments ({ state }, params = {}) {
    const { limit = 10, offset = 0, sortQuery = [], searchQuery = {} } = params
    const items = applySort(applyFilter(state.payments, searchQuery), sortQuery)

    return Promise.resolve({
      items: items.slice(offset, limit + offset),
      count: items.length
    })
  },
  updatePayment ({ commit }, options) {
    const { column, item, answer } = options
    const payment = { ...item, [column.name]: answer }
    commit(mutationTypes.UPDATE_PAYMENT, payment)
  },
  deletePayments ({ commit }, items) {
    commit(mutationTypes.DELETE_PAYMENTS, items)
  }
}
