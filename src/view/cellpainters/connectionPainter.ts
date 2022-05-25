import { Cell } from '../../model/cell';
import { CanvasPainter } from './canvaspainter';
import { CellPainter } from './cellpainter';

export class ConnectionPainter extends CanvasPainter implements CellPainter {

    plotCells(livingCells: Cell[]): void {

        //draw all connections
        livingCells.forEach(livingCell => {
            livingCell.livingNeighbours
                .forEach(livingNeighbourCell => {
                    this.paintThinLineBetweenCells(livingCell, livingNeighbourCell, 2.5);
                });
        });
    }

}