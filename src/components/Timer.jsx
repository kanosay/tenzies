import { useState, useEffect } from "react";

export default function Timer(props) {
    return (
        <p className="text-xl my-2">{props.time} Seconds</p>
    )
}