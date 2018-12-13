<template>
  <div class="d-flex w-100 justify-content-center">
    <button v-if="count > limit"
            type="button"
            :disabled="!hasPreviousPage"
            class="btn btn-sm btn btn-outline-secondary"
            data-test="btn-prev"
            @click="prev"
    >
      Previous Page
    </button>
    <p class="mx-2 my-auto text-center">
      Showing {{ from }}-{{ to }} out of {{ count }}
    </p>
    <button v-if="count > limit"
            :disabled="!hasNextPage"
            type="button"
            class="btn btn-sm btn btn-outline-secondary"
            data-test="btn-next"
            @click="next"
    >
      Next Page
    </button>
  </div>
</template>

<script>
export default {
  name: 'BaseTablePagination',
  props: {
    limit: {
      type: Number,
      required: true
    },
    offset: {
      type: Number,
      required: true
    },
    count: {
      type: Number,
      required: true
    }
  },
  computed: {
    from () {
      return this.offset + 1
    },
    to () {
      return Math.min(this.offset + this.limit, this.count)
    },
    hasPreviousPage () {
      return this.offset
    },
    hasNextPage () {
      return this.offset + this.limit < this.count
    }
  },
  methods: {
    prev () { this.$emit('prevPage') },
    next () { this.$emit('nextPage') }
  }
}
</script>
