import { Cell } from '../../model/cell';
import { Grid } from '../../model/grid';
import { CanvasPainter } from './canvaspainter';
import { CellPainter } from './cellpainter';

export class MoleculePainter extends CanvasPainter implements CellPainter {

    plotCells(grid: Grid): void {
        const livingCells: Cell[] = grid.allLiveCells;

        //orthogonal connections
        livingCells
            .forEach(cell => {
                cell.livingOrthogonalNeighbours
                    .forEach(neighbour => {
                        this.paintThinLineBetweenCells(cell, neighbour);
                    });
            });

        this.cellsWithNoLivingOrthogonalNeihbours(livingCells)
            .forEach(cell => {
                cell.livingDiagonalNeighbours
                    .forEach(neighbour => {
                        this.paintThinLineBetweenCells(cell, neighbour);
                    });
            });

        this.cellsWithOneLivingOrthogonalNeihbours(livingCells).forEach(cell => {
            this.cellsWithOneLivingOrthogonalNeihbours(cell.livingDiagonalNeighbours)
                .forEach(neighbour => this.paintThinLineBetweenCells(cell, neighbour));
        });


        this.paintCellsAsHollowDots(livingCells, 'rgba(0,0,0,1)', 'rgba(128,128,0,1)');
    }

    private cellsWithNoLivingOrthogonalNeihbours(cells: Cell[]): Cell[] {
        return cells
            .filter(cell => cell.livingOrthogonalNeighbours.length == 0);
    }

    private cellsWithOneLivingOrthogonalNeihbours(cells: Cell[]): Cell[] {
        return cells
            .filter(cell => cell.livingOrthogonalNeighbours.length == 1);
    }


}