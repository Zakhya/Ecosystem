function fillArray() {
    let returnArray = []
    let count = 400;
    for (let i = 1, j = 1; i <= count; i++){

        const isTree = Math.ceil(Math.random() * 20) > 16 ? true : false
        const isGoblin = Math.ceil(Math.random() * 20) < 4 ? true : false

        returnArray.push({
            rowId: Math.ceil(i / 20),
            id: i,
            columnId: j,
            color: 'transparent',
            race: 'none',
            goblinsInRange: 0,
            humansInRange: 0,
            dwarvesInRange: 0,
            entsInRange: 0,
            treesInRange: 0,
            ip: 0
        })
        j > 19 ? j = 1 : j++
    }
    return returnArray
} 

export default fillArray()