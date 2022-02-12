const madeRows = (data: any[]) => {
    let rows: any[] = [];
    let rowNumber = 0;

    data.forEach((item) => {
        rowNumber = rowNumber + 1;
        rows.push({
            ...item,
            number: rowNumber,
        })
    });

    return rows;
}

export default madeRows;