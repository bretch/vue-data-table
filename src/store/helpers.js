const applyFilter = (items, searchQuery) => {
  items = items.filter(item => {
    let allow = true
    Object.entries(searchQuery).forEach(([column, searchText]) => {
      if (searchText) {
        if (typeof item[column] === 'string') {
          allow = allow && item[column].match(new RegExp(searchText, 'gi'))
        } else if (typeof item[column] === 'number') {
          allow = allow && Number(item[column]) === Number(searchText)
        }
      }
    })
    return allow
  })
  return items
}

const sortAsc = (a, b) => a < b ? -1 : (a > b ? 1 : 0)
const sortDesc = (a, b) => a < b ? 1 : (a > b ? -1 : 0)

const applySort = (items, sortQuery) => {
  items = items.sort((a, b) => {
    let sortResult = 0
    sortQuery.every(({ column, sortType }) => {
      let sortFn = sortType === 'asc' ? sortAsc : sortDesc

      if (typeof a[column] === 'string') {
        sortResult = sortFn(a[column].toUpperCase(), b[column].toUpperCase())
      } else {
        sortResult = sortFn(a[column], b[column])
      }
      if (sortResult !== 0) return false
      return true
    })
    return sortResult
  })

  return items
}

export { applyFilter, applySort }
