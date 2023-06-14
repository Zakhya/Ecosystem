import React from 'react'

export default function Box(props){
    let color = 'transparent'
    if(props.color === "human"){
        color = '#Dee682'
    } else if(props.color === 'goblin'){
        color = '#92e660'
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