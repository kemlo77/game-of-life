import { Cell } from '../model/cell';
import { View } from './view';

export class ClassicView extends View {

    plotCells(cells: Cell[]): void {
        this.canvasCtx.fillStyle = 'rgba(0,0,0,1)';
        this.canvasCtx.beginPath(); //varför måste jag ha med detta för att färgändring ska slå igenom
        this.canvasCtx.stroke();    // dito
        const squareWidth: number = this.width - 2;
        cells.forEach(cell => {
            const xAdjusted: number = this.width / 2 + cell.x * this.width;
            const yAdjusted: number = this.width / 2 + cell.y * this.width;
            this.canvasCtx.rect(xAdjusted - squareWidth / 2, yAdjusted - squareWidth / 2, squareWidth, squareWidth);
            this.canvasCtx.fill();
        });

    }

}