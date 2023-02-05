

const Entry = ( {navigate, createEntry, setCreateEntry }) => {
    const cancelHandler = () => {
        setCreateEntry( prev => !prev)
        navigate("/")
    }
    return (
        <>
            <form>
                <input placeholder="YYYY-MM-DD"/>
                <input placeholder="Title"></input>
                <input placeholder="Descrpition"></input>
                <input placeholder="Get all your thought out here."></input>
            </form>
            <button onClick={cancelHandler}>Cancel</button>
        </>
    )
}

export default Entry;