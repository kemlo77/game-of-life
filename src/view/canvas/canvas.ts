import { Cell } from '../../model/cell';
import { Grid } from '../../model/grid';
import { Coordinate } from '../coordinate';

export class Canvas {

    private _canvasElement: HTMLCanvasElement;
    private _canvasCtx: CanvasRenderingContext2D;
    private _width: number;
    private _height: number;
    private _cellWidth = 20;
    private _grid: Grid;

    constructor(canvasId: string, grid: Grid) {
        this._canvasElement =  document.getElementById(canvasId) as HTMLCanvasElement;
        this._canvasCtx = this._canvasElement.getContext('2d');
        this._grid = grid;
    }

    protected readonly black: string = 'rgba(0,0,0,1)';

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    get cellWidth(): number {
        return this._cellWidth;
    }

    get thinLineWidth(): number {
        return this.cellWidth * 0.1;
    }

    get mediumLineWidth(): number {
        return this.cellWidth * 0.5;
    }

    get wideLineWidth(): number {
        return this.cellWidth;
    }

    clearTheCanvas(): void {
        this._canvasCtx.clearRect(0, 0, this._width, this._height);
    }

    updateCanvasWhenWindowChanges(): void {
        this._width = window.innerWidth - 32;
        this._height = window.innerHeight - 16;
        this._canvasElement.width = this._width;
        this._canvasElement.height = this._height;

        if (this._width > this._height) {
            this._cellWidth = this._width / this._grid.numberOfColumns;
        } else {
            this._cellWidth = this._height / this._grid.numberOfRows;
        }
    }

    getCellAttCoordinate(coordinate: Coordinate): Cell {
        const xOutsideCanvas: boolean = 0 > coordinate.x || coordinate.x >= this._width;
        const yOutsideCanvas: boolean = 0 > coordinate.y || coordinate.y >= this._height;
        if (xOutsideCanvas || yOutsideCanvas) {
            return new Cell(0,0);
        }
        const columnIndex: number = Math.floor(coordinate.x / this.cellWidth);
        const rowIndex: number = Math.floor(coordinate.y / this.cellWidth);
        return this._grid.cellAt(columnIndex, rowIndex);
    }

    paintLineBetweenCells(
        cell1: Cell,
        cell2: Cell,
        width: number = this.thinLineWidth,
        color: string = this.black,
        offset: boolean = false
    ): void {
        let shadowOffset: number = 0;
        if (offset) {
            shadowOffset = this.cellWidth * 0.1;
        }
        this._canvasCtx.strokeStyle = color;
        const centerOfCell1: Coordinate = this.centerOfCell(cell1);
        const centerOfCell2: Coordinate = this.centerOfCell(cell2);
        this._canvasCtx.lineWidth = width;
        this._canvasCtx.lineCap = 'round';
        this._canvasCtx.beginPath();
        this._canvasCtx.moveTo(centerOfCell1.x + shadowOffset, centerOfCell1.y + shadowOffset);
        this._canvasCtx.lineTo(centerOfCell2.x + shadowOffset, centerOfCell2.y + shadowOffset);
        this._canvasCtx.stroke();
    }

    paintCellsAsHollowDots(cells: Cell[], innerColor: string): void {
        this.paintCircles(cells, this.black, this.cellWidth * 0.64, false);
        this.paintCircles(cells, innerColor, this.cellWidth * 0.4, false);
    }

    paintCircles(
        cells: Cell[],
        color: string,
        diameter: number = this.cellWidth,
        offset: boolean = false
    ): void {
        let shadowOffset: number = 0;
        if (offset) {
            shadowOffset = this.cellWidth * 0.1;
        }
        const radius: number = diameter / 2;
        this._canvasCtx.fillStyle = color;
        cells.forEach(cell => {
            const center: Coordinate = this.centerOfCell(cell);
            this._canvasCtx.beginPath();
            this._canvasCtx.arc(center.x + shadowOffset, center.y + shadowOffset, radius, 0, 2 * Math.PI);
            this._canvasCtx.fill();
        });
    }

    paintSquares(cells: Cell[], color: string): void {
        const padding: number = 1;
        this._canvasCtx.fillStyle = color;
        this._canvasCtx.beginPath(); //varför måste jag ha med detta för att färgändring ska slå igenom
        this._canvasCtx.stroke();    // dito
        const squareWidth: number = this.cellWidth - 2 * padding;
        cells.forEach(cell => {
            const corner: Coordinate = this.upperLeftCornerOfCell(cell);
            this._canvasCtx.rect(corner.x + padding, corner.y + padding, squareWidth, squareWidth);
            this._canvasCtx.fill();
        });
    }

    clearSquare(cell: Cell): void {
        const position: Coordinate = this.upperLeftCornerOfCell(cell);
        this._canvasCtx.clearRect(position.x, position.y, this.cellWidth, this.cellWidth);
    }

    private upperLeftCornerOfCell(cell: Cell): Coordinate {
        const xPart: number = cell.columnIndex * this.cellWidth;
        const yPart: number = cell.rowIndex * this.cellWidth;
        return new Coordinate(xPart, yPart);
    }

    private centerOfCell(cell: Cell): Coordinate {
        const xPart: number = cell.columnIndex * this.cellWidth + this.cellWidth / 2;
        const yPart: number = cell.rowIndex * this.cellWidth + this.cellWidth / 2;
        return new Coordinate(xPart, yPart);
    }


}