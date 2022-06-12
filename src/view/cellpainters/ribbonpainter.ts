import { Cell } from '../../model/cell';
import { Grid } from '../../model/grid';
import { CanvasPainter } from './canvaspainter';
import { CellPainter } from './cellpainter';

export class RibbonPainter extends CanvasPainter implements CellPainter {

    plotCells(grid: Grid): void {

        grid.clusters.forEach(cluster => {
            const cellsToConnect: number = cluster.length;
            const connectedCells: Set<Cell> = new Set();
            const connectionTrail: Cell[] = [];
            const startCell: Cell = radomCellInArray(cluster);
            connectCell(startCell);


            while (cellsToConnect > connectedCells.size) {
                while (cellHasNoUnconnectedNeigbours(currentCell()) && connectedTrailNotEmpty()) {
                    stepBackwards();
                }
                const randomNeighbour: Cell = randomUnconnectedNeighbour(currentCell());
                this.paintMediumShadowLineBetweenCells(currentCell(), randomNeighbour);
                this.paintMediumGreenLineBetweenCells(currentCell(), randomNeighbour);
                connectCell(randomNeighbour);
            }


            function currentCell(): Cell {
                const currentCell: Cell = connectionTrail[connectionTrail.length - 1];
                return currentCell;
            }

            function connectedTrailNotEmpty(): boolean {
                return connectionTrail.length != 0;
            }

            function cellHasNoUnconnectedNeigbours(cell: Cell): boolean {
                return cell.livingNeighbours.every(neigbour => connectedCells.has(neigbour));
            }

            function stepBackwards(): void {
                connectionTrail.pop();
            }

            function randomUnconnectedNeighbour(cell: Cell): Cell {
                const unvisitedNeighbours: Cell[] = cell.livingNeighbours
                    .filter(neighbour => !connectedCells.has(neighbour));
                return radomCellInArray(unvisitedNeighbours);
            }

            function connectCell(cell: Cell): void {
                connectedCells.add(cell);
                connectionTrail.push(cell);
            }

            function radomCellInArray(cells: Cell[]): Cell {
                return cells[Math.floor(Math.random() * cells.length)];
            }


        });



        const lonleyCells: Cell[] = grid.allLiveCells.filter(cell => cell.livingNeighbours.length == 0);
        this.paintCircles(lonleyCells, 'rgba(128,128,128,1)', 7, true);
        this.paintCircles(lonleyCells, 'rgba(0,255,0,1)', 7, false);

        //this.paintCellsAsSmallHollowDots(grid.allLiveCells(), 'rgba(0,255,0,1)', 'rgba(0,0,0,1)');
    }





}