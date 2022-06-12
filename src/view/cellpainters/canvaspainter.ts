import { Cell } from '../../model/cell';
import { Coordinate } from '../coordinate';

export class CanvasPainter {
    private white: string = 'rgba(255,255,255,1)';
    private black: string = 'rgba(0,0,0,1)';
    private green: string = 'rgba(0,255,0,1)';
    private gray: string = 'rgba(128,128,128,1)';

    protected canvasElement: HTMLCanvasElement = document.getElementById('myCanvas') as HTMLCanvasElement;
    protected canvasCtx: CanvasRenderingContext2D = this.canvasElement.getContext('2d');
    private gridCellWidth = 20;

    clearTheCanvas(): void {
        this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }

    protected paintWideLineBetweenCells(cell1: Cell, cell2: Cell): void {
        this.paintLineBetweenCells(cell1, cell2, this.gridCellWidth, this.black, false);
    }

    protected paintMediumGreenLineBetweenCells(cell1: Cell, cell2: Cell): void {
        this.paintLineBetweenCells(cell1, cell2, this.gridCellWidth * 0.6, this.green, false);
    }

    protected paintMediumShadowLineBetweenCells(cell1: Cell, cell2: Cell): void {
        this.paintLineBetweenCells(cell1, cell2, this.gridCellWidth * 0.6, this.gray, true);
    }

    protected paintThinLineBetweenCells(cell1: Cell, cell2: Cell): void {
        this.paintLineBetweenCells(cell1, cell2, 2.5, this.black, false);
    }

    protected paintLineBetweenCells(cell1: Cell, cell2: Cell, width: number, color: string, offset: boolean): void {
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

    paintCellsAsHollowDots(cells: Cell[], outerColor: string, innerColor: string): void {
        this.paintCirclesDeep(cells, outerColor, this.gridCellWidth * 0.32, false);
        this.paintCirclesDeep(cells, innerColor, this.gridCellWidth * 0.2, false);
    }

    protected paintCircles(cells: Cell[], color: string, width?: number): void {
        if  (typeof width == 'undefined') {
            this.paintCirclesDeep(cells, color, this.gridCellWidth * 0.5, false);
        } else {
            this.paintCirclesDeep(cells, color, width * 0.5, false);
        }
    }

    protected paintShadowedCircles(cells: Cell[], color: string, width?: number): void {
        if  (typeof width == 'undefined') {
            this.paintCirclesDeep(cells, 'rgba(128,128,128,1)', this.gridCellWidth * 0.5, true);
            this.paintCirclesDeep(cells, color, this.gridCellWidth * 0.5, false);
        } else {
            this.paintCirclesDeep(cells, 'rgba(128,128,128,1)', width * 0.5, true);
            this.paintCirclesDeep(cells, color, width * 0.5, false);
        }
    }

    private paintCirclesDeep(cells: Cell[], color: string, width: number, offset: boolean): void {
        let shadowOffset: number = 0;
        if (offset) {
            shadowOffset = this.gridCellWidth * 0.1;
        }
        const radius: number = width;
        this.canvasCtx.fillStyle = color;
        cells.forEach(cell => {
            const center: Coordinate = this.centerOfCell(cell);
            this.canvasCtx.beginPath();
            this.canvasCtx.arc(center.x + shadowOffset, center.y + shadowOffset, radius, 0, 2 * Math.PI);
            this.canvasCtx.fill();
        });
    }

    protected paintSquares(cells: Cell[], color: string): void {
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