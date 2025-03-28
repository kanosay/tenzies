export default function Dice(props) {
    const style = {
        backgroundColor: '#59E391'
    }
    return (
        <button disabled={!props.isRunning} style={props.isHeld ? style : null} onClick={() => props.toggle(props.id)} className="main__dice">{props.value}</button>
    )
}