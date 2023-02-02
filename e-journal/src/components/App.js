import './App.css';
import 'react-calendar/dist/Calendar.css'
import { useState } from 'react';
import Calendar from 'react-calendar';

function App() {
  const [date, setDate] = useState(new Date())
 
 return (
  <div className="app">
    <h1 className="header">The month at a glance</h1>
    <div className="calendar-container">
      <Calendar onChange={setDate} value={date}/>
    </div>
    <div className="text-center">
       Selected date: {date.toDateString()}
    </div>
  </div>
   )
 
 }

export default App;
