import { Cell } from '../../model/cell';
import { CanvasPainter } from './canvaspainter';
import { CellPainter } from './cellpainter';


export class AgedCellPainter extends CanvasPainter implements CellPainter {




    clearTheCanvas(): void {
        this.canvasCtx.fillStyle = 'rgba(255,255,255,0.85)';
        this.canvasCtx.rect(0, 0, this.canvasElement.width, this.canvasElement.height);
        this.canvasCtx.fill();
    }


    plotCells(cells: Cell[]): void {
        let colorByAge: string = 'rgba(0,0,0,1)';

        cells.forEach(cell => {
            switch (cell.age) {
                case 1: colorByAge = 'rgba(170,190,170,1)'; break;
                case 2: colorByAge = 'rgba(150,170,150,1)'; break;
                case 3: colorByAge = 'rgba(120,130,120,1)'; break;
                case 4: colorByAge = 'rgba(90,110,90,1)'; break;
                case 5: colorByAge = 'rgba(70,90,70,1)'; break;
                case 6: colorByAge = 'rgba(50,70,50,1)'; break;
                case 7: colorByAge = 'rgba(30,50,30,1)'; break;
                case 8: colorByAge = 'rgba(10,30,10,1)'; break;
                default: colorByAge = 'rgba(0,0,0,1)';
            }
            this.paintSquares([cell], colorByAge);
        });



    }

}