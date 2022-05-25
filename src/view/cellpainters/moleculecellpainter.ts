import { Grid } from '../../model/grid';
import { CanvasPainter } from './canvaspainter';
import { CellPainter } from './cellpainter';

export class MoleculeCellPainter extends CanvasPainter implements CellPainter {

    plotCells(grid: Grid): void {

        //draw all connections
        grid.allLiveCells().forEach(livingCell => {
            livingCell.livingNeighbours
                .forEach(livingNeighbourCell => {
                    this.paintThinLineBetweenCells(livingCell, livingNeighbourCell, 2.5);
                });
        });

        this.paintCellsAsHollowDots(grid.allLiveCells(), 'rgba(0,0,0,1)', 'rgba(128,255,255,1)');
    }

}