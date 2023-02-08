import { useNavigate } from "react-router-dom"
import { callApi } from "../api/utils"


const CreateEntry = ( { currentDate, date, setDate, title, setTitle, content, setContent, setAllEntries, allEntries }) => {
    const navigate = useNavigate();
    const cancelHandler = () => {
        setDate("")
        setTitle("")
        setContent("")
        navigate("/")
    }
    const onSubmit =  async (e) => {
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
            const newEntry = await callApi({
                method: "POST",
                body: { eventDate: date, createDate: currentDate.currentDateServer, title, content },
                path: "/entries/create"
            })

            console.log('result :>> ', newEntry);
            if(!allEntries){
                setAllEntries(newEntry)
            } else{
                setAllEntries(prev => [...prev, newEntry])
            }
            setDate("")
            setTitle("")
            setContent("")
            navigate('/')
            return allEntries;
        } catch (error) {
            console.log(error);
        }
    }
    console.log(allEntries);
    

//    const fillEntriesArr = async () => {
//        await setAllEntries(prev => [...prev])

   
   

   
    return (
        <div className="container">
        <div className="singleEntryContainer">
            <form className="form-container">
                <input className="date" type="date" value={date} onChange={e => setDate(e.target.value)}/>
                <br></br>
                <input className="title" placeholder="Title" onChange={e => setTitle(e.target.value)}></input>
                <br></br>
                <textarea className="createContent" rows="5" cols="60" type="text" placeholder="What happened?! Tell me." onChange={e => setContent(e.target.value)}></textarea>
            </form>
            <div className="cancelSubmitButtons">
            <button onClick={cancelHandler}>Cancel</button>
            <button onClick={onSubmit} type="submit">Submit Entry</button>
            </div>

        </div>

        </div>
    )
}

export default CreateEntry;