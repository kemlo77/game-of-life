import { Cell } from '../model/cell';
import { Grid } from '../model/grid';
import { CellPainter } from './cellpainters/cellpainter';
import { MoleculeCellPainter } from './cellpainters/moleculecellpainter';

export class View {


    private _cellPainter: CellPainter = new MoleculeCellPainter();

    set cellPainter(cellPainter: CellPainter) {
        this._cellPainter = cellPainter;
    }




    redrawGrid(grid: Grid): void {
        this._cellPainter.clearTheCanvas();
        const livingCells: Cell[] = grid.allCells().filter(cell => cell.isAlive);
        this._cellPainter.plotCells(livingCells, this.getColor());
    }

    getColor(): string {
        return 'rgba(0,0,0,1)';
    }


}