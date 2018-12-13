import * as mutationTypes from './mutation-types'

export default {
  [mutationTypes.UPDATE_PAYMENT] (state, payment) {
    const index = state.payments.findIndex(p => p.ID === payment.ID)
    if (index !== -1) { state.payments[index] = payment }
  },
  [mutationTypes.DELETE_PAYMENTS] (state, paymentIds) {
    state.payments = state.payments.filter(payment => !paymentIds.includes(payment.ID))
  }
}
