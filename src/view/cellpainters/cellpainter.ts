import { Grid } from '../../model/grid';
import { Canvas } from '../canvas/canvas';

export abstract class CellPainter {

    protected readonly white: string = 'rgba(255,255,255,1)';
    protected readonly black: string = 'rgba(0,0,0,1)';
    protected readonly green: string = 'rgba(0,255,0,1)';
    protected readonly gray: string = 'rgba(128,128,128,1)';
    protected readonly orange: string = 'rgba(255,127,0,1)';
    protected readonly yellow: string = 'rgba(255,255,0,1)';
    protected readonly lightBlue: string = 'rgba(100,100,255,1)';

    protected canvas: Canvas;

    constructor(canvas: Canvas) {
        this.canvas = canvas;
    }

    abstract plotCells(grid: Grid): void;

    clearTheCanvas(): void{
        this.canvas.clearTheCanvas();
    }



}