
const Entry = ({ entry }) => {
    const createdDateDisplay = () => {
        console.log('createDate :>> ', entry.createDate);
        const formatDate = new Date(`${entry.createDate}`);
        let year = `${formatDate.getFullYear()}`;
        let month = `${formatDate.getMonth() + 1}`;
        let day = `${formatDate.getDate()}`;
        
        const displayDate = `${month}/${day}/${year}`;
        return displayDate
    }
  
        console.log('eventDate :>> ', entry.eventDate);
        const formatDate = new Date(`${entry.eventDate}`);
        console.log(formatDate);
        let year = `${formatDate.getFullYear()}`;
        let month = `${formatDate.getMonth() + 1}`;
        let day = `${formatDate.getDate()}`;
        
        const displayDate = `${month}/${day}/${year}`;


  return (
    <div className="singleEntryContainer">
      <div className="entryContent">
      <h2 className="entryTitle">{entry.title.toUpperCase()}</h2>
      <p>{displayDate}</p>
      <p>{entry.content}</p>
      </div>
      <div className="buttons">
      <button>Read more</button>
      </div>
      <p className="createDate">Created on {createdDateDisplay()}</p>
    </div>
  );
};

export default Entry;
