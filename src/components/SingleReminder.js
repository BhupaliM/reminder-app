import { deleteReminder, editReminder } from '../reducers/Reminder.js';
import { connect } from 'react-redux';

function SingleReminder(props) {

  function onClick(e) {
    if (e.target.name === "delete") {
      props.deleteReminder(props.id)
    }
    else if (e.target.name === "update") {
      props.editReminder(props.id)
    }
  }

  return (
    <div>
      <br />
      <div className="row">
        <div className="col-sm-6">
          <label className="reminders-label reminders-heading-size">{props.title}</label>
        </div>
        <div className="col-sm-3">
          <button name="update" type="button" class="btn btn-outline-info btn-sm" onClick={onClick}>Edit</button>
        </div>
        <div className="col-sm-3">
          <button name="delete" type="button" class="btn btn-outline-danger btn-sm" onClick={onClick}>Delete</button>
        </div>
        <br />
        <div className="col-sm-7">
          <label className="reminders-label">{props.date}</label>
        </div>
      </div>
    </div>
  )
}

export default connect(
  null,
  { deleteReminder, editReminder }
)(SingleReminder)
