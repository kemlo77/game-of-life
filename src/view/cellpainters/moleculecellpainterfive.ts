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
                cell.diagonalNeighbours.filter(neighbour => neighbour.isAlive)
                    .forEach(neighbour => {
                        this.paintThinLineBetweenCells(cell, neighbour, 2.5);
                    });
            });



        this.cellsWithNoLivingDiagonalNeihbours(livingCells)
            .forEach(cell => {
                this.livingOrthogonalNeighbours(cell)
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
            .filter(cell => cell.diagonalNeighbours.every(neighbour => neighbour.isDead));
    }

    private cellsWithOneLivingDiagonalNeihbours(cells: Cell[]): Cell[] {
        return cells
            .filter(cell => cell.diagonalNeighbours.filter(neighbour => neighbour.isAlive).length == 1);
    }

    private cellsWithOneOrLessLivingOrthogonalNeihbours(cells: Cell[]): Cell[] {
        return cells
            .filter(cell => cell.orthogonalNeighbours.filter(neighbour => neighbour.isAlive).length <= 1);
    }

    private livingOrthogonalNeighbours(cell: Cell): Cell[] {
        return cell.orthogonalNeighbours.filter(neighbour => neighbour.isAlive);
    }

    private livingDiagonalNeighboursWithOneOrLessLivingOrthogonalNeighbour(cell: Cell): Cell[] {
        return cell.diagonalNeighbours
            .filter(neighbour => neighbour.isAlive)
            .filter(neighbour => neighbour.orthogonalNeighbours.filter(neighbour => neighbour.isAlive).length == 1);
    }


}