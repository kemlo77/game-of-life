import { Grid } from '../model/grid';
import { CellPainter } from './cellpainters/cellpainter';
import { ForegroundPainter } from './cellpainters/foregroundpainter';
import { SmoothCellPainter } from './cellpainters/smoothpainter';
import { Coordinate } from './coordinate';

export class View {

    private _cellPainter: CellPainter = new SmoothCellPainter();
    private _foregroundPainter: ForegroundPainter = new ForegroundPainter();

    set cellPainter(cellPainter: CellPainter) {
        this._cellPainter = cellPainter;
    }

    redrawGrid(grid: Grid): void {
        this._cellPainter.clearTheCanvas();
        this._cellPainter.plotCells(grid);
    }

    drawMouseCellPosition(position: Coordinate): void {
        this._foregroundPainter.colorCellOnMousePosition(position);
    }

    removePreviousMouseCellPosition(): void {
        this._foregroundPainter.clearThePreviousCellOnCanvas();
    }

}