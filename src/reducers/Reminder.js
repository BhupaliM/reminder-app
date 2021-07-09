import { ADD_REMINDER, DELETE_REMINDER, EDIT_REMINDER } from '../constants/actionTypes.js';

const initialState = {
  reminderListByID: [],
  currentReminder: {}
}

const Reminder = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REMINDER: {
      const { id, title, reminderDateTime } = action.payload;
      return {
        ...state,
        reminderListByID: [
          ...state.reminderListByID,
          {
            id: id,
            title: title,
            reminderDateTime: reminderDateTime
          }
        ],
        currentReminder: {
          title: '',
          reminderDateTime: ''
        }
      }
    }

    case DELETE_REMINDER: {
      return {
        ...state,
        reminderListByID: state.reminderListByID.filter((eachReminder) => eachReminder.id !== action.payload)
      }
    }

    case EDIT_REMINDER: {
      return {
        ...state,
        currentReminder: state.reminderListByID.filter((eachReminder) => eachReminder.id === action.payload)[0],
        reminderListByID: state.reminderListByID.filter((eachReminder) => eachReminder.id !== action.payload)
      }
    }

    default:
      return state
  }
}

export default Reminder
