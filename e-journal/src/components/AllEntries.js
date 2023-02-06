import { useEffect } from "react";
import { callApi } from "../api/utils";

const AllEntries = ( {setAllEntries, allEntries}) => {
    const getAllEntries = async () => {
        try {
          let entries = await callApi({
            path: "/entries"
          })
          entries.map( entry => {  
            entry.start = entry.createDate
            entry.end = entry.createDate
            return entry;
            } )
          console.log(entries);
          return entries;
        } catch (error) {
          console.log(error)
        }
      };
    
      useEffect( () => {
        setAllEntries(getAllEntries())
      },[]);

      console.log('allEntries :>> ', allEntries);
      
      return(
        <div>
            <h2>All your fine work!</h2>
        </div>
      )
}

export default AllEntries;