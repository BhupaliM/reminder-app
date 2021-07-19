import { configureStore } from "@reduxjs/toolkit";
import reminderReducer from './reducers/Reminder.js'

const store = configureStore({
  reducer: {
    reminder: reminderReducer,
  },
})

export default store;
