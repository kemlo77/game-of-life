import { Cell } from '../../model/cell';
import { CellConnection } from '../../model/cellconnection';
import { Grid } from '../../model/grid';
import { CellPainter } from './cellpainter';

export class RibbonPainter extends CellPainter {

    plotCells(grid: Grid): void {

        grid.clustersOfLiveCells.forEach(cluster => {
            const randomConnections: CellConnection[] = this.generateMazelikeRandomCellConnections(cluster);
            randomConnections.forEach(connection => {
                this.canvas.paintLineBetweenCells(
                    connection.cell1,
                    connection.cell2,
                    this.canvas.mediumLineWidth,
                    this.gray,
                    true
                );
                this.canvas.paintLineBetweenCells(
                    connection.cell1, connection.cell2, this.canvas.mediumLineWidth, this.green);
            });
        });

        const lonleyCells: Cell[] = grid.allLiveCells.filter(cell => cell.livingNeighbours.length == 0);
        this.canvas.paintCircles(lonleyCells, this.gray, this.canvas.mediumLineWidth, true);
        this.canvas.paintCircles(lonleyCells, this.green, this.canvas.mediumLineWidth, false);
    }


    private generateMazelikeRandomCellConnections(cluster: Cell[]): CellConnection[] {
        const cellConnections: CellConnection[] = [];
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
            cellConnections.push(new CellConnection(currentCell(), randomNeighbour));
            connectCell(randomNeighbour);
        }

        return cellConnections;


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

    }



}