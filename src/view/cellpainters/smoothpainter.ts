import { Cell } from '../../model/cell';
import { Grid } from '../../model/grid';
import { CellPainter } from './cellpainter';

export class SmoothCellPainter extends CellPainter {

    plotCells(grid: Grid): void {
        const livingCells: Cell[] = grid.allLiveCells;

        livingCells.forEach(livingCell => {
            livingCell.livingNeighbours
                .forEach(livingNeighbourCell => {
                    this.canvas.paintLineBetweenCells(livingCell, livingNeighbourCell, this.canvas.wideLineWidth);
                });
        });

        livingCells.forEach(livingCell => {
            livingCell.deadNeighbours
                .filter(deadCell => deadCell.livingOrthogonalNeighbours.length >= 3)
                .forEach(deadCell => {
                    this.canvas.paintCircles([deadCell], this.white);
                });
        });

        this.canvas.paintCircles(livingCells, this.black);
    }

}