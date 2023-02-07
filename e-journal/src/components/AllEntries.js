import { useEffect } from "react";
import Entry from "./Entry";

const AllEntries = ( {getAllEntries, setAllEntries, allEntries}) => {
      
      return(
        <div className="container">
            <div className="entriesContainer">
            {allEntries.map( (entry) => {
                return (
                    <Entry key={entry.id} entry={entry} />
                )
            })}
            </div>
        </div>
      )
}

export default AllEntries;