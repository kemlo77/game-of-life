import { AgedCellPainter } from './agedcellpainter';
import { CellPainter } from './cellpainter';
import { CircleCellPainter } from './circlecellpainter';
import { ClassicCellPainter } from './classiccellpainter';
import { MoleculeCellPainter } from './moleculecellpainter';
import { MoleculeCellPainterThree } from './moleculecellpainterthree';
import { MoleculeCellPainterTwo } from './moleculecellpaintertwo';
import { OldRoundedCellPainter } from './oldroundedcellpainter';
import { RainbowCellPainter } from './rainbowcellpainter';
import { RoundedCellPainter } from './roundedcellpainter';

//TODO: döpa om till factory?
export class CellPainterProvider {


    static getCellPainter(painterType: string): CellPainter {
        switch (painterType) {
            case 'circle': return new CircleCellPainter();
            case 'rounded': return new RoundedCellPainter();
            case 'oldRounded': return new OldRoundedCellPainter();
            case 'aged': return new AgedCellPainter();
            case 'rainbow': return new RainbowCellPainter();
            case 'molecule': return new MoleculeCellPainter();
            case 'moleculeTwo': return new MoleculeCellPainterTwo();
            case 'moleculeThree': return new MoleculeCellPainterThree();
            default: return new ClassicCellPainter();
        }
    }

}