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


const CalendarView = ({ allEntries, date, setDate}) => {
    const navigate = useNavigate();

    const handleEntryClick = (entry) => {
      const entryId = entry.id
        navigate(`/entries/${entryId}`)
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
    console.log(allEntries);
    return(
      <div className="calendarView">
        <div className="calendar-container">
            <Calendar localizer={localizer}
              style={{ height: 500, margin: "50px" }}
              views={["month", "day"]}
              events={allEntries}
              startAccessor="start"
              endAccessor="end"
              selectable={true}
              onSelectEvent={handleEntryClick}
              onSelectSlot={handleSelectSlot}/>
        </div>
      </div>
    )
}

export default CalendarView;