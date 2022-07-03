import './style.css';
import { Grid } from './model/grid';
import { View } from './view/view';
import { Coordinate } from './view/coordinate';
import { AnimatorService } from './model/animator.service';



const grid: Grid = new Grid(60, 60);
const view: View = new View(grid);
let running: boolean = false;
let handle: any;

//Glider
AnimatorService.createGlider(grid,27,1);
AnimatorService.createZhexomino(grid,10,27);
AnimatorService.createLightWeightSpaceship(grid,12,5);
AnimatorService.createPentaDecathlon(grid,9,10);
AnimatorService.createToad(grid,4,3);
AnimatorService.createCorners(grid);
AnimatorService.createMidpoints(grid);


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
    evolveAllCellsInGrid();
    view.redrawGrid();
}

function evolveAllCellsInGrid(): void {
    grid.allCells.forEach(cell => cell.planFate());
    grid.allCells.forEach(cell => cell.executeFate());
}

function changePainter(cellPaintertype: string): void {
    view.changePainter(cellPaintertype);
    view.redrawGrid();
}

function canvasLeftClicked(event: MouseEvent, canvasId: string): void {
    const coordinate: Coordinate = getMouseCoordinate(event, canvasId);
    view.getCellAtCoordinate(coordinate).toggleLifeDeath();
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
        killAllCellsInGrid();
        view.redrawGrid();
    }
}

function killAllCellsInGrid(): void {
    grid.allCells.forEach(cell => cell.die());
}

function keyPressed(event: KeyboardEvent): void {
    switch (event.key.toLowerCase()) {
        case 'w': toggleRunning(); break;
        case 'e': takeAStep(); break;
        case 'r': changePainter('ribbon'); break;
        case 'a': changePainter('age'); break;
        case 's': changePainter('smooth'); break;
        case 'd': changePainter('circular'); break;
        case 'f': changePainter('molecule'); break;
        case 'x': killAll(); break;
        case 'c': changePainter('classic'); break;
        case 'v': changePainter('neighbours'); break;
    }
}

document.getElementById('stepButton').addEventListener('click', () => takeAStep());
document.getElementById('classicButton').addEventListener('click', () => changePainter('classic'));
document.getElementById('circularButton').addEventListener('click', () => changePainter('circular'));
document.getElementById('smoothButton').addEventListener('click', () => changePainter('smooth'));
document.getElementById('cellAgeButton').addEventListener('click', () => changePainter('age'));
document.getElementById('neigbourcountButton').addEventListener('click', () => changePainter('neighbours'));
document.getElementById('ribbonButton').addEventListener('click', () => changePainter('ribbon'));
document.getElementById('moleculeButton').addEventListener('click', () => changePainter('molecule'));
document.getElementById('startStopButton').addEventListener('click', () => toggleRunning());

document.getElementById('killAllButton').addEventListener('click', () => killAll());

const foreground: HTMLCanvasElement = document.getElementById('foreground') as HTMLCanvasElement;
foreground.addEventListener('click', (event) => canvasLeftClicked(event, (event.target as Element).id));
foreground.addEventListener('mousemove', (event) => canvasMouseMovement(event, (event.target as Element).id));
foreground.addEventListener('mouseout', () => canvasMouseOut());

document.addEventListener('keydown', (event) => keyPressed(event));

addEventListener('load', () => view.adjustCanvas());
addEventListener('resize', () => view.delayedAdjustCanvas());