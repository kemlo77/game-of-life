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
            cell.livingDiagonalNeighbours
                .forEach(neighbour => {
                    if (this.cellsHaveNoCommonLivingOrthogonalNeighbours(cell,neighbour)) {
                        this.paintThinLineBetweenCells(cell, neighbour);
                    }
                });
        });


        this.paintCellsAsHollowDots(livingCells, 'rgba(0,0,0,1)', 'rgba(128,128,128,1)');
        this.paintCellsAsHollowDots(
            this.cellsWithNoLivingNeighbours(livingCells),
            'rgba(0,0,0,1)',
            'rgba(255,255,0,1)'
        );
        this.paintCellsAsHollowDots(
            this.cellsWithOneLivingOrthogonalNeighbour(livingCells),
            'rgba(0,0,0,1)',
            'rgba(0,255,0,1)'
        );


        this.cellsWithOneLivingOrthogonalNeihbours(livingCells).forEach(cell => {
            cell.livingDiagonalNeighbours
                .forEach(neighbour => {
                    if (this.cellsHaveNoCommonLivingOrthogonalNeighbours(cell,neighbour)) {
                        this.paintCellsAsHollowDots([cell, neighbour],'rgba(0,0,0,1)','rgba(128,128,128,1)');
                    }
                });
        });

        this.paintCellsAsHollowDots(
            this.cellsWithOneLivingDiagonalNeighbour(livingCells),
            'rgba(0,0,0,1)',
            'rgba(100,100,255,1)'
        );

        this.paintCellsAsHollowDots(
            this.cellsWithTwoDiagonalNeighboursNotOnALine(livingCells),
            'rgba(0,0,0,1)',
            'rgba(255,127,0,1)'
        );

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