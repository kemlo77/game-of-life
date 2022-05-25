import { Grid } from '../../model/grid';
import { CanvasPainter } from './canvaspainter';
import { CellPainter } from './cellpainter';

export class RainbowCellPainter extends CanvasPainter implements CellPainter {

    private colorStrings: string[] = [
        'rgba(255,0,0,1)', //red
        'rgba(255,82,0,1)', //red-orange
        'rgba(255,165,0,1)', //orange
        'rgba(255,210,0,1)', //orange-yellow
        'rgba(255,255,0,1)', //yellow
        'rgba(128,192,0,1)', //yellow-green
        'rgba(0,128,0,1)', //green
        'rgba(0,64,128,1)', //green-blue
        'rgba(0,0,255,1)', //blue
        'rgba(37,0,192,1)', //blue-indigo
        'rgba(75,0,130,1)', //indigo
        'rgba(157,65,184,1)', //indigo-violet
        'rgba(238,130,238,1)', //violet
        'rgba(246,65,119,1)' //violet-red
    ];
    private colorStep = 0;


    clearTheCanvas(): void {
        this.canvasCtx.fillStyle = 'rgba(255,255,255,0.3)';
        this.canvasCtx.rect(0, 0, this.canvasElement.width, this.canvasElement.height);
        this.canvasCtx.fill();
    }




    plotCells(grid: Grid): void {
        this.paintSquares(grid.allLiveCells(), this.getNextColor());
    }

    private getNextColor(): string {
        const colorIndex: number = this.colorStep++ % this.colorStrings.length;
        return this.colorStrings[colorIndex];
    }

}