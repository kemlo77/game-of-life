import './style.css';
import { Grid } from './model/grid';
import { View } from './view/view';
import { CellPainterProvider } from './view/cellpainters/cellpainterprovider';
import { Coordinate } from './view/coordinate';



const grid: Grid = new Grid(60, 55);
const view: View = new View();

//Glider
grid.cellAt(15, 1).live();
grid.cellAt(15, 2).live();
grid.cellAt(15, 3).live();
grid.cellAt(16, 3).live();
grid.cellAt(17, 2).live();

//Toad
grid.cellAt(4, 3).live();
grid.cellAt(5, 3).live();
grid.cellAt(6, 3).live();
grid.cellAt(5, 4).live();
grid.cellAt(6, 4).live();
grid.cellAt(7, 4).live();

//corner
grid.cellAt(0, 0).live();
grid.cellAt(59, 54).live();

//xxx
grid.cellAt(30, 27).live();
grid.cellAt(30, 28).live();
grid.cellAt(30, 29).live();
grid.cellAt(31, 26).live();
grid.cellAt(32, 26).live();
grid.cellAt(33, 27).live();
grid.cellAt(32, 28).live();


function evolveAndPaint(): void {
    grid.evolve();
    view.redrawGrid(grid);
}

function changeCellPainter(cellPaintertype: string): void {
    view.cellPainter = CellPainterProvider.getCellPainter(cellPaintertype);
    view.redrawGrid(grid);
}

function canvasLeftClicked(event: MouseEvent, canvasId: string): void {
    const coordinate: Coordinate = getMouseCoordinate(event, canvasId);
    grid.cellAt(Math.floor(coordinate.x / 20), Math.floor(coordinate.y / 20)).toggleLifeDeath();
    view.redrawGrid(grid);
}

function getMouseCoordinate(event: MouseEvent, elementId: string): Coordinate {
    const rect: DOMRect = document.getElementById(elementId).getBoundingClientRect();
    const x: number = event.clientX - rect.left;
    const y: number = event.clientY - rect.top;
    return new Coordinate(x, y);
}

function killAll(): void {
    grid.killAll();
    view.redrawGrid(grid);
}

function keyPressed(event: KeyboardEvent): void {
    switch (event.key) {
        case '1': changeCellPainter('classic'); break;
        case '2': changeCellPainter('circle'); break;
        case '3': changeCellPainter('rounded'); break;
        case '4': changeCellPainter('oldRounded'); break;
        case 'e': evolveAndPaint(); break;
    }
}

document.getElementById('evolveButton').addEventListener('click', () => evolveAndPaint());
document.getElementById('classicButton').addEventListener('click', () => changeCellPainter('classic'));
document.getElementById('circleButton').addEventListener('click', () => changeCellPainter('circle'));
document.getElementById('roundedButton').addEventListener('click', () => changeCellPainter('rounded'));
document.getElementById('oldRoundedButton').addEventListener('click', () => changeCellPainter('oldRounded'));
document.getElementById('agedButton').addEventListener('click', () => changeCellPainter('aged'));
document.getElementById('neigboursButton').addEventListener('click', () => changeCellPainter('neighbours'));
document.getElementById('moleculeButton').addEventListener('click', () => changeCellPainter('molecule'));
document.getElementById('moleculeThreeButton').addEventListener('click', () => changeCellPainter('moleculeThree'));
document.getElementById('moleculeFourButton').addEventListener('click', () => changeCellPainter('moleculeFour'));

document.getElementById('killAllButton').addEventListener('click', () => killAll());

document.getElementById('myCanvas')
    .addEventListener('click', (event) => canvasLeftClicked(event, (event.target as Element).id));

document.addEventListener('keydown', (event) => keyPressed(event));