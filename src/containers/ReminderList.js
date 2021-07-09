import './style.css';
import React, { useEffect, useState } from "react";
import SingleReminder from '../components/SingleReminder.js';
import store from '../store.js';

function ReminderList(props) {
  const [existingReminders, setExistingReminders] = useState({
    oldReminders: [],
    newReminders: []
  })

  useEffect(() => {
    const interval = setInterval(() => {
      getReminders()
    }, 2000)

    return () => clearInterval(interval)

  }, [])

  function getReminders() {
    const currentState = store.getState()
    let todayDate = new Date()
    let pastReminders = []
    let upcomingReminders = []

    currentState.Reminder.reminderListByID.forEach(data => {
      if ((data.reminderDateTime.split('T')[1] < todayDate.toLocaleTimeString()) && ([todayDate.getFullYear(), ("0" + (todayDate.getMonth() + 1)).slice(-2), ("0" + todayDate.getDate()).slice(-2)].join('-') >= data.reminderDateTime.split('T')[0])) {
        pastReminders.push(data)
      }
      else {
        upcomingReminders.push(data)
      }
    })

    setExistingReminders({
      oldReminders: pastReminders,
      newReminders: upcomingReminders
    });
  }

  return (
    <div className="row">
      <div className="col-sm-4">
        Past Reminders
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date-Time</th>
            </tr>
          </thead>
          <tbody>
            {existingReminders.oldReminders.map((data, index) => (
              <SingleReminder
                key={data.id}
                reminderData={data}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="col-sm-4">
        Up-coming Reminders
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date-Time</th>
            </tr>
          </thead>
          <tbody>
            {existingReminders.newReminders.map((data, index) => (
              <SingleReminder
                key={data.id}
                reminderData={data}
                name="upcomingReminder"
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReminderList