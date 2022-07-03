import { Cell } from '../../model/cell';
import { Coordinate } from '../coordinate';

export class Canvas {

    private canvasElement: HTMLCanvasElement;
    private canvasCtx: CanvasRenderingContext2D;
    private _width: number;
    private _height: number;
    private _cellWidth = 20;

    constructor(canvasId: string) {
        this.canvasElement =  document.getElementById(canvasId) as HTMLCanvasElement;
        this.canvasCtx = this.canvasElement.getContext('2d');
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
        this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }

    updateCanvasWhenWindowChanges(numberOfColumns: number, numberOfRows: number): void {
        const width: number = window.innerWidth - 32;
        const height: number = window.innerHeight - 16;
        this.canvasElement.width = width;
        this.canvasElement.height = height;

        if (width > height) {
            this._cellWidth = width / numberOfColumns;
        } else {
            this._cellWidth = height / numberOfRows;
        }

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
        this.canvasCtx.strokeStyle = color;
        const centerOfCell1: Coordinate = this.centerOfCell(cell1);
        const centerOfCell2: Coordinate = this.centerOfCell(cell2);
        this.canvasCtx.lineWidth = width;
        this.canvasCtx.lineCap = 'round';
        this.canvasCtx.beginPath();
        this.canvasCtx.moveTo(centerOfCell1.x + shadowOffset, centerOfCell1.y + shadowOffset);
        this.canvasCtx.lineTo(centerOfCell2.x + shadowOffset, centerOfCell2.y + shadowOffset);
        this.canvasCtx.stroke();
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
        this.canvasCtx.fillStyle = color;
        cells.forEach(cell => {
            const center: Coordinate = this.centerOfCell(cell);
            this.canvasCtx.beginPath();
            this.canvasCtx.arc(center.x + shadowOffset, center.y + shadowOffset, radius, 0, 2 * Math.PI);
            this.canvasCtx.fill();
        });
    }

    paintSquares(cells: Cell[], color: string): void {
        const padding: number = 1;
        this.canvasCtx.fillStyle = color;
        this.canvasCtx.beginPath(); //varför måste jag ha med detta för att färgändring ska slå igenom
        this.canvasCtx.stroke();    // dito
        const squareWidth: number = this.cellWidth - 2 * padding;
        cells.forEach(cell => {
            const corner: Coordinate = this.upperLeftCornerOfCell(cell);
            this.canvasCtx.rect(corner.x + padding, corner.y + padding, squareWidth, squareWidth);
            this.canvasCtx.fill();
        });
    }

    clearSquare(cell: Cell): void {
        const position: Coordinate = this.upperLeftCornerOfCell(cell);
        this.canvasCtx.clearRect(position.x, position.y, this.cellWidth, this.cellWidth);
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