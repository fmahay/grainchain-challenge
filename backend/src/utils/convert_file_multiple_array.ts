const rowSeparator: string = ' ';
const columnSeparator: RegExp = /\r?\n/;
const expectedValues: string[] = ['0', '1'];

const convertFileToMultipleArray = (contents: string): number[][] => {
    const result: number[][] = [];

    contents.split(columnSeparator).forEach((line) => {
        const row: number[] = [];

        line.split(rowSeparator).forEach((column) => {
            if (!expectedValues.includes(column)) {
                throw new Error(
                    `Unexpected value: ${column}. Expected values: ${expectedValues}. Please verify your submitted file.`
                );
            } else {
                row.push(Number(column));
            }
        });

        if (row.length > 0) {
            result.push(row);
        }
    });

    return result;
};

export default convertFileToMultipleArray;
