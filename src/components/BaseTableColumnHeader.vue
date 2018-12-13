<template>
  <th scope="col" @click="sort">
    {{ label }} <i v-if="sortType" :class="sortType === 'asc'? 'fa-arrow-up': 'fa-arrow-down'" class="fas fa-xs" />
  </th>
</template>

<script>
export default {
  name: 'BaseTableColumnHeader',
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    sortType: {
      type: String,
      default: ''
    }
  },
  methods: {
    sort () {
      let sortType = ''
      if (!this.sortType) sortType = 'asc'
      if (this.sortType === 'asc') sortType = 'desc'
      this.$emit('sort', this.name, sortType)
    }
  }
}
</script>
