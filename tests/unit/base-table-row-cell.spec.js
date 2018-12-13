import { shallowMount } from '@vue/test-utils'
import BaseTableRowCell from '@/components/BaseTableRowCell.vue'

describe('BaseTableRowCell.vue', () => {
  let wrapper
  const column = {
    name: 'title',
    label: 'Title',
    editable: true
  }
  const item = {
    title: 'Apple',
    votes: 1
  }
  const answer = 'Green Apple'

  beforeEach(() => {
    wrapper = shallowMount(BaseTableRowCell, {
      propsData: { column, item }
    })
  })

  it('renders value', () => {
    expect(wrapper.text()).toMatch(item[column.name])
  })

  it('renders edit button if column is editable', () => {
    expect(wrapper.find({ ref: 'btn' }).exists()).toBe(true)
    wrapper.setProps({ column: { ...column, editable: false } })
    expect(wrapper.find({ ref: 'btn' }).exists()).toBe(false)
  })

  it('renders textarea on edit mode', () => {
    expect(wrapper.vm.edit).toBe(false)
    expect(wrapper.find('textarea').exists()).toBe(false)

    // trigger edit button click
    wrapper.find({ ref: 'btn' }).trigger('click')

    expect(wrapper.vm.edit).toBe(true)
    expect(wrapper.find('textarea').exists()).toBe(true)
  })

  it('emits `cellUpdate` on textarea keyup.enter', () => {
    wrapper.setData({ edit: true })
    const textarea = wrapper.find('textarea')
    textarea.setValue(answer)
    textarea.trigger('keyup.enter')

    const updateOptions = { column, item, answer }
    expect(wrapper.emitted().cellUpdate).toBeTruthy()
    expect(wrapper.emitted().cellUpdate[0]).toEqual([updateOptions])
  })
})
