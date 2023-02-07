import "./App.css";
// import { useState } from 'react';
import { Link, Routes, Route } from "react-router-dom";
import CreateEntry from "./CreateEntry";
import { useEffect, useState } from "react";
import AllEntries from "./AllEntries";
import CalendarView from "./CalendarView";
import { callApi } from "../api/utils";
import EntryById from "./EntryById";


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
  const [currentDate, setCurrentDate] = useState({});
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [allEntries, setAllEntries] = useState([]);

  const getAllEntries = async () => {
    try {
      let entries = await callApi({
        path: "/entries"
      })
      entries.map( entry => {  
        entry.start = entry.eventDate
        entry.end = entry.eventDate
        return entry;
        } )
        console.log("api response:", entries);
        setAllEntries(entries)
        console.log("allEntries arr:", allEntries);
      return entries;
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(  () => {
    getAllEntries()
  },[]);
  useEffect(() => {
    setCurrentDate(stringifyCurrentDate());
  }, []);
  console.log(currentDate);

  return (
    <div className="app">
      <nav className="navbarContainer">
        <div className="logoContainer">
        <h1 className="logo">CONFIDANT</h1>
        </div>
        <ul className="navbar">
          <li>
          <Link className="navbarLinks" to="/">Calendar</Link>
            </li>
            <li>
              <Link className="navbarLinks" to="/newEntry">Create Entry</Link>
            </li>
            <li>
          <Link className="navbarLinks" to="/entries">All Entries</Link>
            </li>
            {/* <li>
          <button className="dropbtn">
            Customize
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
            <button>Dreamy</button>
            <button>Sleek</button>
            <button>Clean</button>
          </div>

            </li> */}
        </ul>
      </nav>
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
        <Route path="/entries/entry/:id" element={<EntryById />}></Route>
      </Routes>
    </div>
  );
}

export default App;
