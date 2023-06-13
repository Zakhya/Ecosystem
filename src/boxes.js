function fillArray() {
    let returnArray = []
    let count = 400;
    for (let i = 1, j = 1; i <= count; i++){
        returnArray.push({
            rowId: Math.ceil(i / 20),
            id: i,
            columnId: j,
            ip: 0,
            color: 'transparent',
            race: 'none',
            isActive: false
        })
        j > 19 ? j = 1 : j++
    }
    return returnArray
} 

export default fillArray()