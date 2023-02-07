import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { callApi } from "../api/utils";

const EntryById = ({ setAllEntries, allEntries }) => {
  const [renderEntry, setRenderEntry] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const createdDateDisplay = () => {
    const formatDate = new Date(`${renderEntry.createDate}`);
    let year = `${formatDate.getFullYear()}`;
    let month = `${formatDate.getMonth() + 1}`;
    let day = `${formatDate.getDate()}`;

    const displayDate = `${month}/${day}/${year}`;
    return displayDate;
  };
  const createEventDateDisplay = () => {
    const formatDate = new Date(`${renderEntry.eventDate}`);
    let year = `${formatDate.getFullYear()}`;
    let month = `${formatDate.getMonth() + 1}`;
    let day = `${formatDate.getDate()}`;

    const displayDate = `${month}/${day}/${year}`;
    return displayDate;
  };
  const fetchEntryById = async () => {
    try {
      const result = await callApi({
        path: `/entries/${id}`,
      });
      console.log(result);
      setRenderEntry(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEntryById();
  }, []);

  const deleteHandler = async ({ id }) => {
    console.log(id);
    let prompt = window.confirm(
      "Are you sure you want to delete this entry? This cannot be undone."
    );
    if (prompt) {
      try {
        const result = await callApi({
          method: "DELETE",
          path: `/entries/${id}`,
        });
        console.log("deletedEntry :>> ", result);
        setAllEntries((prev) => prev.filter((e) => e.id !== id));
        navigate("/entries");
        if(result) window.alert("You entry has been successfully deleted.")
        window.location.reload(false);
        return allEntries;
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log("allEntries :>> ", allEntries);

  return (
    <div className="container">
      <div className="singleEntryContainer">
        <div className="allEntryContent">
          <h2 className="entryTitle">{renderEntry.title}</h2>
          <p>{createEventDateDisplay()}</p>
          <p>{renderEntry.content}</p>
        </div>
        <div className="buttons">
          <button onClick={() => navigate("/entries")}>View All Entries</button>
          <div className="editDeleteBut">
            <button>Edit</button>
            <button onClick={() => deleteHandler({ id })}>Delete</button>
          </div>
        </div>
        <p className="createDate">Created on {createdDateDisplay()}</p>
      </div>
    </div>
  );
};

export default EntryById;
