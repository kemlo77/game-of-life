import { Grid } from './grid';

export class AnimatorService {

    static createPentaDecathlon(grid: Grid, posX: number, posY: number): void {
        grid.cellAt(posX + 1, posY + 0).live();
        grid.cellAt(posX + 1, posY + 1).live();
        grid.cellAt(posX + 0, posY + 2).live();
        grid.cellAt(posX + 2, posY + 2).live();
        grid.cellAt(posX + 1, posY + 3).live();
        grid.cellAt(posX + 1, posY + 4).live();
        grid.cellAt(posX + 1, posY + 5).live();
        grid.cellAt(posX + 1, posY + 6).live();
        grid.cellAt(posX + 0, posY + 7).live();
        grid.cellAt(posX + 2, posY + 7).live();
        grid.cellAt(posX + 1, posY + 8).live();
        grid.cellAt(posX + 1, posY + 9).live();
    }

    static createToad(grid: Grid, posX: number, posY: number): void {
        grid.cellAt(posX + 0, posY + 0).live();
        grid.cellAt(posX + 1, posY + 0).live();
        grid.cellAt(posX + 2, posY + 0).live();
        grid.cellAt(posX + 1, posY + 1).live();
        grid.cellAt(posX + 2, posY + 1).live();
        grid.cellAt(posX + 3, posY + 1).live();
    }
    
    static createLightWeightSpaceship(grid: Grid, posX: number, posY: number): void {
        grid.cellAt(posX + 0, posY + 0).live();
        grid.cellAt(posX + 0, posY + 2).live();
        grid.cellAt(posX + 1, posY + 3).live();
        grid.cellAt(posX + 2, posY + 3).live();
        grid.cellAt(posX + 3, posY + 3).live();
        grid.cellAt(posX + 4, posY + 3).live();
        grid.cellAt(posX + 4, posY + 2).live();
        grid.cellAt(posX + 4, posY + 1).live();
        grid.cellAt(posX + 3, posY + 0).live();
    }
    
    static createGlider(grid: Grid, posX: number, posY: number): void {
        grid.cellAt(posX+2, posY+0).live();
        grid.cellAt(posX+2, posY+1).live();
        grid.cellAt(posX+2, posY+2).live();
        grid.cellAt(posX+1, posY+2).live();
        grid.cellAt(posX+0, posY+1).live();
    }
    
    static createZhexomino(grid: Grid, posX: number, posY: number): void {
        grid.cellAt(posX + 0, posY + 0).live();
        grid.cellAt(posX + 1, posY + 0).live();
        grid.cellAt(posX + 1, posY + 1).live();
        grid.cellAt(posX + 1, posY + 2).live();
        grid.cellAt(posX + 1, posY + 3).live();
        grid.cellAt(posX + 2, posY + 3).live();
    }

    static createCorners(grid: Grid): void {
        grid.cellAt(0, 0).live();
        grid.cellAt(grid.numberOfColumns -1, grid.numberOfRows -1).live();
    }
    
    static createMidpoints(grid: Grid): void {
        grid.cellAt(grid.numberOfColumns / 2, grid.numberOfRows / 2).live();
    }

}