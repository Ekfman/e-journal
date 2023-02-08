import Entry from "./Entry";

const AllEntries = ( {getAllEntries, setAllEntries, allEntries}) => {
      
      return(
        <div className="container">
            <div className="entriesContainer">
                {allEntries ? (
                    allEntries.map( (entry) => {
                        return (
                            <Entry key={entry.id} entry={entry} />
                        )
                    })
                ) : (
                    <div>
                        You haven't written any entries yet!
                    </div>
                ) }
            </div>
        </div>
      )
}

export default AllEntries;