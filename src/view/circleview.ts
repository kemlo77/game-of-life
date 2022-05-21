import { Cell } from '../model/cell';
import { View } from './view';

export class CircleView extends View {


    plotCells(cells: Cell[], givenColor: string): void {
        this.canvasCtx.fillStyle = givenColor;
        const squareWidth: number = this.gridCellWidth;
        cells.forEach(cell => {
            const xAdjusted: number = cell.x * this.gridCellWidth + this.gridCellWidth / 2;
            const yAdjusted: number = cell.y * this.gridCellWidth + this.gridCellWidth / 2;
            this.canvasCtx.beginPath();
            this.canvasCtx.arc(xAdjusted, yAdjusted, squareWidth / 2, 0, 2 * Math.PI);
            this.canvasCtx.fill();
        });



    }

}