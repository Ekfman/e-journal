import { Calendar, dateFnsLocalizer } from "react-big-calendar";

import "react-big-calendar/lib/css/react-big-calendar.css";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { useNavigate } from "react-router-dom";

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

  const events = [
    {
      title: "New Dog",
      description: "Got a new puppy",
      content: "today I got a labradoodle. Her name is Sally",
      start: new Date("2023", "02", "03"),
      end: new Date("2023", "02", "03"),
    },
    {
      title: "Galentine's Day Drama",
      content: "It all started with periods",
      start: new Date("2023", "02", "01"),
      end: new Date("2023", "02", "01"),
    },
    {
      title: "Weird",
      content: "It all started with a kiss",
      start: "2023-02-04",
      end: "2023-02-04",
    },
  ];

const CalendarView = ({ allEntries, date, setDate}) => {
    const navigate = useNavigate();
    const handleEntryClick = () => {
        console.log("clicked!");
      };
    
      const handleSelectSlot = (date) => {
        let year = `${date.start.getFullYear()}`;
        let month = `${date.start.getMonth() + 1}`;
        let day = `${date.start.getDate()}`;
        if (day.length < 2) {
          day = "0" + day;
        }
        if (month.length < 2) {
          month = "0" + month;
        }
    
        let clickedDay = `${year}-${month}-${day}`;
        // let clickedDayFormatted = `${day}/${month}/${year}`
        console.log(clickedDay);
        let prompt = window.confirm(
          `Do you want to create an entry for ${month}/${day}/${year}`
        );
        if (prompt) {
          setDate(clickedDay);
          navigate("/newEntry");
        }
      };
    
    return(
        <div className="calendar-container">
            <Calendar localizer={localizer}
              style={{ height: 500, margin: "50px" }}
              views={["month", "day"]}
              events={events}
              startAccessor="start"
              endAccessor="end"
              selectable={true}
              onSelectEvent={handleEntryClick}
              onSelectSlot={handleSelectSlot}/>
        </div>
    )
}

export default CalendarView;