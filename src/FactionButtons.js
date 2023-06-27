import React from 'react'

const FactionButtons = (props) => {
  return (
    <div>

        {props.type === 'none' || props.type === 'human' ? (
          <button
            onClick={() => props.changeType('human')}
            className={'human'}
          >
            {props.type === 'none' ? 'Human' : <h2 className='human'>Playing as: The Humans</h2>}
          </button>
        ) : null}

        {props.type === 'none' || props.type === 'goblin' ? (
          <button
            onClick={() => props.changeType('goblin')}
            className={'goblin'}
          >
            {props.type === 'none' ? 'Goblin' : <h2 className='goblin'>Playing as: The Goblins</h2>}
          </button>
        ) : null}
          
        {props.type === 'none' || props.type === 'ent' ? (
          <button
            onClick={() => props.changeType('ent')}
            className={'ent'}
          >
            {props.type === 'none' ? 'Ent' : <h2 className='ent'>Playing as: The Ents</h2>}
          </button>
        ) : null}
          
        {props.type === 'none' || props.type === 'dwarf' ? (
          <button
            onClick={() => props.changeType('dwarf')}
            className={'dwarf'}
          >
            {props.type === 'none' ? 'Dwarf' : <h2 className='dwarf'>Playing as: The Dwarves</h2>}
          </button>
        ) : null}


    </div>
  )
}

export default FactionButtons