import './style.css'
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addReminder, editReminder } from '../actions/ReminderActions.js';

function AddReminder(props) {
  const [title, setTitle] = useState('');
  const [reminder, setReminder] = useState('');
  const [error, setError] = useState({
    titleError: '',
    reminderError: ''
  });

  useEffect(() => {
    setTitle(props.currentData.title)
    setReminder(props.currentData.reminderDateTime)
  }, [props.currentData])

  function handleValidation() {
    let isReminderValid = true
    let todayDate = new Date()
    let errorDict = {}

    if (!title) {
      isReminderValid = false
      errorDict['titleError'] = "This field is required"
    }

    if (!reminder) {
      isReminderValid = false
      errorDict['reminderError'] = "This field is required"
    }

    if ((reminder && [todayDate.getFullYear(), ("0" + (todayDate.getMonth() + 1)).slice(-2), ("0" + todayDate.getDate()).slice(-2)].join('-') > reminder.split('T')[0]) && (reminder.split('T')[1] < todayDate.toLocaleTimeString())) {
      isReminderValid = false
      errorDict['reminderError'] = "Cannot set reminder for past date and time"
    }

    setError(errorDict)
    return isReminderValid
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!handleValidation()) {
      alert("Invalid Reminder");
    }
    else {
      alert("Reminder added successfully");
      props.addReminder(title, reminder);
      setTitle('')
      setReminder('')
    }
  }

  return (
    <div className="reminder-container">
      <div className="row">
        <div className="col-sm-2">
          <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Enter Title" />
          <span className="error">{error.titleError}</span>
        </div>

        <div className="col-sm-2">
          <input type="datetime-local" onChange={(e) => setReminder(e.target.value)} value={reminder} />
          <span className="error">{error.reminderError}</span>
        </div>

        <div className="col-sm-2">
          <button onClick={handleSubmit}>Add Reminder</button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  currentData: state.Reminder.currentReminder
})

export default connect(
  mapStateToProps,
  { addReminder, editReminder }
)(AddReminder)