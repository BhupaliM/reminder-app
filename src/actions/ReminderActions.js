import { ADD_REMINDER, DELETE_REMINDER, EDIT_REMINDER } from '../constants/actionTypes.js';

let nextID = 0

export const addReminder = (title, reminder) => ({
  type: ADD_REMINDER,
  payload: {
    id: ++nextID,
    title: title,
    reminderDateTime: reminder
  }
})

export const deleteReminder = id => ({
  type: DELETE_REMINDER,
  payload: id
});

export const editReminder = id => ({
  type: EDIT_REMINDER,
  payload: id
})
