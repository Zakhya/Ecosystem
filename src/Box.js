import React from 'react'

export default function Box(props){
    let color = 'transparent'
    if(props.race === "human"){
        color = '#Dc9999'
    } else if(props.race === 'goblin'){
        color = '#Dad68a'
    } else if(props.race === 'dwarf'){
        color = '#7aaad6'
    } else if(props.race === 'ent'){
        color = '#A7e48f'
    } else if(props.race === 'tree'){
        color = '#174817'
    }

    const styles = {
        backgroundColor:  color 
    }

    return (
        <div
            style={styles}
            className="box"
            onClick={props.toggle}
        >{(props.race !== 'none') && props.ip}
        </div>
    )
}