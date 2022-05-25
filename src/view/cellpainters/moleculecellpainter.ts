import { Cell } from '../../model/cell';
import { CanvasPainter } from './canvaspainter';
import { CellPainter } from './cellpainter';

export class MoleculeCellPainter extends CanvasPainter implements CellPainter {

    plotCells(livingCells: Cell[]): void {

        //draw all connections
        livingCells.forEach(livingCell => {
            livingCell.livingNeighbours
                .forEach(livingNeighbourCell => {
                    this.paintThinLineBetweenCells(livingCell, livingNeighbourCell, 2.5);
                });
        });

        this.paintCellsAsHollowDots(livingCells, 'rgba(0,0,0,1)', 'rgba(128,255,255,1)');
    }

}