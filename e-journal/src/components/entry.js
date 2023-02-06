import { useNavigate } from "react-router-dom"
import { callApi } from "../api/utils"


const Entry = ( { createEntry, setCreateEntry, currentDate, date, setDate, title, setTitle, content, setContent }) => {
    const navigate = useNavigate();
    const cancelHandler = () => {
        setCreateEntry( prev => !prev)
        navigate("/")
    }
    const onSubmit =  async (e) => {
        e.preventDefault();
        console.log('submitted');
        try {
            const result = await callApi({
                method: "POST",
                body: { eventDate: date, createDate: currentDate.currentDateServer, title, content },
                path: "/entries/create"
            })
            return result;
        } catch (error) {
            console.log(error);
        }
    }
    console.log(currentDate);
    console.log(currentDate.currentDateServer);

    return (
        <>
            <form className="form-container" onSubmit={onSubmit}>
                <input className="date" type="date" onChange={e => setDate(e.target.value)}/>
                <br></br>
                <input className="title" placeholder="Title" onChange={e => setTitle(e.target.value)}></input>
                <br></br>
                <textarea className="content" rows="5" cols="60" type="text" placeholder="What happened?! Tell me." onChange={e => setContent(e.target.value)}></textarea>
            </form>
            <button onClick={cancelHandler}>Cancel</button>
            <button type="submit">Submit Entry</button>
        </>
    )
}

export default Entry;