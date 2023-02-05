

const Entry = ( {navigate, createEntry, setCreateEntry }) => {
    const cancelHandler = () => {
        setCreateEntry( prev => !prev)
        navigate("/")
    }
    return (
        <>
            <form className="form-container">
                <input className="date" type="date"/>
                <br></br>
                <input className="title" placeholder="Title"></input>
                <input className="description" placeholder="Description"></input>
                <br></br>
                <textarea className="content" rows="5" cols="60" name="text" placeholder="What happened?! Tell me."></textarea>
            </form>
            <button onClick={cancelHandler}>Cancel</button>
            <button>Submit</button>
        </>
    )
}

export default Entry;