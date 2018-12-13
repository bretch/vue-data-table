import { shallowMount } from '@vue/test-utils'
import BaseTablePagination from '@/components/BaseTablePagination.vue'

describe('BaseTablePagination.vue', () => {
  let wrapper
  let prevBtn
  let nextBtn

  beforeEach(() => {
    wrapper = shallowMount(BaseTablePagination, {
      propsData: {
        limit: 10,
        offset: 0,
        count: 30
      }
    })
    prevBtn = wrapper.find('[data-test="btn-prev"]')
    nextBtn = wrapper.find('[data-test="btn-next"]')
  })

  it('disables prevPage button on first page', () => {
    expect(prevBtn.attributes('disabled')).toBeTruthy()
    expect(nextBtn.attributes('disabled')).not.toBeTruthy()
  })

  it('disables nextPage button on last page', () => {
    // set to 3nd and last page
    wrapper.setProps({ offset: 20 })
    expect(nextBtn.attributes('disabled')).toBeTruthy()
    expect(prevBtn.attributes('disabled')).not.toBeTruthy()
  })

  it('emits `prevPage` on prevPage button click', () => {
    // go to 2nd page
    wrapper.setProps({ offset: 10 })
    prevBtn.trigger('click')
    expect(wrapper.emitted().prevPage).toBeTruthy()
  })

  it('emits `nextPage` on nextPage button click', () => {
    // go to 2nd page
    wrapper.setProps({ offset: 10 })
    nextBtn.trigger('click')
    expect(wrapper.emitted().nextPage).toBeTruthy()
  })
})
