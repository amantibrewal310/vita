
// distributes the array results in [rows] rows 

function StoreInRows(rows, arr) {
    console.log(rows);
    console.log(arr);

    const rowWise = [];
    
    for(var i=0; i<rows; i++) {
        rowWise.push([]);
    }

    for(let i=0; i<arr.length; i++) {
        let j = i % rows;
        rowWise[j].push(arr[i]);
    }

    return rowWise;
}

export default StoreInRows
