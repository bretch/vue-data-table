<template>
  <th>
    <input :id="`base-table-filter-${name}`"
           v-model="input"
           class="form-control"
           :type="type"
           :placeholder="`Search ${name}`"
           @keyup.enter="search"
           @blur="blur"
    >
  </th>
</template>

<script>
export default {
  name: 'BaseTableColumnFilter',
  props: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    searchText: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      input: this.searchText
    }
  },
  methods: {
    search () {
      this.$emit('search', this.name, this.input)
    },
    blur () {
      if (this.searchText !== this.input) this.search()
    }
  }
}
</script>
