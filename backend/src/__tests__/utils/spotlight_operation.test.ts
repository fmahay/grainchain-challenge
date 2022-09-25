import SpotlightOperation from '@/utils/spotlight_operation';

describe('SpotlightOperation class test', () => {
    test('returns correct spotlights positions', () => {
        const data:number[][] = [
            [0, 0, 0, 1, 0, 1, 1, 1],
            [0, 1, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 1, 1, 1],
            [0, 1, 1, 1, 1, 0, 0, 0]
        ];
        const spotlightOperation:SpotlightOperation = new SpotlightOperation(data);
        const newData:string[][] = spotlightOperation.getDataWithSpotlight();
        
        //assert spotlight positions
        expect('X').toBe(newData[0][0]);
        expect('X').toBe(newData[1][4]);
        expect('X').toBe(newData[2][2]);
        expect('X').toBe(newData[3][7]);

        //assert wall positions
        expect(1).toBe(newData[0][3]);
        expect(1).toBe(newData[0][5]);
        expect(1).toBe(newData[0][6]);
        expect(1).toBe(newData[0][7]);
        
        expect(1).toBe(newData[1][1]);

        expect(1).toBe(newData[2][1]);
        expect(1).toBe(newData[2][5]);
        expect(1).toBe(newData[2][6]);
        expect(1).toBe(newData[2][7]);

        expect(1).toBe(newData[3][1]);
        expect(1).toBe(newData[3][2]);
        expect(1).toBe(newData[3][3]);
        expect(1).toBe(newData[3][4]);
    });

    test('throws an error when wrong number of columns', () => {
        const data:number[][] = [
            [0, 0, 0, 1, 0, 1, 1, 1],
            [0, 1, 0],
            [0, 1, 0, 0, 0, 1, 1, 1],
            [0, 1, 1, 1, 1, 0, 0, 1]
        ];
        const spotlightOperation:SpotlightOperation = new SpotlightOperation(data);
        try {
            const newData:string[][] = spotlightOperation.getDataWithSpotlight();   
        } catch (error:any) {
            expect('Unexpected number of columns in row 2: contains 3, expected 8').toBe(error.message);
        }
    });
});