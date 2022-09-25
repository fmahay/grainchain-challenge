import PositionMode from '@/utils/enums/position_mode';
import PathObject from '@/utils/interfaces/path_object';

class SpotlightOperation {
    private _columns: number | undefined;
    private _rows: number | undefined;
    private _data: number[][] = [];
    private _dataWithSpotlight: any[][] = [];
    private _paths: PathObject = {};
    private readonly spotlightSymbol: string = 'X';

    constructor(data: number[][]) {
        //copy data value in new variables
        this._data = JSON.parse(JSON.stringify(data));
        this._dataWithSpotlight = JSON.parse(JSON.stringify(data));
    }

    public getRows(): number {
        if (!this._rows) {
            this._rows = this._data.length;
        }

        return this._rows;
    }

    public getColumns(): number {
        if (!this._columns) {
            const firstRow = this._data[0];
            this._columns = firstRow.length;
        }

        return this._columns;
    }

    private validateColumnsSize(): void | Error {
        const expectedColumns: number = this.getColumns();
        this._data.forEach((row, index) => {
            const numberColumns: number = row.length;
            if (expectedColumns != numberColumns)
                throw new Error(
                    `Unexpected number of columns in row ${
                        index + 1
                    }: contains ${numberColumns}, expected ${expectedColumns}`
                );
        });
    }

    private startCalculateLightPath(): void {
        this._data.forEach((column, indexX) => {
            column.forEach((row, indexY) => {
                const point = `${indexX},${indexY}`;

                this.calculateLightPath(
                    indexX,
                    indexY,
                    point,
                    PositionMode.Top
                );
                this.calculateLightPath(
                    indexX,
                    indexY,
                    point,
                    PositionMode.Bottom
                );
                this.calculateLightPath(
                    indexX,
                    indexY,
                    point,
                    PositionMode.Left
                );
                this.calculateLightPath(
                    indexX,
                    indexY,
                    point,
                    PositionMode.Right
                );
            });
        });

        //Remove duplicate
        this.removeDuplicate();
    }

    private removeDuplicate(): void {
        let tmp: string[] = [];
        for (const [key, value] of Object.entries(this._paths)
            .sort((a, b) => this.sortByLengthValue(a, b))
            .reverse()) {
            if (!tmp.includes(key)) {
                tmp = [...tmp, ...value];
            } else {
                delete this._paths[key];
            }
        }
    }

    private calculateLightPath(
        indexX: number,
        indexY: number,
        position: string,
        positionMode: PositionMode
    ): void {
        if (
            indexX < 0 ||
            indexY < 0 ||
            indexX >= this.getRows() ||
            indexY >= this.getColumns() ||
            this._data[indexX][indexY]
        )
            return;

        const newPosition: string = `${indexX},${indexY}`;
        if (position != newPosition) {
            //if exists the position, add the newPosition
            if (Object.keys(this._paths).includes(position))
                this._paths[position].push(newPosition);
            //otherwise create
            else this._paths[position] = [newPosition];
        }

        switch (positionMode) {
            case PositionMode.Bottom:
                this.calculateLightPath(
                    indexX + 1,
                    indexY,
                    position,
                    PositionMode.Bottom
                );
                break;
            case PositionMode.Left:
                this.calculateLightPath(
                    indexX,
                    indexY - 1,
                    position,
                    PositionMode.Left
                );
                break;
            case PositionMode.Right:
                this.calculateLightPath(
                    indexX,
                    indexY + 1,
                    position,
                    PositionMode.Right
                );
                break;
            case PositionMode.Top:
                this.calculateLightPath(
                    indexX - 1,
                    indexY,
                    position,
                    PositionMode.Top
                );
                break;
        }
    }

    private sortByLengthValue(a: any[], b: any[]): number {
        return a[1].length - b[1].length;
    }

    /*private orderDictionaryByLenghtValue(o:PathObject): PathObject {
		return Object.keys(o).sort().reduce((r:any, k:any) => (r[k] = o[k], r), {});
	}*/

    private putSpotlight(position: string, spotlightPosition: string): void {
        const points: string[] = position.split(',');

        this._dataWithSpotlight[Number(points[0])][Number(points[1])] =
            spotlightPosition;
    }

    public getDataWithSpotlight(): string[][] {
        this.validateColumnsSize();
        this.startCalculateLightPath();

        //create a new 'map' with the spotlight position
        for (const [key, value] of Object.entries(this._paths)) {
            this.putSpotlight(key, this.spotlightSymbol);
        }

        return this._dataWithSpotlight;
    }
}

export default SpotlightOperation;
