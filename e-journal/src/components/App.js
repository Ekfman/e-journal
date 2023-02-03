import './App.css';
// import 'react-calendar/dist/Calendar.css'
import { useState } from 'react';
import Calendar from 'react-calendar';
// import settings from '/assets'

function App() {
  const [date, setDate] = useState(new Date())
 
 return (
  <div className="app">
    <nav>
      <ul>Settings
      <li>Sleek</li>
      <li>Dreamy</li>
      <li>Clean</li>
      </ul>
    </nav>

    <div className="calendar-container">
    <button className='newEntryButton'>Create Entry</button>
      <center><Calendar onChange={setDate} value={date}/></center>
    <div className="text-center">
       Selected date: {date.toDateString()}
    </div>
    </div>
  </div>
   )
 
 }

export default App;
