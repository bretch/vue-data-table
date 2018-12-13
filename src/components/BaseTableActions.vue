<template>
  <div class="mb-2">
    <button v-for="action in actions"
            :key="action.label"
            class="btn btn-secondary mx-1"
            :class="action.btnClass"
            :disabled="hasSelected"
            @click="buttonClick(action.click)"
    >
      {{ action.label }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'BaseTableActions',
  props: {
    actions: {
      type: Array,
      required: true
    },
    hasSelected: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    buttonClick (click) {
      if (typeof click === 'function') { this.$emit('applyAction', click) }
    }
  }
}
</script>
