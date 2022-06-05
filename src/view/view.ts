import { Grid } from '../model/grid';
import { CellPainter } from './cellpainters/cellpainter';
import { TrussPainter } from './cellpainters/trusspainter';

export class View {

    private _cellPainter: CellPainter = new TrussPainter();

    set cellPainter(cellPainter: CellPainter) {
        this._cellPainter = cellPainter;
    }

    redrawGrid(grid: Grid): void {
        this._cellPainter.clearTheCanvas();
        this._cellPainter.plotCells(grid);
    }

}