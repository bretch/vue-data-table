<template>
  <div id="app" class="container-fluid px-md-5 py-md-4 py-2">
    <PaymentsDataTable />
  </div>
</template>

<script>
import PaymentsDataTable from './components/PaymentsDataTable.vue'

export default {
  name: 'App',
  components: {
    PaymentsDataTable
  }
}
</script>
