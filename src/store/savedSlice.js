import { createSlice } from '@reduxjs/toolkit'

const loadFromLocalStorage = () => {
  try {
    const serialised = localStorage.getItem('savedItems')
    return serialised ? JSON.parse(serialised) : []
  } catch {
    return []
  }
}

const savedSlice = createSlice({
  name: 'saved',
  initialState: {
    items: loadFromLocalStorage(),
  },
  reducers: {
    addItem(state, action) {
      const exists = state.items.find(item => item.id === action.payload.id)
      if (!exists) {
        state.items.push(action.payload)
        localStorage.setItem('savedItems', JSON.stringify(state.items))
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload)
      localStorage.setItem('savedItems', JSON.stringify(state.items))
    },
  },
})

export const { addItem, removeItem } = savedSlice.actions
export default savedSlice.reducer
