import './App.css';
import 'react-calendar/dist/Calendar.css'
import { useState } from 'react';
import Calendar from 'react-calendar';
// import settingsIcon from '../assets/settingsIcon.png'

function App() {
  const [date, setDate] = useState(new Date())
 
 return (
  <div className="app">
    <nav>
      {/* <img alt="settings" src={settingsIcon}></img> */}
    </nav>
    <div className="calendar-container">
      <center><Calendar onChange={setDate} value={date}/></center>
    </div>
    <div className="text-center">
       Selected date: {date.toDateString()}
    </div>
  </div>
   )
 
 }

export default App;
