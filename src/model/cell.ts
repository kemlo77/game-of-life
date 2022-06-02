export class Cell {

    private _neighbours: Cell[] = [];
    private _age = 0;
    private _x = 0;
    private _y = 0;
    private _killMe: () => void = () => this.die();
    private _doNothing: () => void = () => { return; };
    private _reviveMe: () => void = () => this.live();
    private _continueLiving: () => void = () => this.live();
    private _plannedFate: () => void = this._doNothing;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    get age(): number { return this._age; }

    get x(): number { return this._x; }

    get y(): number { return this._y; }

    addNeighbour(cell: Cell): void { this._neighbours.push(cell); }

    get neigbours(): Cell[] {
        return this._neighbours;
    }

    get numberOfNeighbours(): number { return this._neighbours.length; }

    get numberOfLivingNeighbours(): number { return this.livingNeighbours.length; }

    get deadNeighbours(): Cell[] { return this._neighbours.filter(cell => cell.isDead); }
    get livingNeighbours(): Cell[] { return this._neighbours.filter(cell => cell.isAlive); }

    get orthogonalNeighbours(): Cell[] {
        return this._neighbours.filter(neigbour => {
            return this._x == neigbour.x || this._y == neigbour.y;
        });
    }
    get livingOrthogonalNeighbours(): Cell[] {
        return this.orthogonalNeighbours.filter(neighbour => neighbour.isAlive);
    }

    get diagonalNeighbours(): Cell[] {
        return this._neighbours.filter(neigbour => {
            return this._x !== neigbour.x && this._y !== neigbour.y;
        });
    }

    get livingDiagonalNeighbours(): Cell[] {
        return this.diagonalNeighbours.filter(neighbour => neighbour.isAlive);
    }

    get isAlive(): boolean { return this._age > 0; }

    get isDead(): boolean { return this._age == 0; }

    live(): void { this._age += 1; }

    die(): void { this._age = 0; }

    toggleLifeDeath(): void {
        if (this.isAlive) {
            this.die();
        } else {
            this.live();
        }
    }

    planFate(): void {
        if (this.isAlive) {
            if (this.numberOfLivingNeighbours == 2 || this.numberOfLivingNeighbours == 3) {
                this._plannedFate = this._continueLiving;
                return;
            } else {
                this._plannedFate = this._killMe;
                return;
            }
        }


        if (this.isDead && this.numberOfLivingNeighbours == 3) {
            this._plannedFate = this._reviveMe;
            return;
        }
    }

    executeFate(): void {
        this._plannedFate();
        this._plannedFate = this._doNothing;
    }
}