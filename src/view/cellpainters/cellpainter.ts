import { Cell } from '../../model/cell';
import { CanvasPainter } from './canvaspainter';

export abstract class CellPainter extends CanvasPainter {

    abstract plotCells(cells: Cell[], givenColor: string): void;

    abstract clearTheCanvas(): void;



}