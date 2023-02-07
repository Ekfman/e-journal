import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { callApi } from "../api/utils";

const EntryById = () => {
   const [renderEntry, setRenderEntry] = useState({})
    const { id } = useParams();
    console.log(id);

    const createdDateDisplay = () => {
        const formatDate = new Date(`${renderEntry.createDate}`);
        let year = `${formatDate.getFullYear()}`;
        let month = `${formatDate.getMonth() + 1}`;
        let day = `${formatDate.getDate()}`;
        
        const displayDate = `${month}/${day}/${year}`;
        return displayDate
    }
     const createEventDateDisplay = () => {
         const formatDate = new Date(`${renderEntry.eventDate}`);
         let year = `${formatDate.getFullYear()}`;
         let month = `${formatDate.getMonth() + 1}`;
         let day = `${formatDate.getDate()}`;
         
         const displayDate = `${month}/${day}/${year}`;
        return displayDate;
     }
    const fetchEntryById = async () => {
        try {
            const result = await callApi({
                path:`/entries/${id}`
            })
            console.log(result);
            setRenderEntry(result)
            return result
        } catch (error) {
            console.log(error)
        }
    }

    useEffect( () => {
       fetchEntryById()
    },[])
    return(
        <div className="singleEntryContainer">
        <div className="entryContent">
        <h2 className="entryTitle">{renderEntry.title.toUpperCase()}</h2>
        <p>{createEventDateDisplay()}</p>
        <p>{renderEntry.content}</p>
        </div>
        <div className="buttons">
        <button>Back</button>
          <button>Edit</button>
          <button>Delete</button>
        </div>
        <p className="createDate">Created on {createdDateDisplay()}</p>
      </div>
    )
}

export default EntryById;