import { Cell } from '../../model/cell';
import { Grid } from '../../model/grid';
import { CanvasPainter } from './canvaspainter';
import { CellPainter } from './cellpainter';

export class SmoothCellPainter extends CanvasPainter implements CellPainter {

    plotCells(grid: Grid): void {
        const livingCells: Cell[] = grid.allLiveCells;

        livingCells.forEach(livingCell => {
            livingCell.livingNeighbours
                .forEach(livingNeighbourCell => {
                    this.paintWideLineBetweenCells(livingCell, livingNeighbourCell);
                });
        });

        livingCells.forEach(livingCell => {
            livingCell.deadNeighbours
                .filter(deadCell => deadCell.livingOrthogonalNeighbours.length >= 3)
                .forEach(deadCell => {
                    this.paintWhiteCircle(deadCell);
                });
        });

        this.paintBlackCircles(livingCells);
    }

}