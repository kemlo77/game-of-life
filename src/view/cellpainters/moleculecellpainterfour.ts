import { Cell } from '../../model/cell';
import { Grid } from '../../model/grid';
import { CanvasPainter } from './canvaspainter';
import { CellPainter } from './cellpainter';

export class MoleculeCellPainterFour extends CanvasPainter implements CellPainter {

    plotCells(grid: Grid): void {
        const livingCells: Cell[] = grid.allLiveCells();

        //orthogonal connections
        livingCells
            .forEach(cell => {
                cell.orthogonalNeighbours.filter(neighbour => neighbour.isAlive)
                    .forEach(neighbour => {
                        this.paintThinLineBetweenCells(cell, neighbour, 2.5);
                    });
            });

        this.cellsWithNoLivingOrthogonalNeihbours(livingCells)
            .forEach(cell => {
                this.livingDiagonalNeighbours(cell)
                    .forEach(neighbour => {
                        this.paintThinLineBetweenCells(cell, neighbour, 2.5);
                    });
            });

        this.cellsWithOneLivingOrthogonalNeihbours(livingCells).forEach(cell => {
            this.cellsWithOneLivingOrthogonalNeihbours(cell.diagonalNeighbours.filter(neighbour => neighbour.isAlive))
                .forEach(neighbour => this.paintThinLineBetweenCells(cell, neighbour, 2.5));
        });


        this.paintCellsAsHollowDots(livingCells, 'rgba(0,0,0,1)', 'rgba(128,128,0,1)');
    }

    private cellsWithNoLivingOrthogonalNeihbours(cells: Cell[]): Cell[] {
        return cells
            .filter(cell => cell.orthogonalNeighbours.every(neighbour => neighbour.isDead));
    }

    private cellsWithOneLivingOrthogonalNeihbours(cells: Cell[]): Cell[] {
        return cells
            .filter(cell => cell.orthogonalNeighbours.filter(neighbour => neighbour.isAlive).length == 1);
    }

    private cellsWithOneOrLessLivingOrthogonalNeihbours(cells: Cell[]): Cell[] {
        return cells
            .filter(cell => cell.orthogonalNeighbours.filter(neighbour => neighbour.isAlive).length <= 1);
    }

    private livingDiagonalNeighbours(cell: Cell): Cell[] {
        return cell.diagonalNeighbours.filter(neighbour => neighbour.isAlive);
    }

    private livingDiagonalNeighboursWithOneOrLessLivingOrthogonalNeighbour(cell: Cell): Cell[] {
        return cell.diagonalNeighbours
            .filter(neighbour => neighbour.isAlive)
            .filter(neighbour => neighbour.orthogonalNeighbours.filter(neighbour => neighbour.isAlive).length == 1);
    }


}