import './App.css';

import AddReminder from './containers/AddReminder.js'
import ReminderList from './containers/ReminderList.js';

function App() {
  return (
    <div className="container-fluid">
      <h4 className="reminder-container reminders-label">Reminder System</h4>
      <br />
      <div className="row">
        <div className="col-sm-6">
          <AddReminder />
        </div>
        <div className="col-sm-6">
          <ReminderList />
        </div>
      </div>
    </div>
  );
}

export default App;
