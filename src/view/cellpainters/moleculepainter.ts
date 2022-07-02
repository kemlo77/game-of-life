import { Cell } from '../../model/cell';
import { Grid } from '../../model/grid';
import { Canvas } from '../canvas/canvas';
import { CellPainter } from './cellpainter';

export class MoleculePainter extends CellPainter {

    constructor(canvas: Canvas) {
        super(canvas);
    }

    plotCells(grid: Grid): void {
        const livingCells: Cell[] = grid.allLiveCells;

        //orthogonal connections
        livingCells
            .forEach(cell => {
                cell.livingOrthogonalNeighbours
                    .forEach(neighbour => {
                        this.canvas.paintLineBetweenCells(cell, neighbour);
                    });
            });

        this.cellsWithNoLivingOrthogonalNeihbours(livingCells)
            .forEach(cell => {
                cell.livingDiagonalNeighbours
                    .forEach(neighbour => {
                        this.canvas.paintLineBetweenCells(cell, neighbour);
                    });
            });

        this.cellsWithOneLivingOrthogonalNeihbours(livingCells).forEach(cell => {
            cell.livingDiagonalNeighbours
                .forEach(neighbour => {
                    if (this.cellsHaveNoCommonLivingOrthogonalNeighbours(cell, neighbour)) {
                        this.canvas.paintLineBetweenCells(cell, neighbour);
                    }
                });
        });


        this.canvas.paintCellsAsHollowDots(livingCells, this.gray);
        this.canvas.paintCellsAsHollowDots(
            this.cellsWithNoLivingNeighbours(livingCells),
            this.yellow
        );
        this.canvas.paintCellsAsHollowDots(
            this.cellsWithOneLivingOrthogonalNeighbour(livingCells),
            this.green
        );


        this.cellsWithOneLivingOrthogonalNeihbours(livingCells).forEach(cell => {
            cell.livingDiagonalNeighbours
                .forEach(neighbour => {
                    if (this.cellsHaveNoCommonLivingOrthogonalNeighbours(cell, neighbour)) {
                        this.canvas.paintCellsAsHollowDots([cell, neighbour], this.gray);
                    }
                });
        });

        this.canvas.paintCellsAsHollowDots(
            this.cellsWithOneLivingDiagonalNeighbour(livingCells),
            this.lightBlue
        );

        this.canvas.paintCellsAsHollowDots(
            this.cellsWithTwoDiagonalNeighboursNotOnALine(livingCells),
            this.orange
        );

        this.canvas.paintCellsAsHollowDots(
            this.cellsWithTwoOrthogonalNeighbousNotOnALine(livingCells),
            this.orange
        );

    }

    private cellsWithTwoOrthogonalNeighbousNotOnALine(cells: Cell[]): Cell[] {
        return cells
            .filter(cell => cell.livingNeighbours.length == 2)
            .filter(cell => cell.livingOrthogonalNeighbours.length == 2)
            .filter(cell => {
                const neighbours: Cell[] = cell.livingOrthogonalNeighbours;
                const n1: Cell = neighbours[0];
                const n2: Cell = neighbours[1];
                return n1.columnIndex !== n2.columnIndex && n1.rowIndex !== n2.rowIndex;
            });
    }


    private cellsWithTwoDiagonalNeighboursNotOnALine(cells: Cell[]): Cell[] {
        return cells
            .filter(cell => cell.livingNeighbours.length == 2)
            .filter(cell => cell.livingDiagonalNeighbours.length == 2)
            .filter(cell => {
                const neighbours: Cell[] = cell.livingDiagonalNeighbours;
                const n1: Cell = neighbours[0];
                const n2: Cell = neighbours[1];
                return n1.columnIndex == n2.columnIndex || n1.rowIndex == n2.rowIndex;
            });
    }

    private cellsWithNoLivingNeighbours(cells: Cell[]): Cell[] {
        return cells.filter(cell => cell.livingNeighbours.length == 0);
    }

    private cellsWithOneLivingOrthogonalNeighbour(cells: Cell[]): Cell[] {
        return cells
            //.filter(cell => cell.livingNeighbours.length == 1)
            .filter(cell => cell.livingOrthogonalNeighbours.length == 1);
    }

    private cellsWithOneLivingDiagonalNeighbour(cells: Cell[]): Cell[] {
        return cells
            .filter(cell => cell.livingNeighbours.length == 1)
            .filter(cell => cell.livingDiagonalNeighbours.length == 1);
    }

    private cellsHaveNoCommonLivingOrthogonalNeighbours(cell1: Cell, cell2: Cell): boolean {
        const commonLivingOrthogonalCells: Cell[] = cell1.livingOrthogonalNeighbours
            .filter(c1 => cell2.livingOrthogonalNeighbours.some(c2 => c1 == c2));
        return commonLivingOrthogonalCells.length == 0;
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