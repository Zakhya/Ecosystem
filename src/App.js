import boxes from './boxes.js'
import Box from './Box.js'
import React from 'react'



function App() {
  const [grid, setGrid] = React.useState(boxes)
  const [type, setType] = React.useState("")

  function toggle(id, columnId, rowId, race) {
    setGrid(prevGrid => {
      const updatedGrid = prevGrid.map(square => {
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
  
        if (square.id === id) {
          return {
            ...square,
            race: type,
            color: type,
            ip: square.ip + 1
          };
        } else if (columnRange && rowRange) {
          return square; // Keep the square unchanged for now
        } else {
          return square; // Keep the square unchanged
        }
      });
  
      // Apply IP updates for cells with the same race after the render
      return updatedGrid.map(square => {
        if (square.race === type) {
          return {
            ...square,
            ip: square.ip + 1
          };
        } else if(square.race !== type && square.race !== 'none'){
          return {
            ...square,
            ip: square.ip - 1
          };
        } else {
          return square
        }
      });
    });
  }

  const squareElements = grid.map(cell =>(
    <Box
      color={cell.color}
      key={cell.id}
      id={cell.id}
      on={cell.on}
      ip={cell.ip}
      rowId={cell.rowId}
      columnId={cell.columnId}
      race={cell.race}
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
