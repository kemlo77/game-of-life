import { Cell } from '../../model/cell';
import { CanvasPainter } from './canvaspainter';
import { CellPainter } from './cellpainter';


export class CircleCellPainter extends CanvasPainter implements CellPainter {

    plotCells(cells: Cell[]): void {
        this.paintBlackCircles(cells);
    }

}