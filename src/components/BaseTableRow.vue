<template>
  <tr :class="rowClass">
    <td v-if="selectable">
      <CheckBoxButton :checked="selected" @select="select" @deselect="deselect" />
    </td>
    <template v-for="column in columns">
      <td v-if="$scopedSlots && $scopedSlots[column.name]" :key="column.name">
        <slot :name="column.name" :item="item" />
      </td>
      <BaseTableRowCell v-else
                        :key="column.name"
                        :column="column"
                        :item="item"
                        @cellUpdate="cellUpdate"
      />
    </template>
  </tr>
</template>

<script>
import BaseTableRowCell from './BaseTableRowCell'
import CheckBoxButton from './CheckBoxButton'

export default {
  name: 'BaseTableRow',
  components: { BaseTableRowCell, CheckBoxButton },
  props: {
    columns: {
      type: Array,
      required: true
    },
    item: {
      type: Object,
      required: true
    },
    selectable: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({ rowClass: '' }),
  watch: {
    selected (value) {
      if (value) this.rowClass = 'table-info'
      else this.rowClass = ''
    }
  },
  methods: {
    cellUpdate (options) {
      this.$emit('rowUpdate', options)
      this.rowClass = 'table-success'
      setTimeout(() => {
        this.rowClass = ''
      }, 400)
    },
    select () {
      this.$emit('select', this.item)
    },
    deselect () {
      this.$emit('deselect', this.item)
    }
  }
}
</script>
