import {computedFrom} from "aurelia-framework";
import {inject} from 'aurelia-dependency-injection';
import {TaskQueue} from 'aurelia-task-queue';

@inject(TaskQueue)
export class App {
    private static randomNumbers: number[] = new Array<number>();
    private static nextRandomNumberIndex: number = 0;

    private tasks: TaskQueue;

    // The container that will hold the rain effect.
    private matrix: HTMLElement;

    // The columns of characters as they fall down.
    private columns: MatrixColumn[] = new Array<MatrixColumn>();
    @computedFrom("columns")
    get repeaterColumns(): MatrixColumn[]{
        return this.columns;
    }
    
    // Computed values of characters within the container
    protected characterWidth: number;
    protected characterHeight: number;
    protected columnsOnScreen: number;
    protected rowsOnScreen: number;

    // Min / max spped that columns can move down the screen, represented as the number of pixels the column moves every time the app ticks.
    protected minSpeed: number = 7.5;
    protected maxSpeed: number = 15;

    // Used to calculate when a column starts fading, as a multiplier of the number of characters in a full vertical column.
    protected minCharacterFactor: number = 0.1;
    protected maxCharacterFactor: number = 0.5;
    protected minCharacters: number;
    protected maxCharacters: number;
    
    // Seconds between a column resetting and it starting to animate (delay phase).
    protected minColumnDelay: number = 0;
    protected maxColumnDelay: number = 10;

    // The characters that might appear in a column.
    protected characters: string[] = new Array<string>();
    
    constructor(_tasks: TaskQueue)
    {
        this.tasks = _tasks;
    }

    attached() {
        // Push some characters into the available list.
        for (let i: number = 12449; i < 12544; i++) { this.characters.push(String.fromCharCode(i)); }

        // Calculate the character width and height of a monospaced character in the container. Also calculates the number of characters in a row and a column.
        this.setWidthsAndHeights(this.matrix);
        
        App.PopulateRandomNumbers();

        // Fill the container with columns.
        for (let i: number = 0; i < this.columnsOnScreen; i++) { this.addColumn(); }

        // Set the tick going every 25 miliseconds.
        setInterval(() => this.tick(), 25);
    }
    
    private tick() {
        // Filter out the columns that are still in the delay phase. The rest need to tick.
        this.columns.filter(column => column.doTick === true).forEach((column: MatrixColumn) => {
            // The MatrixColumn object does most of the work.
            column.tick(this.tasks);

            // These columns have faded out, reset them for another run.
            if (column.charactersToRemove > (column.charactersToDisplay + 10)) { this.resetColumn(column); }
        });
    }

    // Add a column to the container. Set default / static values, then reset it.
    private addColumn() {
        this.tasks.queueMicroTask(() => {
            let column: MatrixColumn = new MatrixColumn();
            column.leftPosition = this.columns.length * this.characterWidth;
            column.characterHeight = this.characterHeight;
            this.resetColumn(column);
            this.columns.push(column);
        });
    }

    // Get the column to reset itself, then set its text, speed, and delay phase duration.
    private resetColumn(column: MatrixColumn) {
        column.reset(this.tasks);

        this.tasks.queueMicroTask(() => {
            column.setRowText(this.rowsOnScreen, this.minCharacters, this.characters);
            column.pixelsPerTick = App.getRandomNumberBetween(this.maxSpeed, this.minSpeed);
        });
            
        setTimeout(() => {column.doTick = true}, App.getRandomNumberBetween(this.minColumnDelay, this.maxColumnDelay) * 1000)
    }

    // Helper method to work around the limited nature of Javascript Math.random().
    public static getRandomNumberBetween(min: number, max: number) : number {
        return (Math.ceil(App.getNextRandomNumber() * (max - min)) + min);
    }
    
    public static PopulateRandomNumbers(){
        for (let i: number = 0; i < 5000000; i++)
        {
            this.randomNumbers.push(Math.random());
        }
    }

    public static getNextRandomNumber() : number
    {
        if (App.nextRandomNumberIndex >= App.randomNumbers.length)
        {
            App.nextRandomNumberIndex++;
        }

        let nextNumber: number= App.randomNumbers[App.nextRandomNumberIndex];
        App.nextRandomNumberIndex++;
        return nextNumber;
    }

    private setWidthsAndHeights(container: HTMLElement) {
        // Add a test span with one character in it to the container
        let oneCharacterContainer: HTMLSpanElement = document.createElement('span');
        oneCharacterContainer.innerText = String.fromCharCode(12449);
        oneCharacterContainer.setAttribute('style', 'visibility:hidden; font-family: ' + window.getComputedStyle(container, null).getPropertyValue('font-family') + '; font-size: ' + window.getComputedStyle(container, null).getPropertyValue('font-size') + ';' );
        let addedNode: Node = container.appendChild(oneCharacterContainer)

        // The width and height of the span maps pretty reliably to the width and height of that one character. Monospaced font is essential here.
        this.characterWidth = oneCharacterContainer.getBoundingClientRect().width;
        this.characterHeight = oneCharacterContainer.getBoundingClientRect().height;

        // Simple math to get the number of rows and columns on the screen. Container dimensions divided by character dimensions. 
        this.columnsOnScreen = Math.floor(container.clientWidth / this.characterWidth) - 1;
        this.rowsOnScreen = Math.floor(container.clientHeight / this.characterHeight) + 10;

        // Number of characters on the screen before the top ones start fading.
        this.minCharacters = Math.ceil(this.rowsOnScreen * this.minCharacterFactor);
        this.maxCharacters = Math.ceil(this.rowsOnScreen * this.maxCharacterFactor);

        // Remove the test span to make the container ready for the app to start.
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

    public reset(tasks: TaskQueue){
        tasks.queueMicroTask(() => {
            this.doTick = false;
            this.pseudoHeight = 0;
            this.topPositioning = 0;
            this.charactersToDisplay = 0;
            this.charactersToRemove = 0;
        });
            
    }

    public setRowText(rowsOnScreen: number, minCharacters: number, characters: string[]) {
        this.charactersBeforeFadeStarts = App.getRandomNumberBetween(rowsOnScreen, minCharacters);

        this.columnCharacters = new Array<string>();
        for (let i: number = 0; i < rowsOnScreen; i++) {
            this.columnCharacters.push(characters[Math.floor(App.getNextRandomNumber() * (characters.length))]);
        }
    }

    public tick(tasks: TaskQueue){
        if (this.charactersToDisplay < this.columnCharacters.length)
        {
            tasks.queueMicroTask(() => {
                this.pseudoHeight += this.pixelsPerTick;
                this.charactersToDisplay = Math.min(this.columnCharacters.length, Math.floor(this.pseudoHeight / this.characterHeight));
            });
        }
            
        if (this.charactersToDisplay >= this.charactersBeforeFadeStarts)
        {
            tasks.queueMicroTask(() => {
                // This is essentially like having a box overlay the column, growing in height every tick and covering characters.
                this.topPositioning += this.pixelsPerTick;

                // The total number of characters that would at least partially covered by the pseudo overlay.
                this.charactersToRemove = Math.ceil(this.topPositioning / this.characterHeight);
            });
        }
    }

}