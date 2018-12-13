import { shallowMount } from '@vue/test-utils'
import CheckBoxButton from '@/components/CheckBoxButton.vue'

describe('CheckBoxButton.vue', () => {
  let wrapper
  const checkedClass = 'btn-info'
  const uncheckedClass = 'btn-outline-info'

  beforeEach(() => {
    wrapper = shallowMount(CheckBoxButton)
  })

  it('renders default unchecked button', () => {
    expect(wrapper.vm.checked).toBe(false)
    expect(wrapper.classes(uncheckedClass)).toBe(true)
    expect(wrapper.classes(checkedClass)).toBe(false)
  })

  it('renders checked button on `props.checked` = true', () => {
    wrapper.setProps({ checked: true })
    expect(wrapper.vm.checked).toBe(true)
    expect(wrapper.classes(checkedClass)).toBe(true)
    expect(wrapper.classes(uncheckedClass)).toBe(false)
  })

  it('emits `select` on button click when `props.checked` is false', () => {
    expect(wrapper.vm.checked).toBe(false)
    wrapper.trigger('click')
    expect(wrapper.emitted().select).toBeTruthy()
  })

  it('emits `deselect` on button click when `props.checked` is true', () => {
    wrapper.setProps({ checked: true })
    expect(wrapper.vm.checked).toBe(true)
    wrapper.trigger('click')
    expect(wrapper.emitted().deselect).toBeTruthy()
  })
})
