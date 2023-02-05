

const Entry = ( {navigate, createEntry, setCreateEntry, date, setDate, title, setTitle, content, setContent }) => {
    const cancelHandler = () => {
        setCreateEntry( prev => !prev)
        navigate("/")
    }
    const onSubmit =  async (e) => {
        e.preventDefault();
        console.log('clicked ');
        const formData = new FormData(e.target)
        console.log('formData :>> ', formData);
        try {
            
        } catch (error) {
            
        }
    }
    console.log('title :>> ', title);
    console.log('date :>> ', date);

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