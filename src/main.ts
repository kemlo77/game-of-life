import './style.css';
import { Grid } from './model/grid';
import { View } from './view/view';
import { CellPainterProvider } from './view/cellpainters/cellpainterprovider';



const grid: Grid = new Grid(50, 45);
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
grid.cellAt(49, 44).live();

//acorn
grid.cellAt(24, 24).live();
grid.cellAt(25, 24).live();
grid.cellAt(28, 24).live();
grid.cellAt(29, 24).live();
grid.cellAt(30, 24).live();
grid.cellAt(27, 23).live();
grid.cellAt(25, 22).live();


function evolveAndPaint(): void {
    grid.evolve();
    view.redrawGrid(grid);
}

function changeCellPainter(cellPaintertype: string): void {
    view.cellPainter = CellPainterProvider.getCellPainter(cellPaintertype);
    view.redrawGrid(grid);
}



document.getElementById('evolveButton').addEventListener('click', () => evolveAndPaint());
document.getElementById('classicButton').addEventListener('click', () => changeCellPainter('classic'));
document.getElementById('circleButton').addEventListener('click', () => changeCellPainter('circle'));
document.getElementById('roundedButton').addEventListener('click', () => changeCellPainter('rounded'));
document.getElementById('oldRoundedButton').addEventListener('click', () => changeCellPainter('oldRounded'));
document.getElementById('agedButton').addEventListener('click', () => changeCellPainter('aged'));
document.getElementById('rainbowButton').addEventListener('click', () => changeCellPainter('rainbow'));
document.getElementById('moleculeButton').addEventListener('click', () => changeCellPainter('molecule'));
document.getElementById('moleculeTwoButton').addEventListener('click', () => changeCellPainter('moleculeTwo'));
document.getElementById('moleculeThreeButton').addEventListener('click', () => changeCellPainter('moleculeThree'));
document.getElementById('connectionButton').addEventListener('click', () => changeCellPainter('connection'));
