import boxes from './boxes.js'
import Box from './Box.js'
import React from 'react'



function App() {
  const [grid, setGrid] = React.useState(boxes)
  const [type, setType] = React.useState("tree")
  const [typeArray, setTypeArray] = React.useState(['human', 'goblin', 'dwarf', 'ent'])
  const [spotsLeft, setSpotsLeft] = React.useState(() => {
    const idsArray = boxes.map((box) => box.id);
  console.log(idsArray);
  return idsArray;
  })

  function startGame(id, columnId, rowId, race){
    if(race !== 'none' && race !== '') return
    setGrid(prevGrid => {
      const updatedGrid = prevGrid.map(square => {
       
        if (square.id === id) {
          return {
            ...square,
            race: type,
          };
        } else { 
          return square; // Keep the square unchanged
        }
      });
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
            goblinsInRange: (type === 'goblin' || race === 'goblin') ? square.goblinsInRange + 1 : square.goblinsInRange,
            humansInRange: (type === 'human' || race === 'human') ? square.humansInRange + 1 : square.humansInRange,
            dwarvesInRange: (type === 'dwarf' || race === 'dwarf') ? square.dwarvesInRange + 1 : square.dwarvesInRange,
            entsInRange: (type === 'ent' || race === 'ent') ? square.entsInRange + 1 : square.entsInRange,
            treesInRange: (type === 'tree' || race === 'tree') ? square.treesInRange + 1 : square.treesInRange
          };
        } else {
          return square
        }
      });
    })
    const filteredSpots = spotsLeft.filter(item => item !== id);
    setSpotsLeft(filteredSpots);
    setType('none')
  }

  React.useEffect(() => {
    console.log(spotsLeft);
  }, [spotsLeft]);

  
  function toggle(id, columnId, rowId, race) {  
    if(spotsLeft.length < 4) return
      console.log(id)
      console.log(columnId)
      console.log(rowId)
      console.log(race)
      console.log(typeArray)
    if(race !== 'none' && race !== '') return
    setGrid(prevGrid => {
      const updatedGrid = prevGrid.map(square => {
       
        if (square.id === id) {
          return {
            ...square,
            race: type,
          };
        } else {
          return square; // Keep the square unchanged
        }
      });

      // Apply IP updates for cells with the same race after the render
      const playerUpdatedGrid =  updatedGrid.map(square => {


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
            goblinsInRange: (type === 'goblin' || race === 'goblin') ? square.goblinsInRange + 1 : square.goblinsInRange,
            humansInRange: (type === 'human' || race === 'human') ? square.humansInRange + 1 : square.humansInRange,
            dwarvesInRange: (type === 'dwarf' || race === 'dwarf') ? square.dwarvesInRange + 1 : square.dwarvesInRange,
            entsInRange: (type === 'ent' || race === 'ent') ? square.entsInRange + 1 : square.entsInRange,
            treesInRange: (type === 'tree' || race === 'tree') ? square.treesInRange + 1 : square.treesInRange
          };
        } else {
          return square
        }


      })
      let player2TurnGrid
      for(let i = 0; i < 1; i++){
        if(!spotsLeft.length) break 
        let unchanged = true
        let randomPosition = Math.floor(Math.random() * spotsLeft.length)
        let id = spotsLeft[randomPosition]
        console.log("finding gob spot")

        player2TurnGrid = playerUpdatedGrid.map(square =>{
          if (square.id === id && square.race === 'none') {
            unchanged = false
            return {
              ...square,
              race: typeArray[1],
            };
          } else {
            return square; // Keep the square unchanged

          }
        })
        console.log(id)
        if(unchanged) i--
      }

      let player3TurnGrid
      for(let i = 0; i < 1; i++){
        if(!spotsLeft.length) break
        let unchanged = true
        let randomPosition = Math.floor(Math.random() * spotsLeft.length)
        let id = spotsLeft[randomPosition]
        console.log("finding dwarf spot")

        player3TurnGrid = player2TurnGrid.map(square =>{
          if (square.id === id && square.race === 'none') {
            unchanged = false
            return {
              ...square,
              race: typeArray[2],
            };
          } else {
            return square; // Keep the square unchanged

          }
        })
        console.log(id)
        if(unchanged) i--
      }

      let player4TurnGrid
      for(let i = 0; i < 1; i++){
        if(!spotsLeft.length) break
        let unchanged = true
        let randomPosition = Math.floor(Math.random() * spotsLeft.length)
        let id = spotsLeft[randomPosition]
        console.log("finding ent spot")

        player4TurnGrid = player3TurnGrid.map(square =>{
          if (square.id === id && square.race === 'none') {
            unchanged = false
            return {
              ...square,
              race: typeArray[3],
            };
          } else {
            return square; // Keep the square unchanged

          }
        })
        console.log(id)
        if(unchanged) i--
      }
      return player4TurnGrid
    })
  }


  function calcGoblinIp(goblinsInRange, humansInRange, dwarvesInRange, entsInRange, treesInRange){
    let ip = 0
    let _goblinsInRange = 0
    for(let i = 0; i < goblinsInRange; i++){
        _goblinsInRange++
        ip++
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
        _dwarvesInRange++
        ip--
    }
    let _entsInRange = 0
    for(let i = 0; i < entsInRange; i++){
     if(_entsInRange < 10){
       _entsInRange++
       ip++
     }
    }
    let _treesInRange = 0
    for (let i = 0; i < treesInRange; i++){
      _treesInRange++
      ip++ 
    }
    console.log(_treesInRange)
    return ip
  }

  function calcHumanIp(goblinsInRange, humansInRange, dwarvesInRange, entsInRange, treesInRange){
    let ip = 0
    let _goblinsInRange = 0
    for(let i = 0; i < goblinsInRange; i++){
      if(_goblinsInRange < 11){
        _goblinsInRange++
        ip++
      } else{
        _goblinsInRange++
        ip--
      }
    }
    let _humansInRange = 0
    for(let i = 0; i < humansInRange; i++){
      if(_humansInRange < 15){
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
    let _treesInRange = 0
    for (let i = 0; i < treesInRange; i++){
      _treesInRange++
      ip++ 
    }
      return ip
    }

  function calcDwarfIp(goblinsInRange, humansInRange, dwarvesInRange, entsInRange, treesInRange){
    let ip = 0
    let _goblinsInRange = 0
    for(let i = 0; i < goblinsInRange; i++){
      _goblinsInRange++
      if(_goblinsInRange > 9){
        ip--
      }
    }
    let _humansInRange = 0
    for(let i = 0; i < humansInRange; i++){
        _humansInRange++
        ip--
    }

    let _dwarvesInRange = 0
    for(let i = 0; i < dwarvesInRange; i++){
      _dwarvesInRange++
      if(_dwarvesInRange < 11){
        ip++
      }
    }

    let _entsInRange = 0
    for(let i = 0; i < entsInRange; i++){
      _entsInRange++
     if(_entsInRange < 15){
       ip++
     } else {
      ip--
     }
    }
    let _treesInRange = 0
    for (let i = 0; i < treesInRange; i++){
      _treesInRange++
      ip++ 
    }
    return ip
  }

  function calcEntIp(goblinsInRange, humansInRange, dwarvesInRange, entsInRange, treesInRange){
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
        _humansInRange++
        ip--  
    }

    let _dwarvesInRange = 0
    for(let i = 0; i < dwarvesInRange; i++){
      if(_dwarvesInRange < 10){
        _dwarvesInRange++
        ip++
      } else{
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
    let _treesInRange = 0
    for (let i = 0; i < treesInRange; i++){
      _treesInRange++
      ip++ 
    }
    return ip
  }

  function calcTreeIp(goblinsInRange, humansInRange, dwarvesInRange, entsInRange, treesInRange){
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
        _humansInRange++
        ip--  
    }

    let _dwarvesInRange = 0
    for(let i = 0; i < dwarvesInRange; i++){
      if(_dwarvesInRange < 10){
        _dwarvesInRange++
        ip++
      } else{
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
    let _treesInRange = 0
    for (let i = 0; i < treesInRange; i++){
      _treesInRange++
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
      ip={cell.race === 'goblin' ? calcGoblinIp(cell.goblinsInRange, cell.humansInRange, cell.dwarvesInRange, cell.entsInRange, cell.treesInRange) 
      : cell.race === 'human' ? calcHumanIp(cell.goblinsInRange, cell.humansInRange, cell.dwarvesInRange, cell.entsInRange, cell.treesInRange) 
      : cell.race === 'dwarf' ? calcDwarfIp(cell.goblinsInRange, cell.humansInRange, cell.dwarvesInRange, cell.entsInRange, cell.treesInRange)
      : cell.race === 'ent' ? calcEntIp(cell.goblinsInRange, cell.humansInRange, cell.dwarvesInRange, cell.entsInRange, cell.treesInRange)
      : cell.race === 'tree' ? calcTreeIp(cell.goblinsInRange, cell.humansInRange, cell.dwarvesInRange, cell.entsInRange, cell.treesInRange) : 0}
      rowId={cell.rowId}
      columnId={cell.columnId}
      race={cell.race}
      goblinsInRange={cell.goblinsInRange}
      humansInRange={cell.humansInRange}
      dwarvesInRange={cell.dwarvesInRange}
      entsInRange={cell.entsInRange}
      treesInRange={cell.treesInRange}
      toggle={() => toggle(cell.id, cell.columnId, cell.rowId, cell.race)} />

  ))

  /*
  function changeType(event){
    const {value} = event.target
    console.log(event.target.value)
    setType(value)
  }
  */

  React.useEffect(() => {
    setSpotsLeft(prevSpotsLeft => prevSpotsLeft.filter(id => grid.find(square => square.id === id).race === 'none'));
  }, [grid]);

  function handleToggle(){
    let idList = []
    let id, columnNumber, rowNumber
    let num = 1
    while(num <= 100){
      [id, columnNumber, rowNumber] = generateRandomIDs()
      console.log(`ID:${id} Num:: ${num}`)
      if(!idList.includes(id)){
        startGame(id,columnNumber,rowNumber,'')
        setSpotsLeft(prevSpotsLeft => prevSpotsLeft.filter(id => grid.find(square => square.id === id).race === 'none'));
        num++
        idList.push(id)
      }
      else {
        continue
      }
    }
    function generateRandomIDs(){
      let rowNumber = Math.ceil(Math.random() * 20)
      let columnNumber = Math.ceil(Math.random() * 20)
      let id = columnNumber + ((rowNumber * 20) - 20)
      return [id, columnNumber, rowNumber]
    }
  }
  
  
  function changeType(type){
    setType(type)
    setTypeArray(prevTypeArray => {
      let filteredArray = prevTypeArray.filter((el) => el !== type)
      let returnArray = [type, ...filteredArray]
      console.log(returnArray)
      return returnArray 
    })
}

  return (
    <div className="App">
      <header>
        <h2 className="title">Playing Field</h2>
        {type !== "tree" && <div>

        {type === 'none' || type === 'human' ? (
          <button
            onClick={() => changeType('human')}
            className={'human'}
          >
            {type === 'none' ? 'Human' : <h2 className='human'>Playing as: The Humans</h2>}
          </button>
        ) : null}

        {type === 'none' || type === 'goblin' ? (
          <button
            onClick={() => changeType('goblin')}
            className={'goblin'}
          >
            {type === 'none' ? 'Goblin' : <h2 className='goblin'>Playing as: The Goblins</h2>}
          </button>
        ) : null}
          
        {type === 'none' || type === 'ent' ? (
          <button
            onClick={() => changeType('ent')}
            className={'ent'}
          >
            {type === 'none' ? 'Ent' : <h2 className='ent'>Playing as: The Ents</h2>}
          </button>
        ) : null}
          
        {type === 'none' || type === 'dwarf' ? (
          <button
            onClick={() => changeType('dwarf')}
            className={'dwarf'}
          >
            {type === 'none' ? 'Dwarf' : <h2 className='dwarf'>Playing as: The Dwarves</h2>}
          </button>
        ) : null}


        </div>}
      </header>
      <div className="grid-container">
          {squareElements}
      </div>
      {type === "tree" && <button onClick={handleToggle}>start</button>}
    </div>
  );
}

export default App;
