import {computedFrom} from "aurelia-framework";

export class App {
    private static randomNumbers: number[] = new Array<number>();
    private static nextRandomNumberIndex: number = 0;

    // The container that will hold the rain effect.
    private matrix: HTMLElement;

    // The columns of characters as they fall down.
    private columns: MatrixColumn[] = new Array<MatrixColumn>();
    @computedFrom("columns")
    get repeaterColumns(): MatrixColumn[]{
        return this.columns;
    }
    
    // Computed values of characters within the container
    protected rowsOnScreen: number;
    
    // The characters that might appear in a column.
    protected characters: string[] = new Array<string>();
    
    attached() {
        
        App.PopulateRandomNumbers();

        // Push some characters into the available list.
        for (let i: number = 12449; i < 12544; i++) { this.characters.push(String.fromCharCode(i)); }

        // Calculate the character width and height of a monospaced character in the container. Also calculates the number of characters in a row and a column.
        this.setWidthsAndHeightsAndGenerateColumns(this.matrix);
        
        
    }
    
    // Add a column to the container. Set default / static values, then reset it.
    private addColumn(characterWidth: number, screenHeight: number) {
        let column: MatrixColumn = new MatrixColumn();
        column.leftPosition = this.columns.length * characterWidth;
        column.screenHeight = screenHeight;
        column.animationCompleteCallback = (mc: MatrixColumn) => { this.resetColumn(mc); };
        this.resetColumn(column);
        this.columns.push(column);
    }

    // Get the column to reset itself, then set its text, speed, and delay phase duration.
    private resetColumn(column: MatrixColumn) {
        
        // Min / max spped that columns can move down the screen, represented as the number of pixels the column moves every time the app ticks.
        let minSpeed: number = 7.5;
        let maxSpeed: number = 15;

        // Milliseconds between a column resetting and it starting to animate (delay phase).
        let minColumnDelay: number = 0;
        let maxColumnDelay: number = 10000;

        // Milliseconds before fade starts
        let minColumnFadeDelay: number = 500;
        let maxColumnFadeDelay: number = 1250;

        let chars: string[] = new Array<string>();
        for (let i: number = 0; i < this.rowsOnScreen; i++) {
            chars.push(this.characters[Math.floor(App.getNextRandomNumber() * (this.characters.length))]);
        }
        
        column.reset(/* delay */ App.getRandomNumberBetween(minColumnFadeDelay, maxColumnFadeDelay), /* ppt */ App.getRandomNumberBetween(minSpeed, maxSpeed), /* chars */ chars);
            
        setTimeout(() => { column.startColumnAnimation(); }, App.getRandomNumberBetween(minColumnDelay, maxColumnDelay));
    }

    // Helper method to work around the limited nature of Javascript Math.random().
    public static getRandomNumberBetween(min: number, max: number) : number {
        return (Math.ceil(App.getNextRandomNumber() * (max - min)) + min);
    }
    
    public static PopulateRandomNumbers() {
        for (let i: number = 0; i < 5000000; i++)
        {
            this.randomNumbers.push(Math.random());
        }
    }

    public static getNextRandomNumber() : number {
        if (App.nextRandomNumberIndex >= App.randomNumbers.length)
        {
            App.nextRandomNumberIndex++;
        }

        let nextNumber: number= App.randomNumbers[App.nextRandomNumberIndex];
        App.nextRandomNumberIndex++;
        return nextNumber;
    }

    private setWidthsAndHeightsAndGenerateColumns(container: HTMLElement) {
        // Add a test span with one character in it to the container
        let oneCharacterContainer: HTMLSpanElement = document.createElement('span');
        oneCharacterContainer.innerText = String.fromCharCode(12449);
        oneCharacterContainer.setAttribute('style', 'visibility:hidden; font-family: ' + window.getComputedStyle(container, null).getPropertyValue('font-family') + '; font-size: ' + window.getComputedStyle(container, null).getPropertyValue('font-size') + ';' );
        let addedNode: Node = container.appendChild(oneCharacterContainer)

        // The width and height of the span maps pretty reliably to the width and height of that one character. Monospaced font is essential here.
        let characterWidth: number = oneCharacterContainer.getBoundingClientRect().width;
        let characterHeight: number = oneCharacterContainer.getBoundingClientRect().height;

        // Simple math to get the number of rows and columns on the screen. Container dimensions divided by character dimensions. 
        let columnsOnScreen: number = Math.floor(container.clientWidth / characterWidth) - 1;
        this.rowsOnScreen = Math.floor(container.clientHeight / characterHeight) + 30;
        let screenHeight: number = this.rowsOnScreen * characterHeight;

        // Remove the test span to make the container ready for the app to start.
        container.removeChild(addedNode);

        for (let i: number = 0; i < columnsOnScreen; i++) { this.addColumn(characterWidth, screenHeight); }
    }
}

export class MatrixColumn {
    public leftPosition: number;
    public topPositioning: number = 0;
    public columnHeight: number = 0;
    
    public secondsToAnimate: number;
    public fadeDelay: number;
    
    public transition: number = 0;
    public fadeTransition: number = 0;
    public screenHeight: number = 0;

    public _columnText: string = "";

    public animationCompleteCallback: (mc: MatrixColumn) => any = null;

    @computedFrom("columnHeight")
    get cssText(): string {
        return `left: ${this.leftPosition}px; height: ${this.columnHeight}px; transition: height ${this.transition}s;`;
    }
    
    @computedFrom("topPositioning")
    get cssTextFadeColumn(): string {
        return `left: ${this.leftPosition}px; height: ${this.topPositioning}px; transition: height ${this.fadeTransition}s;`;
    }
    
    @computedFrom("_columnText")
    get columnText(): string {
        return this._columnText;
    }

    public reset(delay: number, ppt: number, chars: string[]) {
        this.topPositioning = 0;
        this.columnHeight = 0;

        this.transition = 0;
        this.fadeTransition = 0;

        this._columnText = chars.join('<br />');
        
        this.fadeDelay = delay;
        let pixelsPerSecond: number = ppt * 40;
        
        // How long it will take to animate a fill column drop.
        this.secondsToAnimate = Math.floor(this.screenHeight / pixelsPerSecond);
    }

    public startColumnAnimation() {
        this.transition = this.secondsToAnimate;
        this.columnHeight = this.screenHeight;
        setTimeout(() => { this.startFadeColumnAinimation(); }, this.fadeDelay)
    }

    public startFadeColumnAinimation() {
        this.fadeTransition = (this.secondsToAnimate * 1);
        this.topPositioning = this.screenHeight;
        if (this.animationCompleteCallback != null) {
            setTimeout(() => { this.animationCompleteCallback(this); }, this.secondsToAnimate * 1000);
        }
    }

}