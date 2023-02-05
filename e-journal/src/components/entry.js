

const Entry = ( {navigate, createEntry, setCreateEntry }) => {
    const cancelHandler = () => {
        setCreateEntry( prev => !prev)
        navigate("/")
    }
    const onSubmit = (e) => {
        e.preventDefault();
        console.log('clicked ');
        const formData = new FormData(e.target)
        console.log('formData :>> ', formData);
    }

    return (
        <>
            <form className="form-container" onSubmit={onSubmit}>
                <input className="date" name="date" type="date"/>
                <br></br>
                <input className="title" name="title" placeholder="Title"></input>
                <br></br>
                <textarea className="content" name="content" rows="5" cols="60" type="text" placeholder="What happened?! Tell me."></textarea>
            </form>
            <button onClick={cancelHandler}>Cancel</button>
            <button type="submit">Submit Entry</button>
        </>
    )
}

export default Entry;