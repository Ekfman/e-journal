import { useEffect } from "react";
import { callApi } from "../api/utils";
import Entry from "./Entry";

const AllEntries = ( {setAllEntries, allEntries}) => {
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

      
      return(
        <div>
            <div className="entriesContainer">
            {allEntries.map( (entry) => {
                return (
                    <Entry entry={entry} />
                )
            })}
            </div>
        </div>
      )
}

export default AllEntries;