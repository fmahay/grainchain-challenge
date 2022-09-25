import convertFileToMultipleArray from '@/utils/convert_file_multiple_array';
import path from 'path';
import fs from 'fs';

describe('convertFileToMultipleArray test', () => {
    test('returns correct multiplearray', () => {
        const pathFile: string = path.resolve(
            __dirname,
            '../files/success_file_test.txt'
        );
        const contents: string = fs.readFileSync(pathFile, 'utf8');

        const data: number[][] = [
            [0, 0, 0, 1, 0, 1, 1, 1],
            [0, 1, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 1, 1, 1],
            [0, 1, 1, 1, 1, 0, 0, 0],
        ];
        const result: number[][] = convertFileToMultipleArray(contents);

        //assert multi array values
        expect(0).toBe(result[0][0]);
        expect(0).toBe(result[0][1]);
        expect(0).toBe(result[0][2]);
        expect(1).toBe(result[0][3]);
        expect(0).toBe(result[0][4]);
        expect(1).toBe(result[0][5]);
        expect(1).toBe(result[0][6]);
        expect(1).toBe(result[0][7]);

        expect(0).toBe(result[1][0]);
        expect(1).toBe(result[1][1]);
        expect(0).toBe(result[1][2]);
        expect(0).toBe(result[1][3]);
        expect(0).toBe(result[1][4]);
        expect(0).toBe(result[1][5]);
        expect(0).toBe(result[1][6]);
        expect(0).toBe(result[1][7]);

        expect(0).toBe(result[2][0]);
        expect(1).toBe(result[2][1]);
        expect(0).toBe(result[2][2]);
        expect(0).toBe(result[2][3]);
        expect(0).toBe(result[2][4]);
        expect(1).toBe(result[2][5]);
        expect(1).toBe(result[2][6]);
        expect(1).toBe(result[2][7]);

        expect(0).toBe(result[3][0]);
        expect(1).toBe(result[3][1]);
        expect(1).toBe(result[3][2]);
        expect(1).toBe(result[3][3]);
        expect(1).toBe(result[3][4]);
        expect(0).toBe(result[3][5]);
        expect(0).toBe(result[3][6]);
        expect(0).toBe(result[3][7]);
    });

    test('throw exception when fie contains not valid values', () => {
        const pathFile: string = path.resolve(
            __dirname,
            '../files/wrong_file_test.txt'
        );
        const contents: string = fs.readFileSync(pathFile, 'utf8');

        try {
            const result: number[][] = convertFileToMultipleArray(contents);
        } catch (error: any) {
            expect(
                'Unexpected value: 2. Expected values: 0,1. Please verify your submitted file.'
            ).toBe(error.message);
        }
    });
});
