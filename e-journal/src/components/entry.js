import { useNavigate } from "react-router-dom"
import { callApi } from "../api/utils"


const Entry = ( { createEntry, setCreateEntry, currentDate, date, setDate, title, setTitle, content, setContent }) => {
    const navigate = useNavigate();
    const cancelHandler = () => {
        setCreateEntry( prev => !prev)
        setDate("")
        setTitle("")
        setContent("")
        navigate("/")
    }
    const onSubmit =  async (e) => {
        console.log("clicked");
        e.preventDefault();
        try {
            if(!date){
                window.alert("Please choose a date")
            }
            if(!title){
                window.alert("Don't forget to title this entry!")
            }
            if(!content){
                window.alert("Hey, your entry seems a bit empty...")
            }
            const result = await callApi({
                method: "POST",
                body: { eventDate: date, createDate: currentDate.currentDateServer, title, content },
                path: "/entries/create"
            })
            console.log('result :>> ', result);
            setDate("")
            setTitle("")
            setContent("")
            setCreateEntry(prev => !prev)
            navigate('/')
            return result;
        } catch (error) {
            console.log(error);
        }
    }
    console.log('date :>> ', date);
    return (
        <>
            <form className="form-container">
                <input className="date" type="date" value={date} onChange={e => setDate(e.target.value)}/>
                <br></br>
                <input className="title" placeholder="Title" onChange={e => setTitle(e.target.value)}></input>
                <br></br>
                <textarea className="content" rows="5" cols="60" type="text" placeholder="What happened?! Tell me." onChange={e => setContent(e.target.value)}></textarea>
            </form>
            <button onClick={cancelHandler}>Cancel</button>
            <button onClick={onSubmit} type="submit">Submit Entry</button>
        </>
    )
}

export default Entry;