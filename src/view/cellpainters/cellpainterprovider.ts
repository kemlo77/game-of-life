import { AgedCellPainter } from './agedcellpainter';
import { CellPainter } from './cellpainter';
import { CircleCellPainter } from './circlecellpainter';
import { ClassicCellPainter } from './classiccellpainter';
import { MoleculeCellPainter } from './moleculecellpainter';
import { MoleculeCellPainterFour } from './moleculecellpainterfour';
import { MoleculeCellPainterThree } from './moleculecellpainterthree';
import { NeighboursCellPainter } from './neighbourscellpainter';
import { OldRoundedCellPainter } from './oldroundedcellpainter';
import { RoundedCellPainter } from './roundedcellpainter';

//TODO: döpa om till factory?
export class CellPainterProvider {


    static getCellPainter(painterType: string): CellPainter {
        switch (painterType) {
            case 'circle': return new CircleCellPainter();
            case 'rounded': return new RoundedCellPainter();
            case 'oldRounded': return new OldRoundedCellPainter();
            case 'aged': return new AgedCellPainter();
            case 'neighbours': return new NeighboursCellPainter();
            case 'molecule': return new MoleculeCellPainter();
            case 'moleculeThree': return new MoleculeCellPainterThree();
            case 'moleculeFour': return new MoleculeCellPainterFour();
            default: return new ClassicCellPainter();
        }
    }

}