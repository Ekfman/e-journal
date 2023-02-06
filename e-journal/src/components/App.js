import "./App.css";
// import { useState } from 'react';
import { useNavigate, Link, Routes, Route } from "react-router-dom";
import CreateEntry from "./CreateEntry";
import { useEffect, useState } from "react";
import AllEntries from "./AllEntries";
import CalendarView from "./CalendarView";


const stringifyCurrentDate = () => {
  let today = new Date();
  let day = `${today.getDate()}`;
  let month = `${today.getMonth() + 1}`;
  let year = `${today.getFullYear()}`;
  console.log("Month length:", month.length);
  if (day.length < 2) {
    day = "0" + day;
  }
  if (month.length < 2) {
    month = "0" + month;
  }

  let currentDateServer = `${year}-${month}-${day}`;
  let currentDateClient = `${day}/${month}/${year}`;

  let currentDateFormatted = {
    currentDateServer,
    currentDateClient,
  };
  return currentDateFormatted;
};


function App() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState({});
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [allEntries, setAllEntries] = useState([]);

  useEffect(() => {
    setCurrentDate(stringifyCurrentDate());
  }, []);
  console.log(currentDate);

  const newEntryHandler = () => {
    navigate("/newEntry");
  };

  return (
    <div className="app">
      <nav>
        <div className="dropdown">
          <Link to="/">Calendar</Link>
          <Link to="/entries">All Entries</Link>
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
      <>
        <button className="newEntryButton" onClick={newEntryHandler}>
          Create Entry
        </button>
      </>
      <Routes>
        <Route
          path="/"
          element={
            <CalendarView allEntries={allEntries} setDate={setDate} date={date} />
          }
        ></Route>
        <Route
          path="/newEntry"
          element={
            <CreateEntry
              currentDate={currentDate}
              date={date}
              setDate={setDate}
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
              stringifyCurrentDate={stringifyCurrentDate}
              setAllEntries={setAllEntries}
              allEntries={allEntries}
            />
          }
        ></Route>
        <Route
          path="/entries"
          element={
            <AllEntries setAllEntries={setAllEntries} allEntries={allEntries} />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
