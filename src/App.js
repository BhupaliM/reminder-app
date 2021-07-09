import './App.css';

import AddReminder from './containers/AddReminder.js'
import ReminderList from './containers/ReminderList.js';

function App() {
  return (
    <div className="App">
      <AddReminder />
      <ReminderList />
    </div>
  );
}

export default App;
