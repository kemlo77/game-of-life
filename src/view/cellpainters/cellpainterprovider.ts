import { AgedCellPainter } from './agedcellpainter';
import { CellPainter } from './cellpainter';
import { CircularCellPainter } from './circularcellpainter';
import { ClassicCellPainter } from './classiccellpainter';
import { TrussPainter } from './trusspainter';
import { MoleculePainter } from './moleculepainter';
import { RibbonPainter } from './ribbonpainter';
import { NeighboursCellPainter } from './neighbourscellpainter';
import { SmoothCellPainter } from './smoothpainter';

//TODO: döpa om till factory?
export class CellPainterProvider {


    static getCellPainter(painterType: string): CellPainter {
        switch (painterType) {
            case 'circular': return new CircularCellPainter();
            case 'smooth': return new SmoothCellPainter();
            case 'aged': return new AgedCellPainter();
            case 'neighbours': return new NeighboursCellPainter();
            case 'truss': return new TrussPainter();
            case 'ribbon': return new RibbonPainter();
            case 'molecule': return new MoleculePainter();
            default: return new ClassicCellPainter();
        }
    }

}