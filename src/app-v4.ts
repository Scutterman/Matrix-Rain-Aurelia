import {computedFrom} from "aurelia-framework";

export class App {
    private matrix: HTMLElement;
    private rows: MatrixRow[] = new Array<MatrixRow>();

    protected characterWidth: number;
    protected characterHeight: number;
    protected charactersInRow: number;
    protected rowsOnScreen: number;

    protected minSpeed: number = 30;
    protected maxSpeed: number = 70;

    protected minCharacterFactor: number = 0.5;
    protected minCharacters: number;
    
    protected minColumnDelay: number = 0;
    protected maxColumnDelay: number = 5;

    protected characters: string[] = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
    
    protected screenHeight: number;
    
    attached() {
        this.setWidthsAndHeights(this.matrix);
        
        for (let i: number = 0; i < this.charactersInRow; i++) {
            this.addRow();
        }

        setInterval(() => this.tick(), 25);
    }
    
    private tick() {
        this.rows.filter(value => value.doTick === true).forEach((value: MatrixRow) => {
            value.topPositioning += value.pixelsPerTick;

            if (value.topPositioning > this.screenHeight) {
                this.resetRow(value);
            }
        });
    }

    private addRow() {
        let row: MatrixRow = new MatrixRow();
        row.leftPosition = this.rows.length * this.characterWidth;
        row.rowWidth = this.characterWidth;
        this.resetRow(row);
        this.rows.push(row);
    }

    private resetRow(row: MatrixRow) {
        row.doTick = false;
        row.setRowText(this.rowsOnScreen, this.minCharacters, this.characters);
        row.pixelsPerTick = (App.getRandomNumberBetween(this.maxSpeed, this.minSpeed) / 10);
        row.topPositioning = this.characterHeight * row.charactersInRow * -1;
        setTimeout(() => {row.doTick = true}, App.getRandomNumberBetween(this.minColumnDelay, this.maxColumnDelay) * 1000)
    }

    private getTopRow(): MatrixRow {
        return this.rows[this.rows.length - 1];
    }

    private getBottomRow(): MatrixRow {
        return this.rows[0];
    }

    public static getRandomNumberBetween(min: number, max: number) : number {
        return (Math.ceil(Math.random() * (max - min)) + min);
    }
    
    private setWidthsAndHeights(container: HTMLElement) {
        this.screenHeight = container.clientHeight;

        let oneCharacterContainer: HTMLSpanElement = document.createElement('span');
        
        oneCharacterContainer.innerText = 'A';
        oneCharacterContainer.setAttribute('style', 'visibility:hidden; font-family: ' + window.getComputedStyle(container, null).getPropertyValue('font-family') + ';');
        let addedNode: Node = container.appendChild(oneCharacterContainer)

        this.characterWidth = oneCharacterContainer.getBoundingClientRect().width;
        this.characterHeight = oneCharacterContainer.getBoundingClientRect().height;
        this.charactersInRow = Math.floor(container.clientWidth / this.characterWidth) - 1;
        this.rowsOnScreen = Math.ceil(container.clientHeight / this.characterHeight) + 1;
        this.minCharacters = Math.ceil(this.rowsOnScreen * this.minCharacterFactor);

        container.removeChild(addedNode);
    }
}

export class MatrixRow {
    public leftPosition: number;
    public topPositioning: number;
    public rowWidth: number;
    
    public pixelsPerTick: number;
    
    public rowText: string;
    public charactersInRow: number;

    public doTick: boolean = false;

    @computedFrom("topPositioning")
    get cssText() {
        return `top: ${this.topPositioning}px; left: ${this.leftPosition}px; width: ${this.rowWidth}px;`;
    }
    
    public setRowText(rowsOnScreen: number, minCharacters: number, characters: string[]) {
        let theString: string = '';
        this.charactersInRow = App.getRandomNumberBetween(rowsOnScreen, minCharacters);
        
        for (let i: number = 0; i < this.charactersInRow; i++) {
            if (i > 0) {
                theString += '<br />';
            }
            theString += characters[Math.floor(Math.random() * (characters.length))];
        }

        this.rowText = theString;
    }

}