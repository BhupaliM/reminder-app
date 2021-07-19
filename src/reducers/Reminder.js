import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reminderListByID: [],
  currentReminder: {}
}

export const reminderSlice = createSlice({
  name: 'reminder',
  initialState,
  reducers: {
    addReminder: (state, action) => {
      state.reminderListByID.push(action.payload);
      state.currentReminder = {
        title: '',
        reminderDateTime: ''
      }
    },

    deleteReminder: (state, action) => {
      state.reminderListByID = state.reminderListByID.filter((eachReminder) => eachReminder.id !== action.payload)
    },

    editReminder: (state, action) => {
      state.currentReminder = state.reminderListByID.filter((eachReminder) => eachReminder.id === action.payload)[0]
      state.reminderListByID = state.reminderListByID.filter((eachReminder) => eachReminder.id !== action.payload)
    },
  }
})

export const { addReminder, deleteReminder, editReminder } = reminderSlice.actions

export default reminderSlice.reducer
