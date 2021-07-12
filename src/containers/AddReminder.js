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
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Title</span>
        </div>
        <div><input type="text" class="form-control" onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Enter Title" /></div>
        <div className="col-sm-3">
          <span className="help-block error">{error.titleError}</span>
        </div>
      </div>

      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span class="input-group-text">DateTime</span>
        </div>
        <div><input type="datetime-local" class="form-control" onChange={(e) => setReminder(e.target.value)} value={reminder} /></div>
        <div className="col-sm-5">
          <span className="help-block error">{error.reminderError}</span>
        </div>
      </div>

      <button type="button" class="btn btn-success" onClick={handleSubmit}>Add Reminder</button>
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
