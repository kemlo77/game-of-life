import { Cell } from '../model/cell';
import { View } from './view';

export class AgedView extends View {




    clearTheCanvas(): void {
        this.canvasCtx.fillStyle = 'rgba(255,255,255,0.85)';
        this.canvasCtx.rect(0, 0, this.canvasElement.width, this.canvasElement.height);
        this.canvasCtx.fill();
    }


    plotCells(cells: Cell[]): void {

        cells.forEach(cell => {
            switch (cell.age) {
                case 1: this.canvasCtx.fillStyle = 'rgba(170,190,170,1)'; break;
                case 2: this.canvasCtx.fillStyle = 'rgba(150,170,150,1)'; break;
                case 3: this.canvasCtx.fillStyle = 'rgba(120,130,120,1)'; break;
                case 4: this.canvasCtx.fillStyle = 'rgba(90,110,90,1)'; break;
                case 5: this.canvasCtx.fillStyle = 'rgba(70,90,70,1)'; break;
                case 6: this.canvasCtx.fillStyle = 'rgba(50,70,50,1)'; break;
                case 7: this.canvasCtx.fillStyle = 'rgba(30,50,30,1)'; break;
                case 8: this.canvasCtx.fillStyle = 'rgba(10,30,10,1)'; break;
                default: this.canvasCtx.fillStyle = 'rgba(0,0,0,1)';
            }

            this.canvasCtx.beginPath(); //varför måste jag ha med detta för att färgändring ska slå igenom
            this.canvasCtx.stroke();    // dito
            const squareWidth: number = this.gridCellWidth - 2;
            const xAdjusted: number = this.gridCellWidth / 2 + cell.x * this.gridCellWidth;
            const yAdjusted: number = this.gridCellWidth / 2 + cell.y * this.gridCellWidth;
            this.canvasCtx.rect(xAdjusted - squareWidth / 2, yAdjusted - squareWidth / 2, squareWidth, squareWidth);
            this.canvasCtx.fill();
        });



    }

}