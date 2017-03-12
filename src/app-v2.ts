export class App2 {
    private matrix: HTMLElement;
    private rows: MatrixRow[] = new Array<MatrixRow>();

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
        
        this.rows.forEach((value: MatrixRow, index: number) => {
            value.topPositioning++;
        });

        if (this.getTopRow().topPositioning >= 0) {
            this.addRow();
        }

        if (this.getBottomRow().topPositioning > this.screenHeight) {
            this.rows.splice(0, 1);
        }
    }

    private addRow() {
        let row: MatrixRow = new MatrixRow();
        row.topPositioning = this.characterHeight * -1;
        row.rowText = this.getRowText();
        this.rows.push(row);
        //this.rows.push({ topPositioning: this.characterHeight * -1, rowText: this.getRowText() });
    }

    private getTopRow(): MatrixRow {
        return this.rows[this.rows.length - 1];
    }

    private getBottomRow(): MatrixRow {
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

export class MatrixRow {
    public topPositioning: number;
    public rowText: string;
}