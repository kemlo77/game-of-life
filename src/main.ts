import './style.css';
import { Grid } from './model/grid';
import { View } from './view/view';
import { ClassicView } from './view/classicview';
import { RainbowColoredView } from './view/rainbowcoloredview';
import { AgedView } from './view/agedview';


const grid: Grid = new Grid(40, 40);

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
grid.cellAt(39, 39).live();

//acorn
grid.cellAt(24, 24).live();
grid.cellAt(25, 24).live();
grid.cellAt(28, 24).live();
grid.cellAt(29, 24).live();
grid.cellAt(30, 24).live();
grid.cellAt(27, 23).live();
grid.cellAt(25, 22).live();


//const view: View = new ClassicView();
const view: View = new RainbowColoredView();
//const view: View = new AgedView();

function myFunction(): void {

    view.clearTheCanvas();
    //view.clearTheCanvas();


    view.plotLivingCells(grid.allCells());
    grid.evolve();

    //view.plotConnections(grid.cellAt(18, 18));






}

document.getElementById('evolveButton').addEventListener('click', () => myFunction());