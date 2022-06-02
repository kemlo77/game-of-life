import { Cell } from '../../model/cell';
import { Grid } from '../../model/grid';
import { CanvasPainter } from './canvaspainter';
import { CellPainter } from './cellpainter';

export class MoleculeCellPainterTwo extends CanvasPainter implements CellPainter {

    plotCells(grid: Grid): void {
        const livingCells: Cell[] = grid.allLiveCells();

        livingCells.filter(cell => cell.numberOfLivingNeighbours > 0)
            .forEach(cell => {
                this.paintThinLineBetweenCells(cell, this.randomLivingNeighbourTo(cell));
            });
        this.paintCellsAsHollowDots(livingCells, 'rgba(0,0,0,1)', 'rgba(255,255,0,1)');
    }

    private randomLivingNeighbourTo(cell: Cell): Cell {
        const numberOfLivingNeighbours: number = cell.livingNeighbours.length;
        if (numberOfLivingNeighbours == 0) {
            throw new Error('Has no neighbours');
        }
        return cell.livingNeighbours[Math.floor(Math.random() * numberOfLivingNeighbours)];
    }



}