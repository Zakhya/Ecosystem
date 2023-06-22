import boxes from './boxes.js'
import Box from './Box.js'
import React from 'react'



function App() {
  const [grid, setGrid] = React.useState(boxes)
  const [type, setType] = React.useState("")

  function toggle(id, columnId, rowId, race) {
    if(race !== 'none') return
    setGrid(prevGrid => {
      const updatedGrid = prevGrid.map(square => {
       
  
        if (square.id === id) {
          return {
            ...square,
            race: type,
            color: type,
          };
        } else {
          return square; // Keep the square unchanged
        }
      });

      // Apply IP updates for cells with the same race after the render
      return updatedGrid.map(square => {


        const columnRange = (
          square.columnId === columnId + 1 ||
          square.columnId === columnId - 1 ||
          square.columnId === columnId ||
          square.columnId === columnId + 2 ||
          square.columnId === columnId - 2 ||
          square.columnId === columnId + 3 ||
          square.columnId === columnId - 3 ||
          square.columnId === columnId + 4 ||
          square.columnId === columnId - 4
        );
        const rowRange = (
          square.rowId === rowId + 1 ||
          square.rowId === rowId - 1 ||
          square.rowId === rowId ||
          square.rowId === rowId + 2 ||
          square.rowId === rowId - 2 ||
          square.rowId === rowId + 3 ||
          square.rowId === rowId - 3 ||
          square.rowId === rowId + 4 ||
          square.rowId === rowId - 4
        );

        if (rowRange && columnRange) {
          return {
            ...square,
            goblinsInRange: type === 'goblin' ? square.goblinsInRange + 1 : square.goblinsInRange,
            humansInRange: type === 'human' ? square.humansInRange + 1 : square.humansInRange,
            dwarvesInRange: type === 'dwarf' ? square.dwarvesInRange + 1 : square.dwarvesInRange,
            entsInRange: type === 'ent' ? square.entsInRange + 1 : square.entsInRange
          };
        } else {
          return square
        }
      });
    });
  }

  function calcGoblinIp(goblinsInRange, humansInRange, dwarvesInRange, entsInRange){
    let ip = 0
    let _goblinsInRange = 0
    for(let i = 0; i < goblinsInRange; i++){
      if(_goblinsInRange < 8){
        _goblinsInRange++
        ip++
      } else {
        _goblinsInRange++
        ip--
      }
    }
    let _humansInRange = 0
    for(let i = 0; i < humansInRange; i++){
      if(_humansInRange < 3){
        _humansInRange++
        ip++
      } else {
        _humansInRange++
        ip--
      }
    }
    let _dwarvesInRange = 0
    for(let i = 0; i < dwarvesInRange; i++){
      if(_dwarvesInRange < 7){
        _dwarvesInRange++
        ip++
      } else {
        _dwarvesInRange++
        ip--
      }
    }

    let _entsInRange = 0
    for(let i = 0; i < entsInRange; i++){
     if(_entsInRange < 5){
       _entsInRange++
       ip++
     }
    }
    return ip
  }

  function calcHumanIp(goblinsInRange, humansInRange, dwarvesInRange, entsInRange){
    let ip = 0
    let _goblinsInRange = 0
    for(let i = 0; i < goblinsInRange; i++){
        _goblinsInRange++
        ip--
    }
    let _humansInRange = 0
    for(let i = 0; i < humansInRange; i++){
      if(_humansInRange < 8){
        _humansInRange++
        ip++
      } else {
        _humansInRange++
        ip--
      }
    }
    let _dwarvesInRange = 0
    for(let i = 0; i < dwarvesInRange; i++){
        _dwarvesInRange++
        ip--
      }

    let _entsInRange = 0
    for(let i = 0; i < entsInRange; i++){
     if(_entsInRange < 15){
       _entsInRange++
       ip++
     }
    }
      return ip
    }

  function calcDwarfIp(goblinsInRange, humansInRange, dwarvesInRange, entsInRange){
    let ip = 0
    let _goblinsInRange = 0
    for(let i = 0; i < goblinsInRange; i++){
      if(_goblinsInRange < 8){
        _goblinsInRange++
        ip++
      } else {
        _goblinsInRange++
        ip--
      }
    }
    let _humansInRange = 0
    for(let i = 0; i < humansInRange; i++){
      if(_humansInRange < 4){
        _humansInRange++
        ip++
      } else {
        _humansInRange++
        ip--
      }
    }

    let _dwarvesInRange = 0
    for(let i = 0; i < dwarvesInRange; i++){
      if(_dwarvesInRange < 11){
        _dwarvesInRange++
        ip++
      }
    }

    let _entsInRange = 0
    for(let i = 0; i < entsInRange; i++){
     if(_entsInRange > 7)
      _entsInRange++
        ip--
    }
    return ip
  }

  function calcEntIp(goblinsInRange, humansInRange, dwarvesInRange, entsInRange){
    let ip = 0
    let _goblinsInRange = 0
    for(let i = 0; i < goblinsInRange; i++){
      if(_goblinsInRange < 3){
        _goblinsInRange++
        ip++
      } else {
        _goblinsInRange++
        ip--
      }
    }
    let _humansInRange = 0
    for(let i = 0; i < humansInRange; i++){
      if(_humansInRange < 9){
        _humansInRange++
        ip++
      } else {
        _humansInRange++
        ip--
      }
    }

    let _dwarvesInRange = 0
    for(let i = 0; i < dwarvesInRange; i++){
      if(_dwarvesInRange < 0){
        _dwarvesInRange++
        ip--
      }
    }
    let _entsInRange = 0
    for(let i = 0; i < entsInRange; i++){
      if(entsInRange < 21)
        _entsInRange++
        ip++
    }
    return ip
  }


  const squareElements = grid.map(cell =>(
    <Box
      color={cell.color}
      key={cell.id}
      id={cell.id}
      on={cell.on}
      ip={cell.race === 'goblin' ? calcGoblinIp(cell.goblinsInRange, cell.humansInRange, cell.dwarvesInRange, cell.entsInRange) 
      : cell.race === 'human' ? calcHumanIp(cell.goblinsInRange, cell.humansInRange, cell.dwarvesInRange, cell.entsInRange) 
      : cell.race === 'dwarf' ? calcDwarfIp(cell.goblinsInRange, cell.humansInRange, cell.dwarvesInRange, cell.entsInRange)
      : cell.race === 'ent' ? calcEntIp(cell.goblinsInRange, cell.humansInRange, cell.dwarvesInRange, cell.entsInRange):0 }
      rowId={cell.rowId}
      columnId={cell.columnId}
      race={cell.race}
      goblinsInRange={cell.goblinsInRange}
      humansInRange={cell.humansInRange}
      dwarvesInRange={cell.dwarvesInRange}
      entsInRange={cell.entsInRange}
      toggle={() => toggle(cell.id, cell.columnId, cell.rowId, cell.race)} />

  ))

  function changeType(event){
    const {value} = event.target
    console.log(event.target.value)
    setType(value)
  }


  return (
    <div className="App">
      <header>
        <h2 className="title">Playing Field</h2>  
        <fieldset>
          <legend>Current Type</legend>
            <br />

            <input
              type="radio"
              id="human" 
              value="human"
              onChange={changeType}
              checked={type === "human"}/>
            <label>Human</label>

            <input
              type="radio"
              id="goblin" 
              value="goblin" 
              onChange={changeType}
              checked={type === "goblin"}/>
            <label>Goblin</label>

            <input
              type="radio"
              id="dwarf" 
              value="dwarf" 
              onChange={changeType}
              checked={type === "dwarf"}/>
            <label>Dwarf</label>

            <input
              type="radio"
              id="ent" 
              value="ent" 
              onChange={changeType}
              checked={type === "ent"}/>
            <label>Ent</label>
            
            <input
              type="radio"
              id="transparent" 
              value="transparent" 
              onChange={changeType}
              checked={type === "transparent"}/>
            <label>None</label>
        </fieldset>
      </header>
      <div className="grid-container">
          {squareElements}
      </div>
    </div>
  );
}

export default App;
