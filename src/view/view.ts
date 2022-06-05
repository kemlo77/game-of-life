import { Grid } from '../model/grid';
import { CellPainter } from './cellpainters/cellpainter';
import { SmoothCellPainter } from './cellpainters/smoothpainter';

export class View {

    private _cellPainter: CellPainter = new SmoothCellPainter();

    set cellPainter(cellPainter: CellPainter) {
        this._cellPainter = cellPainter;
    }

    redrawGrid(grid: Grid): void {
        this._cellPainter.clearTheCanvas();
        this._cellPainter.plotCells(grid);
    }

}