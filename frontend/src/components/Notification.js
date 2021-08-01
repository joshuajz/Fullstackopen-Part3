const Notification = ({message, colour}) => {
    if (message === null) {
        return null
    }
    console.log(message, colour)
    const style = {
        background: "lightgrey",
        color: colour,
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    return (
        <div style={style}>
            {message}
        </div>
    )
}

export default Notification
