export class Cell {

    private _neighbours: Cell[] = [];
    private _age = 0;
    private _x = 0;
    private _y = 0;
    private _killMe: () => void = () => this.die();
    private _doNothing: () => void = () => { return; };
    private _reviveMe: () => void = () => this.live();
    private _plannedFate: () => void = this._doNothing;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    get age(): number { return this._age; }

    get x(): number { return this._x; }

    get y(): number { return this._y; }

    addNeighbour(cell: Cell): void { this._neighbours.push(cell); }

    get numberOfNeighbours(): number { return this._neighbours.length; }

    get isAlive(): boolean { return this._age > 0; }

    get isDead(): boolean { return this._age == 0; }

    live(): void { this._age += 1; }

    die(): void { this._age = 0; }

    get livingNeighbours(): number { return this._neighbours.filter(cell => cell.isAlive).length; }

    planFate(): void {
        if (this.isAlive && (this.livingNeighbours !== 2 && this.livingNeighbours !== 3)) {
            this._plannedFate = this._killMe;
            return;
        }

        if (this.isDead && this.livingNeighbours == 3) {
            this._plannedFate = this._reviveMe;
            return;
        }
    }

    executeFate(): void {
        this._plannedFate();
        this._plannedFate = this._doNothing;
    }
}