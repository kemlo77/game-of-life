import { AgePainter } from './agepainter';
import { CellPainter } from './cellpainter';
import { CircularPainter } from './circularpainter';
import { ClassicPainter } from './classicpainter';
import { MoleculePainter } from './moleculepainter';
import { RibbonPainter } from './ribbonpainter';
import { NeighboursCountPainter } from './neighbourcountpainter';
import { SmoothCellPainter } from './smoothpainter';

//TODO: döpa om till factory?
export class CellPainterFactory {


    static getCellPainter(painterType: string): CellPainter {
        switch (painterType) {
            case 'circular': return new CircularPainter();
            case 'smooth': return new SmoothCellPainter();
            case 'age': return new AgePainter();
            case 'neighbours': return new NeighboursCountPainter();
            case 'ribbon': return new RibbonPainter();
            case 'molecule': return new MoleculePainter();
            default: return new ClassicPainter();
        }
    }

}