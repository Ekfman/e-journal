import "./App.css";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import CreateEntry from "./CreateEntry";
import { useEffect, useState } from "react";
import AllEntries from "./AllEntries";
import CalendarView from "./CalendarView";
import { callApi } from "../api/utils";
import EntryById from "./EntryById";
import Register from "./Register";
import Login from "./Login";

const stringifyCurrentDate = () => {
  let today = new Date();
  let day = `${today.getDate()}`;
  let month = `${today.getMonth() + 1}`;
  let year = `${today.getFullYear()}`;

  let currentDateServer = `${year}-${month}-${day}`;
  let currentDateClient = `${month}/${day}/${year}`;

  let currentDateFormatted = {
    currentDateServer,
    currentDateClient,
  };
  return currentDateFormatted;
};

function App() {
  const [currentDate, setCurrentDate] = useState({});
  const [eventDate, setEventDate] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [allEntries, setAllEntries] = useState([]);
  const navigate = useNavigate();

  const [token, setToken] = useState(
    window.localStorage.getItem("token") || ""
  );
  useEffect(() => {
    window.localStorage.setItem("token", token);
  }, [token]);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  
  const getAllEntriesByUser = async (token) => {
    try {
      let entries = await callApi({
        path: "/entries",
        token
      });
      entries.map((entry) => {
        entry.start = entry.eventDate;
        entry.end = entry.eventDate;
        return entry;
      });
      setAllEntries(entries);
      return entries;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllEntriesByUser(token);
  }, [token]);

  useEffect(() => {
    setCurrentDate(stringifyCurrentDate());
  }, []);

  const modeHandler = () => {
    setDarkMode( prev => !prev)
    console.log(darkMode);
  }
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload(false); //put in useEffect instead
  };

  return (
    <div className={darkMode ? "app-dark" : "app"}>
      <nav className={darkMode ? "navbarContainer-dark" : "navbarContainer"}>
        <div className="logoContainer">
          <h1 className="logo">
            CONFIDANT. <span className="jingle">a shoulder to type on</span>
          </h1>
        </div>
        <ul className="navbar">
          {!token ? (
            <>
              <li>
                <Link className="navbarLinks" to="/register">
                  Register
                </Link>
              </li>
              <li>
                <Link className="navbarLinks" to="/">
                  Login
                </Link>
              </li>
              <li className="navbarLinks" onClick={modeHandler}>
              {darkMode ? (
                <img className="mode-dark" alt="light mode" src={require("./assets/closed_eye.png")}></img>
              ) : (
                <img className="mode" alt="light mode" src={require("./assets/open_eye.png")}></img>
              )}
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className="navbarLinks" to="/calendar">
                  Calendar
                </Link>
              </li>
              <li>
                <Link className="navbarLinks" to="/newEntry">
                  Create Entry
                </Link>
              </li>
              <li>
                <Link className="navbarLinks" to="/entries">
                  All Entries
                </Link>
              </li>
              <li>
                <Link
                  className="navbarLinks"
                  to="/"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </li>
              <li className="navbarLinks" onClick={modeHandler}>
              {darkMode ? (
                <img className="mode-dark" alt="light mode" src={require("./assets/closed_eye.png")}></img>
              ) : (
                <img className="mode" alt="light mode" src={require("./assets/open_eye.png")}></img>
              )}
              </li>
            </>
          )}
        </ul>
      </nav>
      <Routes>
        <Route
          path="/calendar"
          element={<CalendarView allEntries={allEntries} setEventDate={setEventDate} darkMode={darkMode} />}
        ></Route>
        <Route
          path="/register"
          element={<Register setToken={setToken} darkMode={darkMode}/>}
        ></Route>
        <Route path="/" element={<Login setToken={setToken} darkMode={darkMode} />}></Route>
        <Route
          path="/newEntry"
          element={
            <CreateEntry
              currentDate={currentDate}
              eventDate={eventDate}
              setEventDate={setEventDate}
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
              setAllEntries={setAllEntries}
              allEntries={allEntries}
              token={token}
              darkMode={darkMode}
            />
          }
        ></Route>
        <Route
          path="/entries"
          element={<AllEntries allEntries={allEntries} currentDate={currentDate} darkMode={darkMode}/>}
        ></Route>
        <Route
          path="/entries/entry/:id"
          element={
            <EntryById allEntries={allEntries} currentDate={currentDate} darkMode={darkMode}/>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
