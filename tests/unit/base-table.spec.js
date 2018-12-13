import { shallowMount } from '@vue/test-utils'
import BaseTable from '@/components/BaseTable.vue'
import BaseTableColumnFilter from '@/components/BaseTableColumnFilter.vue'
import BaseTableColumnHeader from '@/components/BaseTableColumnHeader.vue'
import BaseTableRow from '@/components/BaseTableRow.vue'
import BaseTableActions from '@/components/BaseTableActions.vue'
import BaseTablePagination from '@/components/BaseTablePagination.vue'

describe('BaseTable.vue', () => {
  let wrapper
  const columns = [
    {
      name: 'title',
      label: 'Title',
      editable: true
    }, {
      name: 'votes',
      label: 'Votes'
    }
  ]
  const items = [{
    title: 'Apple',
    votes: 1
  },
  {
    title: 'Milk',
    votes: 2
  },
  {
    title: 'Carrot',
    votes: 3
  },
  {
    title: 'Banana',
    votes: 2
  }]
  const refreshOptions = { limit: 10, offset: 0, sortQuery: [], searchQuery: {} }

  beforeEach(() => {
    wrapper = shallowMount(BaseTable, {
      propsData: {
        columns,
        items,
        count: items.length
      }
    })
  })

  it('sets default properties if not passed', () => {
    expect(wrapper.vm.options).toEqual(refreshOptions)
  })

  it('renders scoped slots for custom rendering of table cell', () => {
    wrapper = shallowMount(BaseTable, {
      propsData: {
        columns,
        items,
        count: items.length
      },
      scopedSlots: {
        title: '<h1 slot-scope="props">{{props.title}}</h1>'
      }
    })
    expect(wrapper.vm.$scopedSlots.title).toBeTruthy()
  })

  it('emits `refresh` on search', () => {
    const [action, column, searchText] = ['search', 'title', 'loona']
    const tableSearch = wrapper.find(BaseTableColumnFilter)
    tableSearch.vm.$emit(action, column, searchText)

    expect(wrapper.emitted().refresh).toBeTruthy()
    expect(wrapper.emitted().refresh[0]).toEqual([{ ...refreshOptions,
      action,
      searchQuery: {
        [column]: searchText
      }
    }])
  })

  it('emits `refresh` on sort', () => {
    const [ action, column, sortType ] = ['sort', 'title', 'asc']
    const tableSort = wrapper.find(BaseTableColumnHeader)
    tableSort.vm.$emit(action, column, sortType)

    expect(wrapper.emitted().refresh).toBeTruthy()
    expect(wrapper.emitted().refresh[0]).toEqual([{ ...refreshOptions,
      action,
      sortQuery: [{
        column,
        sortType
      }]
    }])

    // expect(wrapper.emitted().refresh[0]).toEqual([
    //   {
    //     action: 'sort',
    //     limit: 10,
    //     offset: 0,
    //     searchQuery: { },
    //     sortQuery: [{
    //       column: 'title',
    //       sortType: 'asc'
    //     }]
    //   }
    // ])
  })

  it('emits `refresh` on prev page click', () => {
    const [offset, limit] = [2, 2]
    wrapper = shallowMount(BaseTable, {
      propsData: {
        columns,
        items: items.slice(offset, limit + offset),
        count: items.length,
        options: { limit, offset }
      }
    })

    const tablePagination = wrapper.find(BaseTablePagination)
    tablePagination.vm.$emit('prevPage')

    expect(wrapper.emitted().refresh).toBeTruthy()
    expect(wrapper.emitted().refresh[0]).toEqual([{
      action: 'prevPage',
      limit,
      offset: offset - limit,
      searchQuery: {},
      sortQuery: []
    }])
  })

  it('emits `refresh` on next page click', () => {
    const [offset, limit] = [0, 2]
    wrapper = shallowMount(BaseTable, {
      propsData: {
        columns,
        items: items.slice(offset, limit + offset),
        count: items.length,
        options: {
          limit,
          offset
        }
      }
    })

    const tablePagination = wrapper.find(BaseTablePagination)
    tablePagination.vm.$emit('nextPage')

    expect(wrapper.emitted().refresh).toBeTruthy()
    expect(wrapper.emitted().refresh[0]).toEqual([{
      action: 'nextPage',
      limit,
      offset: offset + limit,
      searchQuery: {},
      sortQuery: []
    }])
  })

  it('emits `rowUpdate` on submit of editable table cells', () => {
    const tableRow = wrapper.find(BaseTableRow)
    const updateOptions = {
      column: 'title',
      item: { title: 'Apple', votes: 1 },
      answer: 'Green Apple'
    }

    tableRow.vm.$emit('rowUpdate', updateOptions)

    expect(wrapper.emitted().rowUpdate).toBeTruthy()
    expect(wrapper.emitted().rowUpdate[0]).toEqual([ updateOptions, refreshOptions ])
  })

  it('calls `click` method passed via `props.actions` on applyAction', () => {
    const click = jest.fn()
    const action = { label: 'Click Me!', click }
    wrapper.setProps({
      actions: [ action ]
    })

    const tableActions = wrapper.find(BaseTableActions)
    tableActions.vm.$emit('applyAction', click)
    expect(click).toHaveBeenCalledWith([], refreshOptions)
  })
})
