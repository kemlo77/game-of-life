import { Cell } from '../../model/cell';
import { CanvasPainter } from './canvaspainter';
import { CellPainter } from './cellpainter';

export class RoundedCellPainter extends CanvasPainter implements CellPainter {




    plotCells(livingCells: Cell[]): void {

        livingCells.forEach(livingCell => {
            livingCell.livingNeighbours
                .forEach(livingNeighbourCell => {
                    this.paintLineBetweenCells(livingCell, livingNeighbourCell);
                });
        });

        livingCells.forEach(livingCell => {
            livingCell.deadNeighbours.forEach(deadCell => {
                const livingOrthogonalNeighbours: number = deadCell.orthogonalNeighbours
                    .filter(cell => cell.isAlive).length;
                if (livingOrthogonalNeighbours >= 3) {
                    this.paintWhiteCircle(deadCell);
                }
            });
        });

        this.paintBlackCircles(livingCells);
    }

}