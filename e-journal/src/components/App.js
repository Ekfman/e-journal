import "./App.css";
// import { useState } from 'react';
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";
import Entry from "./Entry";
import { useState } from "react";
// import { MonthView } from 'react-calendar';
// import DatePicker from "react-datepicker";
// import settings from '/assets'

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const entries = [
  {
    title: "New Dog",
    description: "Got a new puppy",
    content: "today I got a labradoodle. Her name is Sally",
    start: new Date("2023", "02", "03"),
    end: new Date("2023", "02", "03"),
  },
];

function App() {
  const navigate = useNavigate();

  const [createEntry, setCreateEntry] = useState(false);
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const newEntryHandler = () => {
    navigate("/entry");
    setCreateEntry((prev) => !prev);
  };

  const handleEntryClick = () => {
    console.log("clicked!");
  };

  const handleSelectDate = () => {
    console.log("create a journal entry for today!");
  };
  return (
    <div className="app">
      <nav>
        <div className="dropdown">
          <button className="dropbtn">
            Customize
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
            <button>Dreamy</button>
            <button>Sleek</button>
            <button>Clean</button>
          </div>
        </div>
      </nav>
      {createEntry ? (
        <>
          <Entry
            navigate={navigate}
            createEntry={createEntry}
            setCreateEntry={setCreateEntry}
            date={date}
            setDate={setDate}
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
          />
        </>
      ) : (
        <>
          <button className="newEntryButton" onClick={newEntryHandler}>
            Create Entry
          </button>
          <div className="calendar-container">
            <center>
              <Calendar
                localizer={localizer}
                style={{ height: 500, margin: "50px" }}
                views={["month", "day"]}
                events={entries}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={handleEntryClick}
                onSelectSlot={handleSelectDate}
              />
            </center>
            <div className="text-center"></div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
