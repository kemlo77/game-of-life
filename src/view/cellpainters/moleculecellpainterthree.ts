import { Cell } from '../../model/cell';
import { CanvasPainter } from './canvaspainter';
import { CellPainter } from './cellpainter';

export class MoleculeCellPainterThree extends CanvasPainter implements CellPainter {

    plotCells(livingCells: Cell[], givenColor: string): void {

        //dela upp cellerna i kluster
        const nonLonleyCells: Cell[] = livingCells.filter(cell => cell.numberOfLivingNeighbours > 0);

        nonLonleyCells
            .forEach(cell => {
                const numberOfLivingNeighbours: number = cell.livingNeighbours.length;
                const randomLivingNeighbour: Cell =
                    cell.livingNeighbours[Math.floor(Math.random() * numberOfLivingNeighbours)];
                this.paintThinLineBetweenCells(cell, randomLivingNeighbour, 2.5);
            });



        this.paintAllCellsAsHollowDots(livingCells);
    }

    paintAllCellsAsHollowDots(cells: Cell[]): void {
        this.paintCircles(cells, 'rgba(0,0,0,1)', this.gridCellWidth * 0.32);
        this.paintCircles(cells, 'rgba(128,255,128,1)', this.gridCellWidth * 0.2);
    }



}