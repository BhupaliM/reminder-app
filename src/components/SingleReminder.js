import { deleteReminder, editReminder } from '../actions/ReminderActions.js';
import { connect } from 'react-redux';

function SingleReminder(props) {

  function onClick(e) {
    if (e.target.name === "delete") {
      props.deleteReminder(props.reminderData.id)
    }
    else if (e.target.name === "update") {
      props.editReminder(props.reminderData.id)
    }
  }

  return (
    <tr>
      <td>{props.reminderData.title}</td>
      <td>{props.reminderData.reminderDateTime}</td>
      <td><button name="delete" onClick={onClick}>Delete</button></td>
      <td>{props.name === "upcomingReminder" ? <button name="update" onClick={onClick}>Update</button> : ""}</td>
    </tr>
  )
}

export default connect(
  null,
  { deleteReminder, editReminder }
)(SingleReminder)