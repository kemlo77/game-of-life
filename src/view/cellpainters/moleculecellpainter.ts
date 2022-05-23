import { Cell } from '../../model/cell';
import { CanvasPainter } from './canvaspainter';
import { CellPainter } from './cellpainter';

export class MoleculeCellPainter extends CanvasPainter implements CellPainter {

    plotCells(livingCells: Cell[], givenColor: string): void {

        livingCells.forEach(livingCell => {
            livingCell.livingNeighbours
                .forEach(livingNeighbourCell => {
                    this.paintThinLineBetweenCells(livingCell, livingNeighbourCell, 2.5);
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

        this.paintCircles(livingCells, 'rgba(0,0,0,1)', this.gridCellWidth * 0.32);
        this.paintCircles(livingCells, 'rgba(255,255,255,1)', this.gridCellWidth * 0.2);
    }

}