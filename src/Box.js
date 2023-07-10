import React from 'react'
import { FaTree } from 'react-icons/fa'
import { GiMineralPearls } from 'react-icons/gi'
import { BiWater } from 'react-icons/bi'


export default function Box(props){
    let color = 'transparent'
    if(props.race === "human"){
        color = '#Dc9999'
    } else if(props.race === 'goblin'){
        color = '#Dad68a'
    } else if(props.race === 'dwarf'){
        color = '#Cbc957'
    } else if(props.race === 'ent'){
        color = '#A7e48f'
    } else if(props.race === 'tree'){
        color = '#174817'
    } else if(props.race === 'mineral'){
        color = '#4c4837'
    } else if(props.race === 'water'){
        color = '#3a5771'
    }
    let weight = 300
    if(props.ip < 25){
        weight = 300
    } else if (props.ip < 35){
        weight = 350
    } else if (props.ip < 55){
        weight = 450
    } else if( props.ip < 75){
        weight = 500
    } else if( props.ip < 150){
        weight = 550
    }
    const styles = {
        backgroundColor:  color, 
        fontWeight: weight
    }

    return (
        <div
            style={styles}
            className={props.race === 'tree' ? 'trees' : 'box'}
            onClick={props.toggle}
        >{(props.race !== 'none') && (props.race !== 'tree') && props.race !== 'mineral' && props.race !== 'water' && props.ip}
        {(props.race === 'tree') &&
            <>
                <FaTree className='tree' style={{color: '#44854a'}}/>
            </>
        }
        {(props.race === 'mineral') &&
            <>
                <GiMineralPearls className='tree' style={{color: '#948353'}}/>
            </>
        }
        {(props.race === 'water') &&
            <>
                <BiWater className='tree' style={{color: '#5e90bd'}}/>
            </>
        }
        </div>
        )
    }