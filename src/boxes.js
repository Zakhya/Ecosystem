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
            ip: 0
        })
        j > 19 ? j = 1 : j++
    }
    return returnArray
} 

export default fillArray()