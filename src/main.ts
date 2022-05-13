import './style.css';
import { Grid } from './grid';
import { Cell } from './cell';

function myFunction(): void {
    const inputElement: HTMLInputElement = (document.getElementById('textInput') as HTMLInputElement);
    const inputText: string = inputElement.value;

    inputElement.value = "hoho";
    const grid: Grid = new Grid(10, 10);
    const cell1: Cell = new Cell(0, 1);

    const nb1: Cell = new Cell(0, 1);
    nb1.live();
    cell1.addNeighbour(nb1);

    const nb2: Cell = new Cell(0, 1);
    nb2.live();
    cell1.addNeighbour(nb2);

    const nb3: Cell = new Cell(0, 1);
    nb3.live();
    //cell1.addNeighbour(nb3);

    const nb4: Cell = new Cell(0, 1);
    nb4.live();
    //cell1.addNeighbour(nb4);

    cell1.planFate();
    cell1.executeFate();
    console.log("cell1 is alive: " + cell1.isAlive);

}

document.getElementById('reverseButton').addEventListener('click', () => myFunction());