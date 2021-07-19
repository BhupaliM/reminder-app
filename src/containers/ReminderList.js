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

  function convertDateTime(dateTimeToConvert) {
    let date = new Date(dateTimeToConvert)
    let time = date.toLocaleTimeString().split(':')
    let amOrPm = time[0] < 12 ? 'AM' : 'PM'
    time[0] = time[0] % 12 || 12;

    return (date.toDateString() + ', ' + time.join(':') + ' ' + amOrPm)
  }

  function getReminders() {
    const currentState = store.getState()
    let todayDate = new Date()
    let pastReminders = []
    let upcomingReminders = []

    currentState.reminder.reminderListByID.forEach(data => {
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
      <div className="col-sm-6">
        <label className="reminders-label reminders-label-size">Past Reminders</label>
        {existingReminders.oldReminders.map((data, index) => {
          let userDate = convertDateTime(data.reminderDateTime)
          return <SingleReminder
            key={data.id}
            title={data.title}
            date={userDate}
            id={data.id}
          />
        })}
      </div>

      <div className="col-sm-6">
        <label className="reminders-label reminders-label-size">Up-Coming Reminders</label>
        {existingReminders.newReminders.map((data, index) => {
          let userDate = convertDateTime(data.reminderDateTime)
          return <SingleReminder
            key={data.id}
            title={data.title}
            date={userDate}
            id={data.id}
          />
        })}
      </div>
    </div>
  );
}

export default ReminderList
