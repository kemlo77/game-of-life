import './style.css';
import { Grid } from './model/grid';
import { View } from './view/view';
import { ClassicView } from './view/classicview';
import { RainbowColoredView } from './view/rainbowcoloredview';
import { AgedView } from './view/agedview';
import { RoundedView } from './view/roundedview';
import { CircleView } from './view/circleview';
import { RoundedViewOld } from './view/roundedviewold';


const grid: Grid = new Grid(50, 45);
let view: View = new ClassicView();

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
grid.cellAt(49, 44).live();

//acorn
grid.cellAt(24, 24).live();
grid.cellAt(25, 24).live();
grid.cellAt(28, 24).live();
grid.cellAt(29, 24).live();
grid.cellAt(30, 24).live();
grid.cellAt(27, 23).live();
grid.cellAt(25, 22).live();


//const view: View = new RainbowColoredView();
//const view: View = new AgedView();

function evolveAndPaint(): void {
    grid.evolve();
    view.redrawLivingCells(grid.allCells());
}

function changeToRounded(): void {
    view = new RoundedView();
    view.redrawLivingCells(grid.allCells());
}

function changeToOldRounded(): void {
    view = new RoundedViewOld();
    view.redrawLivingCells(grid.allCells());
}

function changeToClassic(): void {
    view = new ClassicView();
    view.redrawLivingCells(grid.allCells());
}

function changeToCircle(): void {
    view = new CircleView();
    view.redrawLivingCells(grid.allCells());
}

function changeToAged(): void {
    view = new AgedView();
    view.redrawLivingCells(grid.allCells());
}

function changeToRainbow(): void {
    view = new RainbowColoredView();
    view.redrawLivingCells(grid.allCells());
}



document.getElementById('evolveButton').addEventListener('click', () => evolveAndPaint());
document.getElementById('classicViewButton').addEventListener('click', () => changeToClassic());
document.getElementById('circleViewButton').addEventListener('click', () => changeToCircle());
document.getElementById('roundedViewButton').addEventListener('click', () => changeToRounded());
document.getElementById('oldRoundedViewButton').addEventListener('click', () => changeToOldRounded());
document.getElementById('agedViewButton').addEventListener('click', () => changeToAged());
document.getElementById('rainbowViewButton').addEventListener('click', () => changeToRainbow());
