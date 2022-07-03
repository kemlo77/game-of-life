import { AgePainter } from './agepainter';
import { CellPainter } from './cellpainter';
import { CircularPainter } from './circularpainter';
import { ClassicPainter } from './classicpainter';
import { MoleculePainter } from './moleculepainter';
import { RibbonPainter } from './ribbonpainter';
import { NeighboursCountPainter } from './neighbourcountpainter';
import { SmoothCellPainter } from './smoothpainter';
import { Canvas } from '../canvas/canvas';

export class CellPainterFactory {


    static getCellPainter(painterType: string, canvas: Canvas): CellPainter {
        switch (painterType) {
            case 'circular': return new CircularPainter(canvas);
            case 'smooth': return new SmoothCellPainter(canvas);
            case 'age': return new AgePainter(canvas);
            case 'neighbours': return new NeighboursCountPainter(canvas);
            case 'ribbon': return new RibbonPainter(canvas);
            case 'molecule': return new MoleculePainter(canvas);
            default: return new ClassicPainter(canvas);
        }
    }

}