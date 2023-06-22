import React from 'react'

export default function Box(props){
    let color = 'transparent'
    if(props.color === "human"){
        color = '#Dc9999'
    } else if(props.color === 'goblin'){
        color = '#Dad68a'
    } else if(props.color === 'dwarf'){
        color = '#7aaad6'
    } else if(props.color === 'ent'){
        color = '#A7e48f'
    }

    const styles = {
        backgroundColor:  color 
    }

    return (
        <div
            style={styles}
            className="box"
            onClick={props.toggle}
        >{props.race !== 'none' && props.ip}
        </div>
    )
}