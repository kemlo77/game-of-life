import { Cell } from '../../model/cell';
import { CanvasPainter } from './canvaspainter';
import { CellPainter } from './cellpainter';

export class MoleculeCellPainterTwo extends CanvasPainter implements CellPainter {

    plotCells(livingCells: Cell[], givenColor: string): void {

        livingCells.filter(cell => cell.numberOfLivingNeighbours > 0)
            .forEach(cell => {
                const numberOfLivingNeighbours: number = cell.livingNeighbours.length;
                const randomLivingNeighbour: Cell =
                    cell.livingNeighbours[Math.floor(Math.random() * numberOfLivingNeighbours)];
                this.paintThinLineBetweenCells(cell, randomLivingNeighbour, 2.5);
            });



        this.paintCircles(livingCells, 'rgba(0,0,0,1)', this.gridCellWidth * 0.32);
        this.paintCircles(livingCells, 'rgba(255,255,0,1)', this.gridCellWidth * 0.2);
    }



}