import { Cell } from '../model/cell';
import { View } from './view';

export class RoundedView extends View {




    plotCells(livingCells: Cell[], givenColor: string): void {

        livingCells.forEach(livingCell => {
            livingCell.livingNeighbours
                .forEach(livingNeighbourCell => {
                    this.paintLineBetweenCells(livingCell, livingNeighbourCell);
                });
        });

        livingCells.forEach(livingCell => {
            livingCell.deadNeighbours.forEach(deadCell => {
                const orthogonalNeighbours: Cell[] = deadCell.livingNeighbours.filter(livingNeighbour => {
                    { return deadCell.x == livingNeighbour.x || deadCell.y == livingNeighbour.y; }
                });
                if (orthogonalNeighbours.length >= 3) {
                    this.paintWhiteCircle(deadCell);
                }
            });
        });

        this.paintBlackCircles(livingCells);
    }



}