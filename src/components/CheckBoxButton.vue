<template>
  <button class="btn btn-sm" :class="buttonClass" @click="click">
    <i class="fas fa-check" />
  </button>
</template>

<script>
export default {
  name: 'CheckBoxButton',
  props: {
    checked: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    buttonClass () {
      return this.checked ? 'btn-info' : 'btn-outline-info'
    }
  },
  methods: {
    click () {
      this.$emit(this.checked ? 'deselect' : 'select')
    }
  }
}
</script>
