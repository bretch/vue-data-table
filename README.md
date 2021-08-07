# VueDataTable
This is a demo project for creating a data table component for displaying a list of payments

> **Problem**: Create a feature rich data table component that supports sorting, filter, bulk actions. Component must be responsive acrross resolutions

> **User Stories** 
As a payment supervisor, I would like to be able to view recent payments logged in the system, so that I can understand all the transactions that have been made. 
As a payment supervisor, I would like to be able to edit the descriptions of recent payments easily, so that others can clearly understand why a payment was made.

##### Approach 
- Create a base component responsible for rendering table data (See [BaseTable](#basetable))
- Create a wrapper component responsible for passing data to BaseTable and for handling it's events. This component handles action dispatches when BaseTable needs a refresh with sorting, searching, and pagination changes. See [PaymentsDataTable](https://github.com/jazelbretch/vue-data-table/blob/master/src/components/PaymentsDataTable.vue)
- Use Vuex for accessing and storing local data. Sorting and filtering of data are handled in the store actions
- Deploy via GitHub Pages

##### Demo
[Payments Record sorted by Date](https://bretch.github.io/vue-data-table/)
 
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```
# BaseTable
Supports sorting, filtering, pagination, editable field, and bulk actions

### Usage

```js
import BaseTable from './components/BaseTable.vue'

<BaseTable :items="items"
           :columns="columns"
           count="items.length"
           @refresh="refresh"/>
```
Use `named-slots` to customize data cell per column by passing the column name to `slot`
```js
// Render data cell under 'Name' column as buttons
<BaseTable :items="items"
           :columns="columns"
           count="items.length"
           @refresh="refresh"
>
  <template slot="Name" slot-scope="{ item }" @click="doSomething">
    <button class="btn btn-sm">
      <i class="fas fa-check" /> {{ item.Name }}
    </button>
  </template>
</BaseTable>           
```

#### Props

| Prop        | Required  | Type  |  Description  
| ------------- |:-------------:| -----:| --------|
|`columns`      | `true` | Array | list of columns to display
|`items`      | `true` | Array | record data to display (subset of total data)
|`count`      | `true` | Number | count of total data, used in pagination
|`options`      | `false` | Object | additional config for BaseTable used on initial mount
|`actions`      | `false` | Array | bulk actions config

##### columns
cofiguration per column
 - `name` - required
 - `label` - required
 - `editable` - renders column data to be editable
 - `columnClass`
```js
  columns: [
    { name: 'ID', label: 'ID' },
    { name: 'Name', label: 'Name' },
    { name: 'Description', label: 'Description', editable: true, columnClass: 'w-25' },
    { name: 'Date', label: 'Date' },
    { name: 'Amount', label: 'Amount', type: 'number' }
  ]
```

##### options
 - `limit` - defaults to `10`
 - `offset` - defaults to `0`
 - `sortQuery` - list of sorting conditions
 - `searchQuery` - search conditions
```js
sortQuery: [{
    "column": "Date",
    "sortType": "desc"
}, {
    "column": "Name",
    "sortType": "desc"
}]

searchQuery: {
    Name: 'Loona'
}
```
##### actions
`actions` are rendered as buttons with each action configurable with:
 - `label`
 - `click` - receives list of `selected` items from BaseTable
 - `btnClass`
```js
actions: [
    { label: 'Delete Record(s)', click: this.deleteItems, btnClass: 'btn-danger' },
    { label: 'Say hello in spanish', click: () => { alert('hola!')} },
]

// in wrapper component methods
deleteItems (selectedItems, refreshOptions) {
    // dispatch action call or fetch api call here
}
```

#### Events

| Event        | Arguments |  Description
| ------------- |:-------------:| ----------|
|`refresh`      | `refreshOptions` | Emitted when the component needs to update `items` data after sorting, filtering, and pagination are triggered. 
|`rowUpdate`      | `updateOptions`,  `refreshOptions` | Emitted when a row data is updated

##### refreshOptions
- `action` - action performed that triggered a table refresh. Supported values (`sort`, `search`, `prevPage`, `nextPage`)
- `limit`
- `offset`
- `sortQuery`
- `searchQuery`

```js
// emmitted after sorting by 'Name' column
refreshOptions: {
    action: 'sort',
    limit: 10,
    offset: 0,
    sortQuery: [{ column: 'Name', sortType: 'desc' }],
    searchQuery: {}
}
```
##### updateOptions
- `column` - column to update
- `item` - original row data 
- `answer`
```js
// passed to `rowUpdate` when updating column `Description`
updateOptions: {
    "column": {
        "name": "Description",
        "label": "Description",
        "editable": true
    },
    "item": {
        "ID": "8E6F38E1-5DC7-5030-4513-8FBB237EF5DB",
        "Name": "Barclay Sears",
        "Description": "sit amet ultricies sem magna",
        "Date": "2019-10-28T04:57:29-07:00",
        "Amount": 116.36
    },
    "answer": "stan loona"
}
```
----
🙋 Would you do anything differently if you had more time?
>I would add a way to pass a data provider method `fetch` to the table component. To keep `BaseTable` as a dumb component (and easier to test!), I would implement a component `DataTable` as a wrapper component to `BaseTable` component where we can pass the `fetch` property.

🙋 In what ways would you adapt your component so that it could be used in many different scenarios where a data table is required?
 >Add ways to customize headers and filter via `named slots`.

🙋 What is one CSS property that you recently learned about that helped you solve a problem?
 > flex


Time spent on project: [☕](https://www.youtube.com/watch?v=nxOqHwhWmy4)[☕](https://www.youtube.com/watch?v=6a4BWpBJppI) [☕](https://www.youtube.com/watch?v=B9fXtJswxno)
