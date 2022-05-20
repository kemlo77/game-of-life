import { Cell } from '../model/cell';
import { View } from './view';

export class RainbowColoredView extends View {

    private colorStrings: string[] = [
        'rgba(255,0,0,1)', //red
        'rgba(255,165,0,1)', //orange
        'rgba(255,255,0,1)', //yellow
        'rgba(0,128,0,1)', //green
        'rgba(0,0,255,1)', //blue
        'rgba(75,0,130,1)', //indigo
        'rgba(238,130,238,1)' //violet
    ];
    private colorStep = 0;


    clearTheCanvas(): void {
        this.canvasCtx.fillStyle = 'rgba(255,255,255,0.7)';
        this.canvasCtx.rect(0, 0, this.canvasElement.width, this.canvasElement.height);
        this.canvasCtx.fill();
    }




    plotCells(cells: Cell[]): void {
        this.canvasCtx.fillStyle = this.getColor();
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

    private getColor(): string {
        const colorIndex: number = this.colorStep++ % this.colorStrings.length;
        return this.colorStrings[colorIndex];
    }

}