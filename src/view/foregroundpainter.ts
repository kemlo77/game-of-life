import { Cell } from '../model/cell';
import { Coordinate } from './coordinate';
import { CanvasPainter } from './cellpainters/canvaspainter';

export class ForegroundPainter extends CanvasPainter {
    private foregroundCanvasElement: HTMLCanvasElement = document.getElementById('foreground') as HTMLCanvasElement;
    private foregroundCanvasCtx: CanvasRenderingContext2D = this.foregroundCanvasElement.getContext('2d');

    private transparentGreen: string = 'rgba(255,127,0,0.6)';
    private previousCell: Cell = new Cell(0,0);

    clearThePreviousCellOnCanvas(): void {
        const position: Coordinate = this.upperLeftCornerOfCell(this.previousCell);
        this.foregroundCanvasCtx.clearRect(position.x, position.y, this.gridCellWidth, this.gridCellWidth);
    }

    colorCellOnMousePosition(position: Coordinate): void {
        const cell: Cell = 
            new Cell(Math.floor(position.x / this.gridCellWidth), Math.floor(position.y / this.gridCellWidth));
        this.paintSquare(cell);
        this.previousCell = cell;
    }

    private paintSquare(cell: Cell): void {
        const padding: number = 1;
        this.foregroundCanvasCtx.fillStyle = this.transparentGreen;
        this.foregroundCanvasCtx.beginPath(); //varför måste jag ha med detta för att färgändring ska slå igenom
        this.foregroundCanvasCtx.stroke();    // dito
        const squareWidth: number = this.gridCellWidth - 2 * padding;
        const corner: Coordinate = this.upperLeftCornerOfCell(cell);
        this.foregroundCanvasCtx.rect(corner.x + padding, corner.y + padding, squareWidth, squareWidth);
        this.foregroundCanvasCtx.fill();
    }

}