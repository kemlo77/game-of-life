import './style.css';
import { Grid } from './model/grid';
import { View } from './view/view';
import { CellPainterFactory } from './view/cellpainters/cellpainterfactory';
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
    grid.evolve();
    view.redrawGrid();
}

function changeCellPainter(cellPaintertype: string): void {
    view.cellPainter = CellPainterFactory.getCellPainter(cellPaintertype);
    view.redrawGrid();
}

function canvasLeftClicked(event: MouseEvent, canvasId: string): void {
    const coordinate: Coordinate = getMouseCoordinate(event, canvasId);
    view.getClickedCell(coordinate).toggleLifeDeath();
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
    switch (event.key.toLowerCase()) {
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