import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import PaymentsDataTable from '@/components/PaymentsDataTable.vue'
import BaseTable from '@/components/BaseTable.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('PaymentsDataTable.vue', () => {
  let wrapper
  let actions
  let store
  const columns = [{
    name: 'title',
    label: 'Title',
    editable: true
  }, {
    name: 'votes',
    label: 'Votes'
  }]
  const items = [{
    ID: 1,
    title: 'Apple',
    votes: 1
  },
  {
    ID: 2,
    title: 'Milk',
    votes: 2
  },
  {
    ID: 3,
    title: 'Carrot',
    votes: 3
  },
  {
    ID: 4,
    title: 'Banana',
    votes: 2
  }
  ]

  beforeEach(() => {
    actions = {
      fetchPayments: jest.fn(() => Promise.resolve({ items: [], count: 0 })),
      updatePayment: jest.fn(),
      deletePayments: jest.fn()
    }
    store = new Vuex.Store({
      state: {},
      actions
    })
    wrapper = shallowMount(PaymentsDataTable, {
      propsData: {
        columns,
        items,
        count: items.length
      },
      store,
      localVue
    })
  })

  it('calls store action `fetchPayments` on BaseTable refresh', () => {
    wrapper.find(BaseTable).vm.$emit('refresh')
    expect(actions.fetchPayments).toHaveBeenCalled()
  })

  it('calls store action `updatePayment` on BaseTable rowUpdate', () => {
    wrapper.find(BaseTable).vm.$emit('rowUpdate')
    expect(actions.updatePayment).toHaveBeenCalled()
  })

  it('calls store action `deletePayments` on deleteItems', () => {
    window.confirm = jest.fn(() => true)
    wrapper.vm.deleteItems(items, {})
    expect(actions.deletePayments).toHaveBeenCalled()
  })
})
