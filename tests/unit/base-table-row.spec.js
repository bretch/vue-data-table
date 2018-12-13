import { shallowMount } from '@vue/test-utils'
import BaseTableRow from '@/components/BaseTableRow.vue'
import BaseTableRowCell from '@/components/BaseTableRowCell.vue'
import CheckBoxButton from '@/components/CheckBoxButton.vue'

describe('BaseTableRow.vue', () => {
  const columns = [{
    name: 'title',
    label: 'Title',
    editable: true
  }, {
    name: 'votes',
    label: 'Votes'
  }]

  const item = {
    title: 'Apple',
    votes: 1
  }
  let wrapper

  beforeEach(() => {
    jest.useFakeTimers()
    wrapper = shallowMount(BaseTableRow, {
      propsData: {
        columns,
        item
      }
    })
  })

  it('emits `rowUpdate` on editable table cell update', () => {
    const updateOptions = {
      column: 'title',
      item,
      answer: 'Green Apple'
    }
    const cellComponent = wrapper.find(BaseTableRowCell)
    cellComponent.vm.$emit('cellUpdate', updateOptions)

    expect(wrapper.emitted().rowUpdate).toBeTruthy()
    expect(wrapper.emitted().rowUpdate[0]).toEqual([updateOptions])
  })

  it('highlights row temporarily on cellUpdate', () => {
    const cellComponent = wrapper.find(BaseTableRowCell)
    cellComponent.vm.$emit('cellUpdate', {})

    expect(wrapper.vm.rowClass).toEqual('table-success')

    // assert rowClass is reset
    jest.advanceTimersByTime(400)
    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 400)
    expect(wrapper.vm.rowClass).toEqual('')
  })

  it('emits `select` on row select', () => {
    wrapper.setProps({ selectable: true })
    const checkBoxBtn = wrapper.find(CheckBoxButton)
    checkBoxBtn.vm.$emit('select')
    expect(wrapper.emitted().select).toBeTruthy()
    expect(wrapper.emitted().select[0]).toEqual([item])
  })

  it('emits `select` on row deselect', () => {
    wrapper.setProps({ selectable: true })
    const checkBoxBtn = wrapper.find(CheckBoxButton)
    checkBoxBtn.vm.$emit('deselect')
    expect(wrapper.emitted().deselect).toBeTruthy()
    expect(wrapper.emitted().deselect[0]).toEqual([item])
  })
})
