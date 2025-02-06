export default function Dice(props) {
    let style = {
        backgroundColor: props.isHeld ? "#59E391" : "#fff"
    }
    return (
        <button style={style} onClick={props.hold} className="main__dice">{props.value}</button>
    )
}

