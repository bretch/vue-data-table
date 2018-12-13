import { shallowMount } from '@vue/test-utils'
import BaseTableColumnFilter from '@/components/BaseTableColumnFilter.vue'

describe('BaseTableColumnFilter.vue', () => {
  const searchKey = 'cherries'
  const name = 'title'
  let wrapper
  let input

  beforeEach(() => {
    wrapper = shallowMount(BaseTableColumnFilter, {
      propsData: { name }
    })
    input = wrapper.find('input')
  })

  it('renders input with attribute `type` from `props.type`', () => {
    // if props.type is not passed default value should be 'text'
    expect(input.attributes('type')).toEqual('text')
    wrapper.setProps({ type: 'number' })
    expect(input.attributes('type')).toEqual('number')
  })

  it('emits `search` on input keyup.enter', () => {
    input.setValue(searchKey)
    input.trigger('keyup.enter')

    expect(wrapper.emitted().search).toBeTruthy()
    expect(wrapper.emitted().search[0]).toEqual([name, searchKey])
  })

  it('emits `search` on input blur', () => {
    input.setValue(searchKey)
    input.trigger('blur')

    expect(wrapper.emitted().search).toBeTruthy()
    expect(wrapper.emitted().search[0]).toEqual([name, searchKey])
  })
})
