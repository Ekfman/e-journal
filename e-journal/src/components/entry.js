// import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// import EntryById from "./EntryById";

const Entry = ({ entry }) => {
    const navigate = useNavigate();

    const createdDateDisplay = () => {
        const formatDate = new Date(`${entry.createDate}`);
        let year = `${formatDate.getFullYear()}`;
        let month = `${formatDate.getMonth() + 1}`;
        let day = `${formatDate.getDate()}`;
        
        const displayDate = `${month}/${day}/${year}`;
        return displayDate
    }
     const createEventDateDisplay = () => {
         const formatDate = new Date(`${entry.eventDate}`);
         let year = `${formatDate.getFullYear()}`;
         let month = `${formatDate.getMonth() + 1}`;
         let day = `${formatDate.getDate()}`;
         
         const displayDate = `${month}/${day}/${year}`;
        return displayDate;
     }

     const handleReadMore = ( { id }) => {
        console.log(id);
        navigate(`entry/${id}`)
     }

  return (
    <div className="singleEntryContainer">
      <div className="entryContent">
      <h2 className="entryTitle">{entry.title.toUpperCase()}</h2>
      <p>{createEventDateDisplay()}</p>
      <p>{entry.content}</p>
      </div>
      <div className="buttons">
        <button onClick={ () => handleReadMore( { id: entry.id})}>Read More</button>
      </div>
      <p className="createDate">Created on {createdDateDisplay()}</p>
    </div>
  );
};

export default Entry;
