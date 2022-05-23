import { Cell } from '../../model/cell';
import { CanvasPainter } from './canvaspainter';
import { CellPainter } from './cellpainter';


export class ClassicCellPainter extends CanvasPainter implements CellPainter {


    plotCells(cells: Cell[]): void {
        this.paintSquares(cells, 'rgba(0,0,0,1)');
    }

}