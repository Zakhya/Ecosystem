import boxes from './boxes.js'
import Box from './Box.js'
import React from 'react'
import FactionButtons from './FactionButtons.js'



function App() {
  const [setupStage, setSetupStage] = React.useState('tree')
  const [playerTurn ,setPlayerTurn] = React.useState('player1')
  const [globalIdList, setGlobalIdList] = React.useState([])
  const [grid, setGrid] = React.useState(boxes)
  const [type, setType] = React.useState('tree')
  const [typeArray, setTypeArray] = React.useState(['human', 'dwarf', 'ent'])
  const [spotsLeft, setSpotsLeft] = React.useState(() => {
    const idsArray = boxes.map((box) => box.id);
  return idsArray;
  })

  let humanTotalIp = []
  let dwarfTotalIp = []
  let entTotalIp = []

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
            humansInRange: (type === 'human' || race === 'human') ? square.humansInRange + 1 : square.humansInRange,
            dwarvesInRange: (type === 'dwarf' || race === 'dwarf') ? square.dwarvesInRange + 1 : square.dwarvesInRange,
            entsInRange: (type === 'ent' || race === 'ent') ? square.entsInRange + 1 : square.entsInRange,
            treesInRange: (type === 'tree' || race === 'tree') ? square.treesInRange + 1 : square.treesInRange,
            mineralsInRange: (type === 'mineral' || race === 'mineral') ? square.mineralsInRange + 1 : square.mineralsInRange,
            waterInRange: (type === 'water' || race === 'water') ? square.waterInRange + 1 : square.waterInRange,
          };
        } else {
          return square
        }
      });
    })
    const filteredSpots = spotsLeft.filter(item => item !== id);
    setSpotsLeft(filteredSpots);
  }

  
  function toggle(id, columnId, rowId, race) {  
    let originalId = id
    console.log(id)
    let idList = globalIdList
    idList.push(id)
    console.log('toggle ran')
    if(spotsLeft.length < 4) return
    if(race !== 'none' && race !== '') return
    setGrid(prevGrid => {
      const updatedGrid = prevGrid.map(square => {
       
        if (square.id === id) {
          console.log("inside prev.map: " + id)
          return {
            ...square,
            race: typeArray[0],
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
            goblinsInRange: (type === 'goblin') ? square.goblinsInRange + 1 : square.goblinsInRange,
            humansInRange: (type === 'human') ? square.humansInRange + 1 : square.humansInRange,
            dwarvesInRange: (type === 'dwarf') ? square.dwarvesInRange + 1 : square.dwarvesInRange,
            entsInRange: (type === 'ent') ? square.entsInRange + 1 : square.entsInRange,
            treesInRange: (type === 'tree') ? square.treesInRange + 1 : square.treesInRange,
            mineralsInRange: (type === 'mineral') ? square.mineralsInRange + 1 : square.mineralsInRange,
            waterInRange: (type === 'water') ? square.waterInRange + 1 : square.waterInRange,
            
          };
        } else {
          return square
        }


      })
      id = originalId
      // set new id
        while(idList.includes(id) && id !== -1){
          rowId = Math.ceil(Math.random() * 20)
          columnId = Math.ceil(Math.random() * 20)
          id = columnId + ((rowId * 20) - 20)
        }
      idList.push(id)
  

      const updated2Grid = playerUpdatedGrid.map(square => {
       
        if (square.id === id + 1) {
          return {
            ...square,
            race: typeArray[1],
          };
        } else {
          return square;
        }
      });

      // Apply IP updates for cells with the same race after the render
      const player2UpdatedGrid =  updated2Grid.map(square => {


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
            goblinsInRange: (type === 'goblin') ? square.goblinsInRange + 1 : square.goblinsInRange,
            humansInRange: (type === 'human') ? square.humansInRange + 1 : square.humansInRange,
            dwarvesInRange: (type === 'dwarf') ? square.dwarvesInRange + 1 : square.dwarvesInRange,
            entsInRange: (type === 'ent') ? square.entsInRange + 1 : square.entsInRange,
            treesInRange: (type === 'tree') ? square.treesInRange + 1 : square.treesInRange,
            mineralsInRange: (type === 'mineral') ? square.mineralsInRange + 1 : square.mineralsInRange,
            waterInRange: (type === 'water') ? square.waterInRange + 1 : square.waterInRange,
            
          };
        } else {
          return square
        }


      })
      id = originalId
      // set new id
        while(idList.includes(id) && id !== -1){
          rowId = Math.ceil(Math.random() * 20)
          columnId = Math.ceil(Math.random() * 20)
          id = columnId + ((rowId * 20) - 20)
        }
      idList.push(id)
  
  

      const updated3Grid = player2UpdatedGrid.map(square => {
       
        if (square.id === id + 2) {
          return {
            ...square,
            race: typeArray[2],
          };
        } else {
          return square; // Keep the square unchanged
        }
      });

      // Apply IP updates for cells with the same race after the render
      const player3UpdatedGrid =  updated3Grid.map(square => {


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
            goblinsInRange: (type === 'goblin') ? square.goblinsInRange + 1 : square.goblinsInRange,
            humansInRange: (type === 'human') ? square.humansInRange + 1 : square.humansInRange,
            dwarvesInRange: (type === 'dwarf') ? square.dwarvesInRange + 1 : square.dwarvesInRange,
            entsInRange: (type === 'ent') ? square.entsInRange + 1 : square.entsInRange,
            treesInRange: (type === 'tree') ? square.treesInRange + 1 : square.treesInRange,
            mineralsInRange: (type === 'mineral') ? square.mineralsInRange + 1 : square.mineralsInRange,
            waterInRange: (type === 'water') ? square.waterInRange + 1 : square.waterInRange,
            
          };
        } else {
          return square
        }


      })
      id = originalId
       setGlobalIdList(idList)
       return player3UpdatedGrid
     })
  }


  function calcHumanIp(humansInRange, dwarvesInRange, entsInRange, treesInRange, mineralsInRange, waterInRange){
    let ip = 0
    let _humansInRange = 0
    for(let i = 0; i < humansInRange; i++){
        _humansInRange++
        ip += 2
    }
    let _dwarvesInRange = 0
    for(let i = 0; i < dwarvesInRange; i++){
        _dwarvesInRange++
        ip -= 2
      }

    let _entsInRange = 0
    for(let i = 0; i < entsInRange; i++){
       _entsInRange++
       ip++
    }
    let _waterInRange = 0
    for (let i = 0; i < waterInRange; i++){
      _waterInRange++
      ip += 2
    }

    let _mineralsInRange = 0
    for(let i = 0; i < mineralsInRange; i++){
      _mineralsInRange++
      ip++
    }
    humanTotalIp.push(ip)

      return ip
    }

  function calcDwarfIp(humansInRange, dwarvesInRange, entsInRange, treesInRange, mineralsInRange, waterInRange){
    let ip = 0
    let _humansInRange = 0
    for(let i = 0; i < humansInRange; i++){
        _humansInRange++
        ip++
    }

    let _dwarvesInRange = 0
    for(let i = 0; i < dwarvesInRange; i++){
      _dwarvesInRange++
        ip += 2
    }

    let _entsInRange = 0
    for(let i = 0; i < entsInRange; i++){
      _entsInRange++
      ip -= 2
    }
    let _treesInRange = 0
    for (let i = 0; i < treesInRange; i++){
      _treesInRange++
      ip++
    }

    let _mineralsInRange = 0
    for (let i = 0; i < mineralsInRange; i++){
      _mineralsInRange++
      ip += 2
    }
    dwarfTotalIp.push(ip)

    return ip
  }

  function calcEntIp(humansInRange, dwarvesInRange, entsInRange, treesInRange, mineralsInRange, waterInRange){
    let ip = 0
    let _humansInRange = 0
    for(let i = 0; i < humansInRange; i++){
        _humansInRange++
        ip -= 2
    }

    let _dwarvesInRange = 0
    for(let i = 0; i < dwarvesInRange; i++){
        _dwarvesInRange++
        ip++
    }
    let _entsInRange = 0
    for(let i = 0; i < entsInRange; i++){
        _entsInRange++
        ip += 2
    }
    let _treesInRange = 0
    for (let i = 0; i < treesInRange; i++){
      _treesInRange++
      ip += 1
    }

    let _waterInRange = 0
    for(let i = 0; i < waterInRange; i++){
      _waterInRange++
      ip++
    }
    entTotalIp.push(ip)

    return ip
  }

  function calcTreeIp(humansInRange, dwarvesInRange, entsInRange, treesInRange, mineralsInRange, waterInRange){
    let ip = 0
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

    let _mineralsInRange = 0
    for(let i = 0; i < mineralsInRange; i++){
      _mineralsInRange++
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
      ip={cell.race === 'human' ? calcHumanIp(cell.humansInRange, cell.dwarvesInRange, cell.entsInRange, cell.treesInRange, cell.mineralsInRange, cell.waterInRange) 
      : cell.race === 'dwarf' ? calcDwarfIp(cell.humansInRange, cell.dwarvesInRange, cell.entsInRange, cell.treesInRange, cell.mineralsInRange, cell.waterInRange)
      : cell.race === 'ent' ? calcEntIp(cell.humansInRange, cell.dwarvesInRange, cell.entsInRange, cell.treesInRange, cell.mineralsInRange, cell.waterInRange)
      : cell.race === 'tree' ? calcTreeIp(cell.humansInRange, cell.dwarvesInRange, cell.entsInRange, cell.treesInRange, cell.mineralsInRange, cell.waterInRange) : 0}
      rowId={cell.rowId}
      columnId={cell.columnId}
      race={cell.race}
      goblinsInRange={cell.goblinsInRange}
      humansInRange={cell.humansInRange}
      dwarvesInRange={cell.dwarvesInRange}
      entsInRange={cell.entsInRange}
      treesInRange={cell.treesInRange}
      waterInRnage={cell.waterInRange}
      toggle={() => toggle(cell.id, cell.columnId, cell.rowId, cell.race)} />
  ))


  function handleToggle(){
    let idList = globalIdList.length === 0 ? [] : globalIdList
    let id, columnNumber, rowNumber
    let num = 1
    while(num <= 50){
      [id, columnNumber, rowNumber] = generateRandomIDs()
      if(!idList.includes(id)){
        idList.push(id)
        startGame(id,columnNumber,rowNumber,'')
        setSpotsLeft(prevSpotsLeft => prevSpotsLeft.filter(id => grid.find(square => square.id === id).race === 'none'));
        num++
      }
      else {
        continue
      }
    }
    setGlobalIdList((prevList) => [idList, ...prevList])
    if(setupStage === 'tree'){
      setSetupStage('mineral')
      setType('mineral')
    } else if(setupStage === 'mineral') {
      setSetupStage('water')
      setType('water')
    } else if(setupStage === 'water'){
      setType('none')  
    }

  }
  function generateRandomIDs(){
    let rowNumber = Math.ceil(Math.random() * 20)
    let columnNumber = Math.ceil(Math.random() * 20)
    let id = columnNumber + ((rowNumber * 20) - 20)
    return [id, columnNumber, rowNumber]
  }

  React.useEffect(() => {
    handleToggle()
  },[setupStage])
  
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

        {type !== 'tree' && 
          <FactionButtons 
            type={type}
            changeType={changeType}/>}

      </header>

      <div className="grid-container">
          {squareElements}
      </div>
      <footer>
      { /* type === "tree" && <button className="playButton" onClick={handleToggle}>start</button> */}
      {type !== 'tree' && <div className="totalIpContainer">
        {humanTotalIp.length === 0 ? <span>Human IP: 0</span> : (<span>{`Human IP: ${humanTotalIp.reduce((el, val) =>  val += el)}`}</span>)}
        {entTotalIp.length === 0 ? <span>Ent IP: 0</span> : (<span>{`Ent IP: ${entTotalIp.reduce((el, val) =>  val += el)}`}</span>)}
        {dwarfTotalIp.length === 0 ? <span>Dwarf IP: 0</span> : (<span>{`Dwarf IP: ${dwarfTotalIp.reduce((el, val) =>  val += el)}`}</span>)}
      </div>}
      </footer>
    </div>
  );
}

export default App;
