<template>
  <div class="row">
    <div class="table-responsive">
      <BaseTableActions v-if="selectable"
                        :actions="actions"
                        :has-selected="!selected.length"
                        @applyAction="applyAction"
      />
      <table class="table table-sm table-bordered table-hover">
        <thead>
          <tr>
            <th v-if="selectable" />
            <BaseTableColumnHeader v-for="column in columns"
                                   :key="column.name"
                                   :name="column.name"
                                   :label="column.label"
                                   :sort-type="getSortType(column.name)"
                                   @sort="sort"
            />
          </tr>
          <tr>
            <th v-if="selectable" class="text-center">
              <CheckBoxButton :disabled="!items.length"
                              :checked="items.length>0 && selected.length === items.length"
                              @select="applySelect"
                              @deselect="applySelect(false)"
              />
            </th>
            <BaseTableColumnFilter v-for="column in columns"
                                   :key="column.name"
                                   :name="column.name"
                                   :type="column.type"
                                   :search-text="searchQuery[column.name]"
                                   @search="search"
            />
          </tr>
        </thead>
        <tbody>
          <BaseTableRow v-for="(item, index) in items"
                        :key="index"
                        :item="item"
                        :columns="columns"
                        :selectable="selectable"
                        :selected="selected.includes(item)"
                        @select="select"
                        @deselect="deselect"
                        @rowUpdate="rowUpdate"
          >
            <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope">
              <slot :name="slot" v-bind="scope" />
            </template>
          </BaseTableRow>
        </tbody>
      </table>
    </div>
    <BaseTablePagination v-if="count > limit"
                         :limit="limit"
                         :offset="offset"
                         :count="count"
                         @prevPage="prevPage"
                         @nextPage="nextPage"
    />
    <p v-else>
      No results found.
    </p>
  </div>
</template>

<script>
import BaseTableColumnHeader from './BaseTableColumnHeader'
import BaseTableColumnFilter from './BaseTableColumnFilter'
import BaseTableRow from './BaseTableRow'
import BaseTableActions from './BaseTableActions'
import BaseTablePagination from './BaseTablePagination'
import CheckBoxButton from './CheckBoxButton'

export default {
  name: 'BaseTable',
  components: {
    BaseTableColumnHeader,
    BaseTableColumnFilter,
    BaseTableRow,
    BaseTableActions,
    BaseTablePagination,
    CheckBoxButton
  },
  props: {
    columns: {
      type: Array,
      required: true,
      validator: (value) => value.every(v => ({}).hasOwnProperty.call(v, 'name') && ({}).hasOwnProperty.call(v, 'label'))
    },
    items: {
      type: Array,
      required: true
    },
    count: {
      type: Number,
      required: true
    },
    options: {
      type: Object,
      default: () => ({
        limit: 10,
        offset: 0,
        searchQuery: {},
        sortQuery: []
      })
    },
    actions: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      limit: this.options.limit || 10,
      offset: this.options.offset || 0,
      searchQuery: this.options.searchQuery || {},
      sortQuery: this.options.sortQuery || [],
      selected: []
    }
  },
  computed: {
    selectable () {
      return this.actions !== null
    },
    refreshOptions () {
      return {
        limit: this.limit,
        offset: this.offset,
        sortQuery: this.sortQuery,
        searchQuery: this.searchQuery
      }
    }
  },
  methods: {
    getSortType (column) {
      const query = this.sortQuery.find(query => query.column === column)
      return query ? query.sortType : ''
    },
    refresh (action) {
      this.$emit('refresh', { action, ...this.refreshOptions })
      this.selected = []
    },
    /**
     * Remove existing sort condition for a column
     * to add as last item
     */
    sort (column, sortType) {
      if (this.sortQuery.find(query => query.column === column)) {
        this.sortQuery = this.sortQuery.filter(query => query.column !== column)
      }
      if (sortType) this.sortQuery = [ ...this.sortQuery, { column, sortType } ]
      this.refresh('sort')
    },
    search (column, searchText) {
      if (searchText) this.searchQuery = { ...this.searchQuery, [column]: searchText }
      else {
        const { [column]: field, ...searchQuery } = this.searchQuery
        this.searchQuery = searchQuery
      }
      this.offset = 0
      this.refresh('search')
    },
    nextPage () {
      this.offset = this.offset + this.limit
      this.refresh('nextPage')
    },
    prevPage () {
      this.offset = Math.max(this.offset - this.limit, 0)
      this.refresh('prevPage')
    },
    rowUpdate (updateOptions) {
      this.$emit('rowUpdate', updateOptions, this.refreshOptions)
      this.selected = []
    },
    select (item) {
      this.selected = [ ...this.selected, item ]
    },
    deselect (item) {
      this.selected = this.selected.filter(i => i !== item)
    },
    applySelect (selectAll = true) {
      if (selectAll) this.selected = [...this.items]
      else this.selected = []
    },
    applyAction (click) {
      click(this.selected, this.refreshOptions)
      this.selected = []
    }
  }
}
</script>
