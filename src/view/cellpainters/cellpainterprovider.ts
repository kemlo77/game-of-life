import { AgedCellPainter } from './agedcellpainter';
import { CellPainter } from './cellpainter';
import { CircleCellPainter } from './circlecellpainter';
import { ClassicCellPainter } from './classiccellpainter';
import { MoleculeCellPainter } from './moleculecellpainter';
import { OldRoundedCellPainter } from './oldroundedcellpainter';
import { RainbowCellPainter } from './rainbowcellpainter';
import { RoundedCellPainter } from './roundedcellpainter';

export class CellPainterProvider {


    static getCellPainter(painterType: string): CellPainter {
        if (painterType === 'circle') {
            return new CircleCellPainter();
        }
        if (painterType === 'rounded') {
            return new RoundedCellPainter();
        }
        if (painterType === 'oldRounded') {
            return new OldRoundedCellPainter();
        }
        if (painterType === 'aged') {
            return new AgedCellPainter();
        }
        if (painterType === 'rainbow') {
            return new RainbowCellPainter();
        }
        if (painterType === 'molecule') {
            return new MoleculeCellPainter();
        }
        return new ClassicCellPainter();
    }

}