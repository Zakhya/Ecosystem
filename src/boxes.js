function fillArray() {
    let returnArray = []
    let count = 400;
    for (let i = 1, j = 1; i <= count; i++){


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
            mineralsInRange: 0,
            waterInRange: 0,
            ip: 0
        })
        j > 19 ? j = 1 : j++
    }
    return returnArray
} 

export default fillArray()