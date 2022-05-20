import { Cell } from '../model/cell';

export abstract class View {


    protected canvasElement: HTMLCanvasElement = document.getElementById('myCanvas') as HTMLCanvasElement;
    protected canvasCtx: CanvasRenderingContext2D = this.canvasElement.getContext('2d');
    protected width = 25;


    clearTheCanvas(): void {
        this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }

    plotLivingCells(cells: Cell[]): void {
        const livingCells: Cell[] = cells.filter(cell => cell.isAlive);
        this.plotCells(livingCells);
    }


    protected abstract plotCells(cells: Cell[]): void;







}