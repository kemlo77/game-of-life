export class Cell {

    private _neighbours: Cell[] = [];
    private _age = 0;
    private killMe: () => void = () => this.die();
    private doNothing: () => void = () => { return; };
    private reviveMe: () => void = () => this.live();
    private _plannedFate: () => void = this.doNothing;

    private constructor(age: number) { this._age = age; }

    static livingCell(): Cell { return new Cell(1); }

    static deadCell(): Cell { return new Cell(0); }

    get age(): number { return this._age; }

    addNeighbour(cell: Cell): void { this._neighbours.push(cell); }

    get numberOfNeighbours(): number { return this._neighbours.length; }

    get isAlive(): boolean { return this._age > 0; }

    get isDead(): boolean { return this._age == 0; }

    live(): void { this._age += 1; }

    die(): void { this._age = 0; }

    get livingNeighbours(): number { return this._neighbours.filter(cell => cell.isAlive).length; }

    planFate(): void {
        if (this.isAlive && (this.livingNeighbours < 2 || this.livingNeighbours > 3)) {
            this._plannedFate = this.killMe;
            return;
        }

        if (this.isDead && this.livingNeighbours == 3) {
            this._plannedFate = this.reviveMe;
            return;
        }

    }

    executeFate(): void {
        this._plannedFate();
        this._plannedFate = this.doNothing;
    }
}