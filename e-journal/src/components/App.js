import './App.css';
// import { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import "react-big-calendar/lib/css/react-big-calendar.css";
// import DatePicker from "react-datepicker";
// import settings from '/assets'

const locales = {
  "en-US": require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

function App() {
 
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
      <center><Calendar localizer={localizer} style={{height: 500, margin: "50px"}}/></center>
    <div className="text-center">
    </div>
    </div>
  </div>
   )
 
 }

export default App;
