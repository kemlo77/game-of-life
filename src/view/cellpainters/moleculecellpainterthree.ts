import { Cell } from '../../model/cell';
import { CanvasPainter } from './canvaspainter';
import { CellPainter } from './cellpainter';

export class MoleculeCellPainterThree extends CanvasPainter implements CellPainter {

    plotCells(livingCells: Cell[]): void {

        //dela upp cellerna i kluster




        this.paintCellsAsHollowDots(livingCells, 'rgba(0,0,0,1)', 'rgba(128,255,128,1)');
    }





}