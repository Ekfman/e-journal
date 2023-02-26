import Entry from "./Entry";

const AllEntries = ({ allEntries, currentDate }) => {
  console.log('allEntries :>> ', allEntries);
  return (
    <div className="container">
      <div className="entriesContainer">
        {allEntries ? (
          allEntries.map((entry) => {
            return <Entry key={entry.id} entry={entry} currentDate={currentDate} />;
          })
        ) : (
          <div>You haven't written any entries yet!</div>
        )}
      </div>
    </div>
  );
};

export default AllEntries;
