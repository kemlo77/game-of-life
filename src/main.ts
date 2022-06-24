import './style.css';
import { Grid } from './model/grid';
import { View } from './view/view';
import { CellPainterFactory } from './view/cellpainters/cellpainterfactory';
import { Coordinate } from './view/coordinate';



const grid: Grid = new Grid(60, 60);
const view: View = new View(grid);
let running: boolean = false;
let handle: any;

//Glider
grid.cellAt(29, 1).live();
grid.cellAt(29, 2).live();
grid.cellAt(29, 3).live();
grid.cellAt(28, 3).live();
grid.cellAt(27, 2).live();

//Penta-decathlon
grid.cellAt(10, 10).live();
grid.cellAt(10, 11).live();
grid.cellAt(9, 12).live();
grid.cellAt(11, 12).live();
grid.cellAt(10, 13).live();
grid.cellAt(10, 14).live();
grid.cellAt(10, 15).live();
grid.cellAt(10, 16).live();
grid.cellAt(9, 17).live();
grid.cellAt(11, 17).live();
grid.cellAt(10, 18).live();
grid.cellAt(10, 19).live();

//Toad
grid.cellAt(4, 3).live();
grid.cellAt(5, 3).live();
grid.cellAt(6, 3).live();
grid.cellAt(5, 4).live();
grid.cellAt(6, 4).live();
grid.cellAt(7, 4).live();

//light-weight spaceship
grid.cellAt(12, 5).live();
grid.cellAt(12, 7).live();
grid.cellAt(13, 8).live();
grid.cellAt(14, 8).live();
grid.cellAt(15, 8).live();
grid.cellAt(16, 8).live();
grid.cellAt(16, 7).live();
grid.cellAt(16, 6).live();
grid.cellAt(15, 5).live();


//corners
grid.cellAt(0, 0).live();
grid.cellAt(59, 59).live();

//xxx
grid.cellAt(30, 27).live();
grid.cellAt(30, 28).live();
grid.cellAt(30, 29).live();
grid.cellAt(31, 26).live();
grid.cellAt(32, 26).live();
grid.cellAt(33, 27).live();
grid.cellAt(32, 28).live();

//Z-hexomino
grid.cellAt(10, 27).live();
grid.cellAt(11, 27).live();
grid.cellAt(11, 28).live();
grid.cellAt(11, 29).live();
grid.cellAt(11, 30).live();
grid.cellAt(12, 30).live();


function toggleRunning(): void {
    if (running) {
        running = false;
        clearInterval(handle);
    } else {
        running = true;
        handle = setInterval(() => takeAStep(), 500);
    }
}

function takeAStep(): void {
    grid.evolve();
    view.redrawGrid();
}

function changeCellPainter(cellPaintertype: string): void {
    view.cellPainter = CellPainterFactory.getCellPainter(cellPaintertype);
    view.redrawGrid();
}

function canvasLeftClicked(event: MouseEvent, canvasId: string): void {
    const coordinate: Coordinate = getMouseCoordinate(event, canvasId);
    grid.cellAt(Math.floor(coordinate.x / view.cellWidth), Math.floor(coordinate.y / view.cellWidth)).toggleLifeDeath();
    view.redrawGrid();
}

function getMouseCoordinate(event: MouseEvent, elementId: string): Coordinate {
    const rect: DOMRect = document.getElementById(elementId).getBoundingClientRect();
    const x: number = event.clientX - rect.left;
    const y: number = event.clientY - rect.top;
    return new Coordinate(x, y);
}

function canvasMouseMovement(event: MouseEvent, canvasId: string): void {
    const mousePosition: Coordinate = getMouseCoordinate(event, canvasId);
    view.removePreviousMouseCellPosition();
    view.drawMouseCellPosition(mousePosition);
}

function canvasMouseOut(): void {
    view.removePreviousMouseCellPosition();
}

function killAll(): void {
    const reallyKillAll: boolean = confirm('Do you want to kill every cell?');
    if (reallyKillAll) {
        grid.killAll();
        view.redrawGrid();
    }
}

function keyPressed(event: KeyboardEvent): void {
    switch (event.key) {
        case 'w': toggleRunning(); break;
        case 'e': takeAStep(); break;
        case 'r': changeCellPainter('ribbon'); break;
        case 'a': changeCellPainter('age'); break;
        case 's': changeCellPainter('smooth'); break;
        case 'd': changeCellPainter('circular'); break;
        case 'f': changeCellPainter('molecule'); break;
        case 'x': killAll(); break;
        case 'c': changeCellPainter('classic'); break;
        case 'v': changeCellPainter('neighbours'); break;
    }
}

document.getElementById('stepButton').addEventListener('click', () => takeAStep());
document.getElementById('classicButton').addEventListener('click', () => changeCellPainter('classic'));
document.getElementById('circularButton').addEventListener('click', () => changeCellPainter('circular'));
document.getElementById('smoothButton').addEventListener('click', () => changeCellPainter('smooth'));
document.getElementById('cellAgeButton').addEventListener('click', () => changeCellPainter('age'));
document.getElementById('neigbourcountButton').addEventListener('click', () => changeCellPainter('neighbours'));
document.getElementById('ribbonButton').addEventListener('click', () => changeCellPainter('ribbon'));
document.getElementById('moleculeButton').addEventListener('click', () => changeCellPainter('molecule'));
document.getElementById('startStopButton').addEventListener('click', () => toggleRunning());

document.getElementById('killAllButton').addEventListener('click', () => killAll());

const foreground: HTMLCanvasElement = document.getElementById('foreground') as HTMLCanvasElement;
foreground.addEventListener('click', (event) => canvasLeftClicked(event, (event.target as Element).id));
foreground.addEventListener('mousemove', (event) => canvasMouseMovement(event, (event.target as Element).id));
foreground.addEventListener('mouseout', (event) => canvasMouseOut());

document.addEventListener('keydown', (event) => keyPressed(event));

addEventListener('load', () => view.adjustCanvas());
addEventListener('resize', () => view.delayedAdjustCanvas());