import { Cell } from '../../model/cell';

export class CanvasPainter {

    protected canvasElement: HTMLCanvasElement = document.getElementById('myCanvas') as HTMLCanvasElement;
    protected canvasCtx: CanvasRenderingContext2D = this.canvasElement.getContext('2d');
    protected gridCellWidth = 20;

    clearTheCanvas(): void {
        this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }

    clearTheCanvasPartially(): void {
        this.canvasCtx.fillStyle = 'rgba(255,255,255,0.85)';
        this.canvasCtx.rect(0, 0, this.canvasElement.width, this.canvasElement.height);
        this.canvasCtx.fill();
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

    //TODO: bättre namn
    protected paintThinLineBetweenCells(cell1: Cell, cell2: Cell, width: number): void {
        this.canvasCtx.strokeStyle = 'rgba(0,0,0,1)';
        this.canvasCtx.lineWidth = width;
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

    paintCellsAsHollowDots(cells: Cell[], outerColor: string, innerColor: string): void {
        this.paintCircles(cells, outerColor, this.gridCellWidth * 0.32);
        this.paintCircles(cells, innerColor, this.gridCellWidth * 0.2);
    }


    protected paintWhiteCircle(cell: Cell): void { this.paintWhiteCircles([cell]); }

    protected paintBlackCircle(cell: Cell): void { this.paintBlackCircles([cell]); }

    protected paintWhiteCircles(cells: Cell[]): void {
        this.paintCircles(cells, 'rgba(255,255,255,1)', this.gridCellWidth / 2);
    }

    protected paintBlackCircles(cells: Cell[]): void {
        this.paintCircles(cells, 'rgba(0,0,0,1)', this.gridCellWidth / 2);
    }

    protected paintCircles(cells: Cell[], color: string, width: number): void {
        const radius: number = width;
        this.canvasCtx.fillStyle = color;
        cells.forEach(cell => {
            this.canvasCtx.beginPath();
            this.canvasCtx.arc(this.adjustX(cell.x), this.adjustY(cell.y), radius, 0, 2 * Math.PI);
            this.canvasCtx.fill();
        });
    }

    protected paintSquares(cells: Cell[], color: string): void {
        this.canvasCtx.fillStyle = color;
        this.canvasCtx.beginPath(); //varför måste jag ha med detta för att färgändring ska slå igenom
        this.canvasCtx.stroke();    // dito
        const squareWidth: number = this.gridCellWidth - 2;
        cells.forEach(cell => {
            const xAdjusted: number = this.gridCellWidth / 2 + cell.x * this.gridCellWidth;
            const yAdjusted: number = this.gridCellWidth / 2 + cell.y * this.gridCellWidth;
            this.canvasCtx.rect(xAdjusted - squareWidth / 2, yAdjusted - squareWidth / 2, squareWidth, squareWidth);
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