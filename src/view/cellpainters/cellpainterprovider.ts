import { AgedCellPainter } from './agedcellpainter';
import { CellPainter } from './cellpainter';
import { CircleCellPainter } from './circlecellpainter';
import { ClassicCellPainter } from './classiccellpainter';
import { ConnectionPainter } from './connectionPainter';
import { MoleculeCellPainter } from './moleculecellpainter';
import { MoleculeCellPainterFive } from './moleculecellpainterfive';
import { MoleculeCellPainterFour } from './moleculecellpainterfour';
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
            case 'moleculeFour': return new MoleculeCellPainterFour();
            case 'moleculeFive': return new MoleculeCellPainterFive();
            case 'connection': return new ConnectionPainter();
            default: return new ClassicCellPainter();
        }
    }

}