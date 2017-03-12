export class App {
    private matrix: HTMLElement;
    private rows: Node[] = new Array<Node>();

    protected characterWidth: number;
    protected characterHeight: number;
    protected charactersInRow: number;
    protected rowsOnScreen: number;

    protected characters: string[] = '                                        abcdefghijklmnopqrstuvwxyz0123456789'.split('');
    protected charactersLength: number = this.characters.length;

    protected screenHeight: number;
    
    attached() {
        this.setWidthsAndHeights(this.matrix);
        setInterval(() => this.tick(), 25);
    }
    
    private getRowText(): string {
        let theString: string = '';
        for (let i: number = 0; i < this.charactersInRow; i++) {
            theString += this.characters[Math.floor(Math.random() * (this.charactersLength))];;
        }
        return theString;
    }

    private tick() {
        if (this.rows.length == 0) {
            this.addRow();
            return;
        }

        let top: number;

        this.rows.forEach((value: Node, index: number) => {
            let row: HTMLDivElement = value as HTMLDivElement;
            top = parseInt(window.getComputedStyle(row, null).getPropertyValue('top'));
            row.setAttribute('style', 'top: ' + (top + 1).toString() + 'px;');
        });

        // top now contains the value for the highest row on the screen.
        if (top >= 0) {
            this.addRow();
        }

        let bottomRow: HTMLDivElement = this.getBottomRow() as HTMLDivElement;
        top = parseInt(window.getComputedStyle(bottomRow, null).getPropertyValue('top'));
        if (top > this.screenHeight) {
            let removedRows: Node[] = this.rows.splice(0, 1);
            this.matrix.removeChild(removedRows[0]);
        }
    }

    private addRow() {
        let row: HTMLDivElement = document.createElement('div');
        row.innerText = this.getRowText();
        row.setAttribute('style', 'top: -' + this.characterHeight.toString() + 'px;');
        row.setAttribute('class', 'matrix-row');
        let newNode: Node = this.matrix.insertBefore(row, this.matrix.firstChild);
        this.rows.push(newNode);
    }

    private getTopRow(): Node {
        return this.rows[this.rows.length - 1];
    }

    private getBottomRow(): Node {
        return this.rows[0];
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
        

        container.removeChild(addedNode);
    }
}