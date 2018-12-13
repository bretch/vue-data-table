import { shallowMount } from '@vue/test-utils'
import BaseTableActions from '@/components/BaseTableActions.vue'

describe('BaseTableActions.vue', () => {
  let wrapper
  let buttons = []
  const action1 = {
    label: 'Action 1',
    click: () => { console.log('action1') }
  }
  const action2 = {
    label: 'Action 2',
    click: () => { console.log('action2') }

  }
  const actions = [ action1, action2 ]

  beforeEach(() => {
    wrapper = shallowMount(BaseTableActions, {
      propsData: { actions }
    })
    buttons = wrapper.findAll('button')
  })

  it('renders actionable buttons', () => {
    expect(buttons.length).toEqual(actions.length)
    expect(buttons.at(0).text()).toMatch(action1.label)
    expect(buttons.at(1).text()).toMatch(action2.label)
  })

  it('emits `applyAction` on action button click', () => {
    buttons.at(0).trigger('click')
    expect(wrapper.emitted().applyAction).toBeTruthy()
  })
})
