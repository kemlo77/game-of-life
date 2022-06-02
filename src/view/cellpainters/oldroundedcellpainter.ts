import { Cell } from '../../model/cell';
import { Grid } from '../../model/grid';
import { CanvasPainter } from './canvaspainter';
import { CellPainter } from './cellpainter';

export class OldRoundedCellPainter extends CanvasPainter implements CellPainter {




    plotCells(grid: Grid): void {
        const livingCells: Cell[] = grid.allLiveCells();

        livingCells.forEach(livingCell => {
            livingCell.livingNeighbours
                .forEach(livingNeighbourCell => {
                    this.paintWideLineBetweenCells(livingCell, livingNeighbourCell);
                });
        });


        livingCells.forEach(cell => {
            this.paintWhiteCircles(cell.deadNeighbours);
        });

        this.paintBlackCircles(livingCells);
    }



}