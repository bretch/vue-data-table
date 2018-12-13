import { shallowMount } from '@vue/test-utils'
import BaseTableColumnHeader from '@/components/BaseTableColumnHeader.vue'

describe('BaseTableColumnHeader.vue', () => {
  const name = 'title'
  const label = 'Title'
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(BaseTableColumnHeader, {
      propsData: { name, label }
    })
  })

  it('renders label', () => {
    expect(wrapper.text()).toMatch(label)
  })

  describe('emits `sort` on wrapper click', () => {
    it('set payload sortType `asc` if props.sortType is not set ', () => {
      expect(wrapper.vm.sortType).toEqual('')

      wrapper.trigger('click')
      expect(wrapper.emitted().sort).toBeTruthy()
      expect(wrapper.emitted().sort[0]).toEqual([name, 'asc'])
    })
    it('set payload sortType `desc` if props.sortType is `asc` ', () => {
      wrapper.setProps({ sortType: 'asc' })
      expect(wrapper.vm.sortType).toEqual('asc')

      wrapper.trigger('click')
      expect(wrapper.emitted().sort).toBeTruthy()
      expect(wrapper.emitted().sort[0]).toEqual([name, 'desc'])
    })
    it('set payload sortType `` if props.sortType is `desc`: resets sort condition', () => {
      wrapper.setProps({
        sortType: 'desc'
      })
      expect(wrapper.vm.sortType).toEqual('desc')

      wrapper.trigger('click')
      expect(wrapper.emitted().sort).toBeTruthy()
      expect(wrapper.emitted().sort[0]).toEqual([name, ''])
    })
  })

  it('renders arrow up icon if props.sortType = `asc`', () => {
    wrapper.setProps({ sortType: 'asc' })
    expect(wrapper.find('.fa-arrow-up').exists()).toBe(true)
  })

  it('renders arrow up icon if props.sortType = `asc`', () => {
    wrapper.setProps({ sortType: 'desc' })
    expect(wrapper.find('.fa-arrow-down').exists()).toBe(true)
  })
})
