import { Cell } from '../../model/cell';
import { Grid } from '../../model/grid';
import { CanvasPainter } from './canvaspainter';
import { CellPainter } from './cellpainter';

export class MoleculeCellPainterFive extends CanvasPainter implements CellPainter {

    plotCells(grid: Grid): void {
        const livingCells: Cell[] = grid.allLiveCells();

        //orthogonal connections
        livingCells
            .forEach(cell => {
                cell.livingDiagonalNeighbours
                    .forEach(neighbour => {
                        this.paintThinLineBetweenCells(cell, neighbour, 2.5);
                    });
            });



        this.cellsWithNoLivingDiagonalNeihbours(livingCells)
            .forEach(cell => {
                cell.livingOrthogonalNeighbours
                    .forEach(neighbour => {
                        this.paintThinLineBetweenCells(cell, neighbour, 2.5);
                    });
            });

        this.cellsWithOneLivingDiagonalNeihbours(livingCells).forEach(cell => {
            this.cellsWithOneLivingDiagonalNeihbours(cell.orthogonalNeighbours.filter(neighbour => neighbour.isAlive))
                .forEach(neighbour => this.paintThinLineBetweenCells(cell, neighbour, 2.5));
        });


        this.paintCellsAsHollowDots(livingCells, 'rgba(0,0,0,1)', 'rgba(128,128,0,1)');
    }

    private cellsWithNoLivingDiagonalNeihbours(cells: Cell[]): Cell[] {
        return cells
            .filter(cell => cell.livingDiagonalNeighbours.length == 0);
    }

    private cellsWithOneLivingDiagonalNeihbours(cells: Cell[]): Cell[] {
        return cells
            .filter(cell => cell.livingDiagonalNeighbours.length == 1);
    }


}