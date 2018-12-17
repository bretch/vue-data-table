<template>
  <td :class="column.columnClass">
    <div v-if="column.editable" class="d-flex">
      <textarea v-if="edit"
                v-model="input"
                autofocus
                :placeholder="column.name"
                class="form-control flex-fill"
                rows="2"
                @keyup.enter="cellUpdate"
      />
      <p v-else class="flex-fill">
        {{ value }}
      </p>
      <div class="ml-1">
        <button ref="btn" class="btn btn-outline-secondary btn-sm float-right" @click="toggleEdit">
          <i class="fas fa-pencil-alt" />
        </button>
      </div>
    </div>
    <template v-else>
      {{ value }}
    </template>
  </td>
</template>

<script>
export default {
  name: 'BaseTableRowCell',
  props: {
    column: {
      type: Object,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return { edit: false, input: this.item[this.column.name] }
  },
  computed: {
    value () {
      return this.item[this.column.name]
    }
  },
  watch: {
    'item' (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.input = this.item[this.column.name]
      }
    }
  },
  methods: {
    toggleEdit () {
      this.edit = !this.edit
    },
    cellUpdate () {
      this.edit = false
      const btn = this.$refs.btn.classList
      btn.remove('btn-outline-secondary')
      btn.add('btn-success')
      setTimeout(() => {
        btn.remove('btn-success')
        btn.add('btn-outline-secondary')
      }, 600)

      this.$emit('cellUpdate', {
        column: this.column,
        item: this.item,
        answer: this.input
      })
    }
  }
}
</script>
