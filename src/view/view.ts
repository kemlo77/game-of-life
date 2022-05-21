import { Cell } from '../model/cell';

export abstract class View {


    protected canvasElement: HTMLCanvasElement = document.getElementById('myCanvas') as HTMLCanvasElement;
    protected canvasCtx: CanvasRenderingContext2D = this.canvasElement.getContext('2d');
    protected gridCellWidth = 25;


    clearTheCanvas(): void {
        this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }

    redrawLivingCells(allCells: Cell[]): void {
        this.clearTheCanvas();
        const livingCells: Cell[] = allCells.filter(cell => cell.isAlive);
        this.plotCells(livingCells, this.getColor());
    }

    getColor(): string {
        return 'rgba(0,0,0,1)';
    }


    plotCells(cells: Cell[], givenColor: string): void {
        this.canvasCtx.fillStyle = givenColor;
        this.canvasCtx.beginPath(); //varför måste jag ha med detta för att färgändring ska slå igenom
        this.canvasCtx.stroke();    // dito
        const cellPadding: number = 1;
        const squareWidth: number = this.gridCellWidth - 2 * cellPadding;
        cells.forEach(cell => {
            const xAdjusted: number = cell.x * this.gridCellWidth;
            const yAdjusted: number = cell.y * this.gridCellWidth;
            this.canvasCtx.rect(xAdjusted + cellPadding, yAdjusted + cellPadding, squareWidth, squareWidth);
            this.canvasCtx.fill();
        });

    }


    protected paintWhiteCircle(cell: Cell): void {
        this.paintCircle(cell, 'rgba(255,255,255,1)');
    }

    protected paintBlackCircle(cell: Cell): void {
        this.paintCircle(cell, 'rgba(0,0,0,1)');
    }

    protected paintLineBetweenCells(cell1: Cell, cell2: Cell): void {
        this.canvasCtx.fillStyle = 'rgba(0,0,0,1)';
        this.canvasCtx.lineWidth = this.gridCellWidth;
        this.canvasCtx.lineCap = 'round';
        this.canvasCtx.beginPath();
        this.canvasCtx.moveTo(this.adjustX(cell1.x), this.adjustY(cell1.y));
        this.canvasCtx.lineTo(this.adjustX(cell2.x), this.adjustY(cell2.y));
        this.canvasCtx.stroke();
    }

    private paintCircle(cell: Cell, color: string): void {
        const radius: number = this.gridCellWidth / 2;
        this.canvasCtx.fillStyle = color;
        this.canvasCtx.beginPath();
        this.canvasCtx.arc(this.adjustX(cell.x), this.adjustY(cell.y), radius, 0, 2 * Math.PI);
        this.canvasCtx.fill();
    }

    protected paintWhiteCircles(cells: Cell[]): void {
        this.paintCircles(cells, 'rgba(255,255,255,1)');
    }

    protected paintBlackCircles(cells: Cell[]): void {
        this.paintCircles(cells, 'rgba(0,0,0,1)');
    }

    private paintCircles(cells: Cell[], color: string): void {
        const radius: number = this.gridCellWidth / 2;
        this.canvasCtx.fillStyle = color;
        cells.forEach(cell => {
            this.canvasCtx.beginPath();
            this.canvasCtx.arc(this.adjustX(cell.x), this.adjustY(cell.y), radius, 0, 2 * Math.PI);
            this.canvasCtx.fill();
        });
    }

    private adjustX(x: number): number {
        return x * this.gridCellWidth + this.gridCellWidth / 2;
    }

    private adjustY(y: number): number {
        return y * this.gridCellWidth + this.gridCellWidth / 2;
    }






}