import { createSlice } from "@reduxjs/toolkit"

function generateRandomKey() {
  // Use a combination of a timestamp and a random number to ensure uniqueness.
  // The timestamp makes the key unique across different function calls.
  // The random number handles cases where the function is called multiple times in the same millisecond.
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

const leadDataSlice = createSlice({
  name: "leads",
  initialState: {
    leads: [],
    page: 1,
    limit: 5,
    totalItems: null,
    totalPages: null,
    filtersApplied: false,
    stateKey: generateRandomKey(),
    timeZoneKey: generateRandomKey(),
    commodityKey: generateRandomKey(),
    statusKey: generateRandomKey(),
  },
  reducers: {
    setLeads: (state, action) => {
      state.leads = action.payload.leads
    },
    setPage: (state, action) => {
      state.page = action.payload.page
    },
    setTotalItems: (state, action) => {
      state.totalItems = action.payload.totalItems
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload.totalPages
    },
    setFiltersApplied: (state, action) => {
      state.filtersApplied = action.payload.filtersApplied
    },
    resetFilters: (state, action) => {
      state.stateKey = generateRandomKey()
      state.timeZoneKey = generateRandomKey()
      state.commodityKey = generateRandomKey()
      state.statusKey = generateRandomKey()
    },
  },
})

export default leadDataSlice
export const {
  setLeads,
  setPage,
  setTotalItems,
  setTotalPages,
  setFiltersApplied,
  resetFilters,
} = leadDataSlice.actions
