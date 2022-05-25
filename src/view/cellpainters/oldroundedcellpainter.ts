import { Cell } from '../../model/cell';
import { View } from '../view';
import { CanvasPainter } from './canvaspainter';
import { CellPainter } from './cellpainter';

export class OldRoundedCellPainter extends CanvasPainter implements CellPainter {




    plotCells(livingCells: Cell[]): void {

        livingCells.forEach(livingCell => {
            livingCell.livingNeighbours
                .forEach(livingNeighbourCell => {
                    this.paintLineBetweenCells(livingCell, livingNeighbourCell);
                });
        });


        livingCells.forEach(cell => {
            this.paintWhiteCircles(cell.deadNeighbours);
        });

        this.paintBlackCircles(livingCells);
    }



}