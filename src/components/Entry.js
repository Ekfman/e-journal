import { useNavigate, Link } from "react-router-dom";

const Entry = ({ entry, currentDate }) => {
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
    <div className="singleEntryContainer">
      <div className="entryContent">
        <h2 className="entryTitle">{entry.title}</h2>
        <p>{createEventDateDisplay()}</p>
        <p>{entry.content}</p>
      </div>
      <div className="readMoreButton">
        <button onClick={() => handleReadMore({ id: entry.id })}><Link className="read-more-btn" to={`/entries/entry/${entry.id}`}>Read More</Link></button>
      </div>
      <p className="createDate">Created on {currentDate.currentDateClient}</p>
    </div>
  );
};

export default Entry;
