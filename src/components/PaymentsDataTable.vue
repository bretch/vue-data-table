<template>
  <BaseTable
    :columns="columns"
    :items="items"
    :count="count"
    :options="options"
    :actions="actions"
    @refresh="refresh"
    @rowUpdate="rowUpdate"
  />
</template>

<script>
import { mapActions } from 'vuex'
import BaseTable from './BaseTable.vue'

export default {
  name: 'PaymentsDataTable',
  components: {
    BaseTable
  },
  data () {
    return {
      columns: [
        { name: 'ID', label: 'ID' },
        { name: 'Name', label: 'Name' },
        { name: 'Description', label: 'Description', editable: true, columnClass: 'w-25' },
        { name: 'Date', label: 'Date' },
        { name: 'Amount', label: 'Amount', type: 'number' }
      ],
      items: [],
      count: 0,
      options: {
        sortQuery: [{ column: 'Date', sortType: 'desc' }]
      },
      actions: [
        { label: 'Delete Record(s)', click: this.deleteItems, btnClass: 'btn-danger' }
      ]
    }
  },
  async mounted () {
    await this.refresh(this.options)
  },
  methods: {
    ...mapActions(['fetchPayments', 'updatePayment', 'deletePayments']),
    async refresh (options) {
      const { items, count } = await this.fetchPayments(options)
      this.items = items
      this.count = count
    },
    async rowUpdate (options, refreshOptions) {
      this.updatePayment(options)
      await this.refresh(refreshOptions)
    },
    async deleteItems (items, refreshOptions) {
      if (confirm('Are you sure to delete these items?')) {
        this.deletePayments(items.map(item => item.ID))
        await this.refresh(refreshOptions)
      }
    }
  }
}
</script>
