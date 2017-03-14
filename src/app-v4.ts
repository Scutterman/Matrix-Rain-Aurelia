import {computedFrom} from "aurelia-framework";

export class App {
    private matrix: HTMLElement;
    private columns: MatrixColumn[] = new Array<MatrixColumn>();

    protected characterWidth: number;
    protected characterHeight: number;
    protected columnsOnScreen: number;
    protected rowsOnScreen: number;

    protected minSpeed: number = 75;
    protected maxSpeed: number = 150;

    protected minCharacterFactor: number = 0.1;
    protected maxCharacterFactor: number = 0.5;
    protected minCharacters: number;
    protected maxCharacters: number;
    
    protected minColumnDelay: number = 0;
    protected maxColumnDelay: number = 10;

    protected characters: string[] = new Array<string>();
    
    attached() {
        for (let i: number = 12449; i <= 12544; i++) { this.characters.push(String.fromCharCode(i)); }

        this.setWidthsAndHeights(this.matrix);
        
        for (let i: number = 0; i < this.columnsOnScreen; i++) { this.addColumn(); }

        setInterval(() => this.tick(), 25);
    }
    
    private tick() {
        this.columns.filter(column => column.doTick === true).forEach((column: MatrixColumn) => {
            column.tick();

            if (column.charactersToRemove > (column.charactersToDisplay + 10)) { this.resetColumn(column); }
        });
    }

    private addColumn() {
        let column: MatrixColumn = new MatrixColumn();
        column.leftPosition = this.columns.length * this.characterWidth;
        column.characterHeight = this.characterHeight;
        this.resetColumn(column);
        this.columns.push(column);
    }

    private resetColumn(column: MatrixColumn) {
        column.reset();
        column.setRowText(this.rowsOnScreen, this.minCharacters, this.characters);
        column.pixelsPerTick = (App.getRandomNumberBetween(this.maxSpeed, this.minSpeed) / 10);
        setTimeout(() => {column.doTick = true}, App.getRandomNumberBetween(this.minColumnDelay, this.maxColumnDelay) * 1000)
    }

    public static getRandomNumberBetween(min: number, max: number) : number {
        return (Math.ceil(Math.random() * (max - min)) + min);
    }
    
    private setWidthsAndHeights(container: HTMLElement) {
        let oneCharacterContainer: HTMLSpanElement = document.createElement('span');
        
        oneCharacterContainer.innerText = String.fromCharCode(12449);
        oneCharacterContainer.setAttribute('style', 'visibility:hidden; font-family: ' + window.getComputedStyle(container, null).getPropertyValue('font-family') + ';');
        let addedNode: Node = container.appendChild(oneCharacterContainer)

        this.characterWidth = oneCharacterContainer.getBoundingClientRect().width;
        this.characterHeight = oneCharacterContainer.getBoundingClientRect().height;
        this.columnsOnScreen = Math.floor(container.clientWidth / this.characterWidth) - 1;
        this.rowsOnScreen = Math.ceil(container.clientHeight / this.characterHeight) + 1;
        this.minCharacters = Math.ceil(this.rowsOnScreen * this.minCharacterFactor);
        this.maxCharacters = Math.ceil(this.rowsOnScreen * this.maxCharacterFactor);

        container.removeChild(addedNode);
    }
}

export class MatrixColumn {
    public characterHeight: number;
    public leftPosition: number;
    public topPositioning: number = 0;

    public pseudoHeight: number = 0;
    
    public charactersToDisplay: number = 0;
    public charactersToRemove: number = 0;
    public charactersBeforeFadeStarts: number = 0;;
    public pixelsPerTick: number;
    
    public columnCharacters: string[] = new Array<string>();

    public doTick: boolean = false;

    @computedFrom("leftPosition")
    get cssText(): string {
        return `left: ${this.leftPosition}px;`;
    }
    
    @computedFrom("topPositioning")
    get cssTextFadeColumn(): string {
        return `left: ${this.leftPosition}px; height: ${this.topPositioning}px;`;
    }
    
    @computedFrom("charactersToDisplay")
    get columnText(): string {
        return this.columnCharacters.filter((value, index) => (index < this.charactersToDisplay)).join('<br />');
    }

    public reset(){
        this.doTick = false;
        this.pseudoHeight = 0;
        this.topPositioning = 0;
        this.charactersToDisplay = 0;
        this.charactersToRemove = 0;
    }

    public setRowText(rowsOnScreen: number, minCharacters: number, characters: string[]) {
        this.charactersBeforeFadeStarts = App.getRandomNumberBetween(rowsOnScreen, minCharacters);

        this.columnCharacters = new Array<string>();
        for (let i: number = 0; i < rowsOnScreen; i++) {
            this.columnCharacters.push(characters[Math.floor(Math.random() * (characters.length))]);
        }
    }

    public tick(){
        if (this.charactersToDisplay < this.columnCharacters.length)
        {
            this.pseudoHeight += this.pixelsPerTick;
            this.charactersToDisplay = Math.floor(this.pseudoHeight / this.characterHeight);
        }
            
        if (this.charactersToDisplay >= this.charactersBeforeFadeStarts)
        {
            // This is essentially like having a box overlay the column, growing in height every tick and covering characters.
            this.topPositioning += this.pixelsPerTick;

            // The total number of characters that would at least partially covered by the pseudo overlay.
            this.charactersToRemove = Math.ceil(this.topPositioning / this.characterHeight);
        }
    }

}