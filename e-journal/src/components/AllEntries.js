import { useEffect } from "react";
import { callApi } from "../api/utils";
import Entry from "./Entry";

const AllEntries = ( {setAllEntries, allEntries}) => {
      
      return(
        <div>
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