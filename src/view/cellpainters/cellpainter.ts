import { Grid } from '../../model/grid';
import { CanvasPainter } from './canvaspainter';

export abstract class CellPainter extends CanvasPainter {

    abstract plotCells(grid: Grid): void;

    abstract clearTheCanvas(): void;



}