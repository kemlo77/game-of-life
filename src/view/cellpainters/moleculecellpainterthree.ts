import { Cell } from '../../model/cell';
import { Grid } from '../../model/grid';
import { CanvasPainter } from './canvaspainter';
import { CellPainter } from './cellpainter';

export class MoleculeCellPainterThree extends CanvasPainter implements CellPainter {

    plotCells(grid: Grid): void {

        //dela upp cellerna i kluster
        grid.clusters.forEach(cluster => {
            const cellsToVisit: number = cluster.length;
            const visitedCells: Set<Cell> = new Set();
            visitedCells.add(cluster[0]);
            const visitTrail: Cell[] = [cluster[0]];

            while (cellsToVisit > visitedCells.size) {
                while (cellHasNoUnvisitedNeigbours(currentCell()) && visitedTrailNotEmpty()) {
                    stepBackwards();
                }
                const randomNeighbour: Cell = randomUnvisitedNeighbour(currentCell());
                this.paintThinLineBetweenCells(currentCell(), randomNeighbour, 2.5);
                visitRandomNeighbour(randomNeighbour);
            }


            function currentCell(): Cell {
                const currentCell: Cell = visitTrail[visitTrail.length - 1];
                return currentCell;
            }

            function visitedTrailNotEmpty(): boolean {
                return visitTrail.length != 0;
            }

            function cellHasNoUnvisitedNeigbours(cell: Cell): boolean {
                return cell.livingNeighbours.every(neigbour => visitedCells.has(neigbour));
            }

            function stepBackwards(): void {
                visitTrail.pop();
            }

            function randomUnvisitedNeighbour(cell: Cell): Cell {
                const unvisitedNeighbours: Cell[] = cell.livingNeighbours
                    .filter(neighbour => !visitedCells.has(neighbour));
                const randomUnvisitedNeighbour: Cell =
                    unvisitedNeighbours[Math.floor(Math.random() * unvisitedNeighbours.length)];
                return randomUnvisitedNeighbour;
            }

            function visitRandomNeighbour(cell: Cell): void {
                visitedCells.add(cell);
                visitTrail.push(cell);
            }


        });




        this.paintCellsAsHollowDots(grid.allLiveCells(), 'rgba(0,0,0,1)', 'rgba(128,255,128,1)');
    }





}