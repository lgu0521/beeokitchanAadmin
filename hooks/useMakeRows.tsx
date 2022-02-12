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

export const menuMadeRows = (data: any[]) => {
    let rows: any[] = [];
    let rowNumber = 0;

    data.forEach(catagory => {
        catagory.menus.forEach((menu: any[]) => {
            rowNumber = rowNumber + 1;
            rows.push({
                ...menu,
                number: rowNumber,
            })
        });
    });

    return rows;
}

export default madeRows;