import { Cell } from '../../model/cell';
import { Grid } from '../../model/grid';
import { CanvasPainter } from './canvaspainter';
import { CellPainter } from './cellpainter';

export class NeighboursCellPainter extends CanvasPainter implements CellPainter {




    plotCells(grid: Grid): void {
        grid.allLiveCells().forEach(cell => {
            this.paintSquares([cell], this.colorGivenNumberOfNeighboursToOfCell(cell));
        });
    }

    private colorGivenNumberOfNeighboursToOfCell(cell: Cell): string {
        switch (cell.livingNeighbours.length) {
            case 0: return 'rgba(170,190,170,1)';
            case 1: return 'rgba(150,170,150,1)';
            case 2: return 'rgba(120,130,120,1)';
            case 3: return 'rgba(90,110,90,1)';
            case 4: return 'rgba(70,90,70,1)';
            case 5: return 'rgba(50,70,50,1)';
            case 6: return 'rgba(30,50,30,1)';
            case 7: return 'rgba(10,30,10,1)';
            default: return 'rgba(0,0,0,1)';
        }
    }


}