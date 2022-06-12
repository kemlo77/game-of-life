import { CellAgePainter } from './cellagepainter';
import { CellPainter } from './cellpainter';
import { CircularCellPainter } from './circularcellpainter';
import { ClassicCellPainter } from './classiccellpainter';
import { MoleculePainter } from './moleculepainter';
import { RibbonPainter } from './ribbonpainter';
import { NeighboursCountPainter } from './neighbourcountpainter';
import { SmoothCellPainter } from './smoothpainter';

//TODO: döpa om till factory?
export class CellPainterProvider {


    static getCellPainter(painterType: string): CellPainter {
        switch (painterType) {
            case 'circular': return new CircularCellPainter();
            case 'smooth': return new SmoothCellPainter();
            case 'age': return new CellAgePainter();
            case 'neighbours': return new NeighboursCountPainter();
            case 'ribbon': return new RibbonPainter();
            case 'molecule': return new MoleculePainter();
            default: return new ClassicCellPainter();
        }
    }

}