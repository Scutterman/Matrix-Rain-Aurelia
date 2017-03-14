import {computedFrom} from "aurelia-framework";

export class App {
    private matrix: HTMLElement;
    private rows: MatrixRow[] = new Array<MatrixRow>();

    protected characterWidth: number;
    protected characterHeight: number;
    protected charactersInRow: number;
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
    
    protected screenHeight: number;
    
    attached() {
        for (let i: number = 12449; i <= 12544; i++)
        {
            this.characters.push(String.fromCharCode(i));
        }

        this.setWidthsAndHeights(this.matrix);
        
        for (let i: number = 0; i < this.charactersInRow; i++) {
            this.addRow();
        }

        setInterval(() => this.tick(), 25);
    }
    
    private tick() {
        this.rows.filter(value => value.doTick === true).forEach((value: MatrixRow) => {
            value.tick();
            if (value.charactersToRemove > (value.charactersToDisplay + 10))
            {
                this.resetRow(value);
            }
        });
    }

    private addRow() {
        let row: MatrixRow = new MatrixRow();
        row.leftPosition = this.rows.length * this.characterWidth;
        row.characterHeight = this.characterHeight;
        this.resetRow(row);
        this.rows.push(row);
    }

    private resetRow(row: MatrixRow) {
        row.reset();
        row.setRowText(this.rowsOnScreen, this.minCharacters, this.characters);
        row.pixelsPerTick = (App.getRandomNumberBetween(this.maxSpeed, this.minSpeed) / 10);
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
        
        oneCharacterContainer.innerText = String.fromCharCode(12449);
        oneCharacterContainer.setAttribute('style', 'visibility:hidden; font-family: ' + window.getComputedStyle(container, null).getPropertyValue('font-family') + ';');
        let addedNode: Node = container.appendChild(oneCharacterContainer)

        this.characterWidth = oneCharacterContainer.getBoundingClientRect().width;
        this.characterHeight = oneCharacterContainer.getBoundingClientRect().height;
        this.charactersInRow = Math.floor(container.clientWidth / this.characterWidth) - 1;
        this.rowsOnScreen = Math.ceil(container.clientHeight / this.characterHeight) + 1;
        this.minCharacters = Math.ceil(this.rowsOnScreen * this.minCharacterFactor);
        this.maxCharacters = Math.ceil(this.rowsOnScreen * this.maxCharacterFactor);

        container.removeChild(addedNode);
    }
}

export class MatrixRow {
    public characterHeight: number;
    public leftPosition: number;
    public topPositioning: number = 0;

    public pseudoHeight: number = 0;
    
    public charactersToDisplay: number = 0;
    public charactersToRemove: number = 0;
    public charactersBeforeFadeStarts: number = 0;;
    public pixelsPerTick: number;
    
    public rowCharacters: string[] = new Array<string>();

    public addCharacters = true;
    
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
    get rowText(): string {
        return this.rowCharacters.filter((value, index) => (index < this.charactersToDisplay)).join('<br />');
    }

    public reset(){
        this.doTick = false;
        this.addCharacters = true;
        this.pseudoHeight = 0;
        this.topPositioning = 0;
        this.charactersToDisplay = 0;
        this.charactersToRemove = 0;
    }

    public setRowText(rowsOnScreen: number, minCharacters: number, characters: string[]) {
        this.charactersBeforeFadeStarts = App.getRandomNumberBetween(rowsOnScreen, minCharacters);

        this.rowCharacters = new Array<string>();
        for (let i: number = 0; i < rowsOnScreen; i++) {
            this.rowCharacters.push(characters[Math.floor(Math.random() * (characters.length))]);
        }
    }

    public tick(){
        if (this.addCharacters)
        {
            this.pseudoHeight += this.pixelsPerTick;
            this.charactersToDisplay = Math.floor(this.pseudoHeight / this.characterHeight);
            this.addCharacters = (this.charactersToDisplay < this.rowCharacters.length);
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