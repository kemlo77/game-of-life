import { Grid } from '../../model/grid';
import { CanvasPainter } from './canvaspainter';
import { CellPainter } from './cellpainter';

export class ConnectionPainter extends CanvasPainter implements CellPainter {

    plotCells(grid: Grid): void {

        //draw all connections
        grid.allLiveCells().forEach(livingCell => {
            livingCell.livingNeighbours
                .forEach(livingNeighbourCell => {
                    this.paintThinLineBetweenCells(livingCell, livingNeighbourCell, 2.5);
                });
        });
    }

}