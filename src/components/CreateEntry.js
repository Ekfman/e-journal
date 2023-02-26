import { useNavigate } from "react-router-dom";
import { callApi } from "../api/utils";

const CreateEntry = ({
  currentDate,
  eventDate,
  setEventDate,
  title,
  setTitle,
  content,
  setContent,
  setAllEntries,
  allEntries,
  token
}) => {
  const navigate = useNavigate();
  const cancelHandler = () => {
    setEventDate("");
    setTitle("");
    setContent("");
    navigate("/calendar");
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!eventDate) {
        window.alert("Please choose a date");
      }
      if (!title) {
        window.alert("Don't forget to title this entry!");
      }
      if (!content) {
        window.alert("Hey, your entry seems a bit empty, please add some details!");
      }
      if(eventDate && title && content){
        const newEntry = await callApi({
          method: "POST",
          body: {
            token,
            eventDate: eventDate,
            createDate: currentDate.currentDateServer,
            title,
            content,
          },
          path: "/entries/create",
        });
        if (!allEntries) {
          setAllEntries(newEntry);
        } else {
          setAllEntries((prev) => [...prev, newEntry]);
        }
        if (newEntry) {
          window.alert("Your entry has been added!");
          setEventDate("");
          setTitle("");
          setContent("");
          navigate("/calendar");
          window.location.reload(false);
        }
        return allEntries;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="singleEntryContainer">
        <form className="form-container">
          <input
            className="date"
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
          <br></br>
          <input
            className="title"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <br></br>
          <textarea
            className="createContent"
            rows="5"
            cols="60"
            type="text"
            placeholder="What happened?! Tell me."
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </form>
        <div className="cancelSubmitButtons">
          <button onClick={cancelHandler}>Cancel</button>
          <button onClick={onSubmit} type="submit">
            Submit Entry
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEntry;
