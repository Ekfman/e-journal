import { useNavigate, Link } from "react-router-dom";

const Entry = ({ entry, currentDate, darkMode }) => {
  const navigate = useNavigate();

  const createEventDateDisplay = () => {
    const formatDate = new Date(`${entry.eventDate}`);
    let year = `${formatDate.getFullYear()}`;
    let month = `${formatDate.getMonth() + 1}`;
    let day = `${formatDate.getDate()}`;

    const displayDate = `${month}/${day}/${year}`;
    return displayDate;
  };

  const handleReadMore = ({ id }) => {
    navigate(`entry/${id}`);
  };

  return (
    <div className={darkMode ? "singleEntryContainer-dark": "singleEntryContainer"}>
      <div className={darkMode ? "entryContent-dark" : "entryContent"}>
        <h2 className={darkMode? "entryTitle-dark" : "entryTitle"}>{entry.title}</h2>
        <p>{createEventDateDisplay()}</p>
        <p>{entry.content}</p>
      </div>
      <div className="readMoreButton">
        <button onClick={() => handleReadMore({ id: entry.id })}><Link className={darkMode ? "read-more-btn-dark" : "read-more-btn"} to={`/entries/entry/${entry.id}`}>Read More</Link></button>
      </div>
      <p className={darkMode ? "createDate-dark" : "createDate"}>Created on {currentDate.currentDateClient}</p>
    </div>
  );
};

export default Entry;
