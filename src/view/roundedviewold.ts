import { Cell } from '../model/cell';
import { View } from './view';

export class RoundedViewOld extends View {




    plotCells(livingCells: Cell[], givenColor: string): void {

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