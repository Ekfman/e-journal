import { useState } from "react";
import Entry from "./Entry";

const AllEntries = ({ allEntries, currentDate, darkMode }) => {
  const [searchValue, setSearchValue] = useState("")
  const entriesMatches = (entry) => {
    const textToCheck = (
      entry.title +
      entry.content
    ).toLowerCase();
    return textToCheck.includes(searchValue.toLowerCase());
  };
  const filteredEntries = allEntries.filter((post) => entriesMatches(post));

  return (
    <div className="allEntriesContainer">
      <input
          className={darkMode ? "searchBar-dark" : "searchBar"}
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="search for an entry"
        ></input>
      <div className="entriesContainer">
        {allEntries ? (
          filteredEntries.map((entry) => {
            return <Entry key={entry.id} entry={entry} currentDate={currentDate} darkMode={darkMode} />;
          })
        ) : (
          <div>You haven't written any entries yet!</div>
        )}
      </div>
    </div>
  );
};

export default AllEntries;
