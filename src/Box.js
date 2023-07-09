import React from 'react'
import { FaTree } from 'react-icons/fa'
import { GiMineralPearls } from 'react-icons/gi'


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
    } else if(props.race === 'mineral'){
        color = '#4c4837'
    }

    const styles = {
        backgroundColor:  color 
    }

    return (
        <div
            style={styles}
            className={props.race === 'tree' ? 'trees' : 'box'}
            onClick={props.toggle}
        >{(props.race !== 'none') && (props.race !== 'tree') && props.race !== 'mineral' && props.ip}
        {(props.race === 'tree') &&
            <>
                <FaTree className='tree'/>
            </>
        }
        {(props.race === 'mineral') &&
            <>
                <GiMineralPearls className='tree'/>
            </>
        }
        </div>
        )
    }