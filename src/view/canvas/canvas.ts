import { Cell } from '../../model/cell';
import { Coordinate } from '../coordinate';

export class Canvas {

    private canvasElement: HTMLCanvasElement;
    private canvasCtx: CanvasRenderingContext2D;

    constructor(canvasId: string) {
        this.canvasElement =  document.getElementById(canvasId) as HTMLCanvasElement;
        this.canvasCtx = this.canvasElement.getContext('2d');
    }

    protected readonly black: string = 'rgba(0,0,0,1)';

    private _gridCellWidth = 20;
    get gridCellWidth(): number {
        return this._gridCellWidth;
    }

    set gridCellWidth(newWidth: number) {
        this._gridCellWidth = newWidth;
    }

    get thinLineWidth(): number {
        return this.gridCellWidth * 0.1;
    }

    get mediumLineWidth(): number {
        return this.gridCellWidth * 0.5;
    }

    get wideLineWidth(): number {
        return this.gridCellWidth;
    }

    clearTheCanvas(): void {
        this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
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
            shadowOffset = this.gridCellWidth * 0.1;
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
        this.paintCircles(cells, this.black, this.gridCellWidth * 0.64, false);
        this.paintCircles(cells, innerColor, this.gridCellWidth * 0.4, false);
    }

    paintCircles(
        cells: Cell[],
        color: string,
        diameter: number = this.gridCellWidth,
        offset: boolean = false
    ): void {
        let shadowOffset: number = 0;
        if (offset) {
            shadowOffset = this.gridCellWidth * 0.1;
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
        const squareWidth: number = this.gridCellWidth - 2 * padding;
        cells.forEach(cell => {
            const corner: Coordinate = this.upperLeftCornerOfCell(cell);
            this.canvasCtx.rect(corner.x + padding, corner.y + padding, squareWidth, squareWidth);
            this.canvasCtx.fill();
        });
    }

    clearSquare(cell: Cell): void {
        const position: Coordinate = this.upperLeftCornerOfCell(cell);
        this.canvasCtx.clearRect(position.x, position.y, this._gridCellWidth, this._gridCellWidth);
    }

    private upperLeftCornerOfCell(cell: Cell): Coordinate {
        const xPart: number = cell.columnIndex * this.gridCellWidth;
        const yPart: number = cell.rowIndex * this.gridCellWidth;
        return new Coordinate(xPart, yPart);
    }

    private centerOfCell(cell: Cell): Coordinate {
        const xPart: number = cell.columnIndex * this.gridCellWidth + this.gridCellWidth / 2;
        const yPart: number = cell.rowIndex * this.gridCellWidth + this.gridCellWidth / 2;
        return new Coordinate(xPart, yPart);
    }


}