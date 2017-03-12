define('app',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = (function () {
        function App() {
            this.rows = new Array();
            this.characters = '                                        abcdefghijklmnopqrstuvwxyz0123456789'.split('');
            this.charactersLength = this.characters.length;
        }
        App.prototype.attached = function () {
            var _this = this;
            this.setWidthsAndHeights(this.matrix);
            setInterval(function () { return _this.tick(); }, 25);
        };
        App.prototype.getRowText = function () {
            var theString = '';
            for (var i = 0; i < this.charactersInRow; i++) {
                theString += this.characters[Math.floor(Math.random() * (this.charactersLength))];
                ;
            }
            return theString;
        };
        App.prototype.tick = function () {
            if (this.rows.length == 0) {
                this.addRow();
                return;
            }
            var top;
            this.rows.forEach(function (value, index) {
                var row = value;
                top = parseInt(window.getComputedStyle(row, null).getPropertyValue('top'));
                row.setAttribute('style', 'top: ' + (top + 1).toString() + 'px;');
            });
            if (top >= 0) {
                this.addRow();
            }
            var bottomRow = this.getBottomRow();
            top = parseInt(window.getComputedStyle(bottomRow, null).getPropertyValue('top'));
            if (top > this.screenHeight) {
                var removedRows = this.rows.splice(0, 1);
                this.matrix.removeChild(removedRows[0]);
            }
        };
        App.prototype.addRow = function () {
            var row = document.createElement('div');
            row.innerText = this.getRowText();
            row.setAttribute('style', 'top: -' + this.characterHeight.toString() + 'px;');
            row.setAttribute('class', 'matrix-row');
            var newNode = this.matrix.insertBefore(row, this.matrix.firstChild);
            this.rows.push(newNode);
        };
        App.prototype.getTopRow = function () {
            return this.rows[this.rows.length - 1];
        };
        App.prototype.getBottomRow = function () {
            return this.rows[0];
        };
        App.prototype.setWidthsAndHeights = function (container) {
            this.screenHeight = container.clientHeight;
            var oneCharacterContainer = document.createElement('span');
            oneCharacterContainer.innerText = 'A';
            oneCharacterContainer.setAttribute('style', 'visibility:hidden; font-family: ' + window.getComputedStyle(container, null).getPropertyValue('font-family') + ';');
            var addedNode = container.appendChild(oneCharacterContainer);
            this.characterWidth = oneCharacterContainer.getBoundingClientRect().width;
            this.characterHeight = oneCharacterContainer.getBoundingClientRect().height;
            this.charactersInRow = Math.floor(container.clientWidth / this.characterWidth) - 1;
            this.rowsOnScreen = Math.ceil(container.clientHeight / this.characterHeight) + 1;
            container.removeChild(addedNode);
        };
        return App;
    }());
    exports.App = App;
});

define('app2',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App2 = (function () {
        function App2() {
            this.rows = new Array();
            this.characters = '                                        abcdefghijklmnopqrstuvwxyz0123456789'.split('');
            this.charactersLength = this.characters.length;
        }
        App2.prototype.attached = function () {
            var _this = this;
            this.setWidthsAndHeights(this.matrix);
            setInterval(function () { return _this.tick(); }, 25);
        };
        App2.prototype.getRowText = function () {
            var theString = '';
            for (var i = 0; i < this.charactersInRow; i++) {
                theString += this.characters[Math.floor(Math.random() * (this.charactersLength))];
                ;
            }
            return theString;
        };
        App2.prototype.tick = function () {
            if (this.rows.length == 0) {
                this.addRow();
                return;
            }
            this.rows.forEach(function (value, index) {
                value.topPositioning++;
            });
            if (this.getTopRow().topPositioning >= 0) {
                this.addRow();
            }
            if (this.getBottomRow().topPositioning > this.screenHeight) {
                this.rows.splice(0, 1);
            }
        };
        App2.prototype.addRow = function () {
            var row = new MatrixRow();
            row.topPositioning = this.characterHeight * -1;
            row.rowText = this.getRowText();
            this.rows.push(row);
        };
        App2.prototype.getTopRow = function () {
            return this.rows[this.rows.length - 1];
        };
        App2.prototype.getBottomRow = function () {
            return this.rows[0];
        };
        App2.prototype.setWidthsAndHeights = function (container) {
            this.screenHeight = container.clientHeight;
            var oneCharacterContainer = document.createElement('span');
            oneCharacterContainer.innerText = 'A';
            oneCharacterContainer.setAttribute('style', 'visibility:hidden; font-family: ' + window.getComputedStyle(container, null).getPropertyValue('font-family') + ';');
            var addedNode = container.appendChild(oneCharacterContainer);
            this.characterWidth = oneCharacterContainer.getBoundingClientRect().width;
            this.characterHeight = oneCharacterContainer.getBoundingClientRect().height;
            this.charactersInRow = Math.floor(container.clientWidth / this.characterWidth) - 1;
            this.rowsOnScreen = Math.ceil(container.clientHeight / this.characterHeight) + 1;
            container.removeChild(addedNode);
        };
        return App2;
    }());
    exports.App2 = App2;
    var MatrixRow = (function () {
        function MatrixRow() {
        }
        return MatrixRow;
    }());
    exports.MatrixRow = MatrixRow;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('app3',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App2 = (function () {
        function App2() {
            this.rows = new Array();
            this.minSpeed = 30;
            this.maxSpeed = 70;
            this.minCharacterFactor = 0.5;
            this.characters = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
        }
        App2.prototype.attached = function () {
            var _this = this;
            this.setWidthsAndHeights(this.matrix);
            for (var i = 0; i < this.charactersInRow; i++) {
                this.addRow();
            }
            setInterval(function () { return _this.tick(); }, 25);
        };
        App2.prototype.tick = function () {
            var _this = this;
            this.rows.forEach(function (value, index) {
                value.topPositioning += value.pixelsPerTick;
                if (value.topPositioning > _this.screenHeight) {
                    _this.resetRow(value);
                }
            });
        };
        App2.prototype.addRow = function () {
            var row = new MatrixRow();
            row.leftPosition = this.rows.length * this.characterWidth;
            row.rowWidth = this.characterWidth;
            this.resetRow(row);
            this.rows.push(row);
        };
        App2.prototype.resetRow = function (row) {
            row.setRowText(this.rowsOnScreen, this.minCharacters, this.characters);
            row.pixelsPerTick = ((Math.ceil(Math.random() * (this.maxSpeed - this.minSpeed)) + this.minSpeed) / 10);
            row.topPositioning = this.characterHeight * row.charactersInRow * -1;
        };
        App2.prototype.getTopRow = function () {
            return this.rows[this.rows.length - 1];
        };
        App2.prototype.getBottomRow = function () {
            return this.rows[0];
        };
        App2.prototype.setWidthsAndHeights = function (container) {
            this.screenHeight = container.clientHeight;
            var oneCharacterContainer = document.createElement('span');
            oneCharacterContainer.innerText = 'A';
            oneCharacterContainer.setAttribute('style', 'visibility:hidden; font-family: ' + window.getComputedStyle(container, null).getPropertyValue('font-family') + ';');
            var addedNode = container.appendChild(oneCharacterContainer);
            this.characterWidth = oneCharacterContainer.getBoundingClientRect().width;
            this.characterHeight = oneCharacterContainer.getBoundingClientRect().height;
            this.charactersInRow = Math.floor(container.clientWidth / this.characterWidth) - 1;
            this.rowsOnScreen = Math.ceil(container.clientHeight / this.characterHeight) + 1;
            this.minCharacters = Math.ceil(this.rowsOnScreen * this.minCharacterFactor);
            container.removeChild(addedNode);
        };
        return App2;
    }());
    exports.App2 = App2;
    var MatrixRow = (function () {
        function MatrixRow() {
        }
        Object.defineProperty(MatrixRow.prototype, "cssText", {
            get: function () {
                return "top: " + this.topPositioning + "px; left: " + this.leftPosition + "px; width: " + this.rowWidth + "px;";
            },
            enumerable: true,
            configurable: true
        });
        MatrixRow.prototype.setRowText = function (rowsOnScreen, minCharacters, characters) {
            var theString = '';
            this.charactersInRow = Math.ceil(Math.random() * (rowsOnScreen - minCharacters)) + minCharacters;
            for (var i = 0; i < this.charactersInRow; i++) {
                if (i > 0) {
                    theString += '<br />';
                }
                theString += characters[Math.floor(Math.random() * (characters.length))];
            }
            this.rowText = theString;
        };
        return MatrixRow;
    }());
    __decorate([
        aurelia_framework_1.computedFrom("topPositioning"),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], MatrixRow.prototype, "cssText", null);
    exports.MatrixRow = MatrixRow;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('main',["require", "exports", "./environment"], function (require, exports, environment_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Promise.config({
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot('app-v4', document.body); });
    }
    exports.configure = configure;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
    }
    exports.configure = configure;
});

define('app-v1',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = (function () {
        function App() {
            this.rows = new Array();
            this.characters = '                                        abcdefghijklmnopqrstuvwxyz0123456789'.split('');
            this.charactersLength = this.characters.length;
        }
        App.prototype.attached = function () {
            var _this = this;
            this.setWidthsAndHeights(this.matrix);
            setInterval(function () { return _this.tick(); }, 25);
        };
        App.prototype.getRowText = function () {
            var theString = '';
            for (var i = 0; i < this.charactersInRow; i++) {
                theString += this.characters[Math.floor(Math.random() * (this.charactersLength))];
                ;
            }
            return theString;
        };
        App.prototype.tick = function () {
            if (this.rows.length == 0) {
                this.addRow();
                return;
            }
            var top;
            this.rows.forEach(function (value, index) {
                var row = value;
                top = parseInt(window.getComputedStyle(row, null).getPropertyValue('top'));
                row.setAttribute('style', 'top: ' + (top + 1).toString() + 'px;');
            });
            if (top >= 0) {
                this.addRow();
            }
            var bottomRow = this.getBottomRow();
            top = parseInt(window.getComputedStyle(bottomRow, null).getPropertyValue('top'));
            if (top > this.screenHeight) {
                var removedRows = this.rows.splice(0, 1);
                this.matrix.removeChild(removedRows[0]);
            }
        };
        App.prototype.addRow = function () {
            var row = document.createElement('div');
            row.innerText = this.getRowText();
            row.setAttribute('style', 'top: -' + this.characterHeight.toString() + 'px;');
            row.setAttribute('class', 'matrix-row');
            var newNode = this.matrix.insertBefore(row, this.matrix.firstChild);
            this.rows.push(newNode);
        };
        App.prototype.getTopRow = function () {
            return this.rows[this.rows.length - 1];
        };
        App.prototype.getBottomRow = function () {
            return this.rows[0];
        };
        App.prototype.setWidthsAndHeights = function (container) {
            this.screenHeight = container.clientHeight;
            var oneCharacterContainer = document.createElement('span');
            oneCharacterContainer.innerText = 'A';
            oneCharacterContainer.setAttribute('style', 'visibility:hidden; font-family: ' + window.getComputedStyle(container, null).getPropertyValue('font-family') + ';');
            var addedNode = container.appendChild(oneCharacterContainer);
            this.characterWidth = oneCharacterContainer.getBoundingClientRect().width;
            this.characterHeight = oneCharacterContainer.getBoundingClientRect().height;
            this.charactersInRow = Math.floor(container.clientWidth / this.characterWidth) - 1;
            this.rowsOnScreen = Math.ceil(container.clientHeight / this.characterHeight) + 1;
            container.removeChild(addedNode);
        };
        return App;
    }());
    exports.App = App;
});

define('app-v2',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App2 = (function () {
        function App2() {
            this.rows = new Array();
            this.characters = '                                        abcdefghijklmnopqrstuvwxyz0123456789'.split('');
            this.charactersLength = this.characters.length;
        }
        App2.prototype.attached = function () {
            var _this = this;
            this.setWidthsAndHeights(this.matrix);
            setInterval(function () { return _this.tick(); }, 25);
        };
        App2.prototype.getRowText = function () {
            var theString = '';
            for (var i = 0; i < this.charactersInRow; i++) {
                theString += this.characters[Math.floor(Math.random() * (this.charactersLength))];
                ;
            }
            return theString;
        };
        App2.prototype.tick = function () {
            if (this.rows.length == 0) {
                this.addRow();
                return;
            }
            this.rows.forEach(function (value, index) {
                value.topPositioning++;
            });
            if (this.getTopRow().topPositioning >= 0) {
                this.addRow();
            }
            if (this.getBottomRow().topPositioning > this.screenHeight) {
                this.rows.splice(0, 1);
            }
        };
        App2.prototype.addRow = function () {
            var row = new MatrixRow();
            row.topPositioning = this.characterHeight * -1;
            row.rowText = this.getRowText();
            this.rows.push(row);
        };
        App2.prototype.getTopRow = function () {
            return this.rows[this.rows.length - 1];
        };
        App2.prototype.getBottomRow = function () {
            return this.rows[0];
        };
        App2.prototype.setWidthsAndHeights = function (container) {
            this.screenHeight = container.clientHeight;
            var oneCharacterContainer = document.createElement('span');
            oneCharacterContainer.innerText = 'A';
            oneCharacterContainer.setAttribute('style', 'visibility:hidden; font-family: ' + window.getComputedStyle(container, null).getPropertyValue('font-family') + ';');
            var addedNode = container.appendChild(oneCharacterContainer);
            this.characterWidth = oneCharacterContainer.getBoundingClientRect().width;
            this.characterHeight = oneCharacterContainer.getBoundingClientRect().height;
            this.charactersInRow = Math.floor(container.clientWidth / this.characterWidth) - 1;
            this.rowsOnScreen = Math.ceil(container.clientHeight / this.characterHeight) + 1;
            container.removeChild(addedNode);
        };
        return App2;
    }());
    exports.App2 = App2;
    var MatrixRow = (function () {
        function MatrixRow() {
        }
        return MatrixRow;
    }());
    exports.MatrixRow = MatrixRow;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('app-v3',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App2 = (function () {
        function App2() {
            this.rows = new Array();
            this.minSpeed = 30;
            this.maxSpeed = 70;
            this.minCharacterFactor = 0.5;
            this.characters = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
        }
        App2.prototype.attached = function () {
            var _this = this;
            this.setWidthsAndHeights(this.matrix);
            for (var i = 0; i < this.charactersInRow; i++) {
                this.addRow();
            }
            setInterval(function () { return _this.tick(); }, 25);
        };
        App2.prototype.tick = function () {
            var _this = this;
            this.rows.forEach(function (value, index) {
                value.topPositioning += value.pixelsPerTick;
                if (value.topPositioning > _this.screenHeight) {
                    _this.resetRow(value);
                }
            });
        };
        App2.prototype.addRow = function () {
            var row = new MatrixRow();
            row.leftPosition = this.rows.length * this.characterWidth;
            row.rowWidth = this.characterWidth;
            this.resetRow(row);
            this.rows.push(row);
        };
        App2.prototype.resetRow = function (row) {
            row.setRowText(this.rowsOnScreen, this.minCharacters, this.characters);
            row.pixelsPerTick = ((Math.ceil(Math.random() * (this.maxSpeed - this.minSpeed)) + this.minSpeed) / 10);
            row.topPositioning = this.characterHeight * row.charactersInRow * -1;
        };
        App2.prototype.getTopRow = function () {
            return this.rows[this.rows.length - 1];
        };
        App2.prototype.getBottomRow = function () {
            return this.rows[0];
        };
        App2.prototype.setWidthsAndHeights = function (container) {
            this.screenHeight = container.clientHeight;
            var oneCharacterContainer = document.createElement('span');
            oneCharacterContainer.innerText = 'A';
            oneCharacterContainer.setAttribute('style', 'visibility:hidden; font-family: ' + window.getComputedStyle(container, null).getPropertyValue('font-family') + ';');
            var addedNode = container.appendChild(oneCharacterContainer);
            this.characterWidth = oneCharacterContainer.getBoundingClientRect().width;
            this.characterHeight = oneCharacterContainer.getBoundingClientRect().height;
            this.charactersInRow = Math.floor(container.clientWidth / this.characterWidth) - 1;
            this.rowsOnScreen = Math.ceil(container.clientHeight / this.characterHeight) + 1;
            this.minCharacters = Math.ceil(this.rowsOnScreen * this.minCharacterFactor);
            container.removeChild(addedNode);
        };
        return App2;
    }());
    exports.App2 = App2;
    var MatrixRow = (function () {
        function MatrixRow() {
        }
        Object.defineProperty(MatrixRow.prototype, "cssText", {
            get: function () {
                return "top: " + this.topPositioning + "px; left: " + this.leftPosition + "px; width: " + this.rowWidth + "px;";
            },
            enumerable: true,
            configurable: true
        });
        MatrixRow.prototype.setRowText = function (rowsOnScreen, minCharacters, characters) {
            var theString = '';
            this.charactersInRow = Math.ceil(Math.random() * (rowsOnScreen - minCharacters)) + minCharacters;
            for (var i = 0; i < this.charactersInRow; i++) {
                if (i > 0) {
                    theString += '<br />';
                }
                theString += characters[Math.floor(Math.random() * (characters.length))];
            }
            this.rowText = theString;
        };
        return MatrixRow;
    }());
    __decorate([
        aurelia_framework_1.computedFrom("topPositioning"),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], MatrixRow.prototype, "cssText", null);
    exports.MatrixRow = MatrixRow;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('app-v3 - Copy',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App2 = (function () {
        function App2() {
            this.rows = new Array();
            this.minSpeed = 30;
            this.maxSpeed = 70;
            this.minCharacterFactor = 0.5;
            this.characters = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
        }
        App2.prototype.attached = function () {
            var _this = this;
            this.setWidthsAndHeights(this.matrix);
            for (var i = 0; i < this.charactersInRow; i++) {
                this.addRow();
            }
            setInterval(function () { return _this.tick(); }, 25);
        };
        App2.prototype.tick = function () {
            var _this = this;
            this.rows.forEach(function (value, index) {
                value.topPositioning += value.pixelsPerTick;
                if (value.topPositioning > _this.screenHeight) {
                    _this.resetRow(value);
                }
            });
        };
        App2.prototype.addRow = function () {
            var row = new MatrixRow();
            row.leftPosition = this.rows.length * this.characterWidth;
            row.rowWidth = this.characterWidth;
            this.resetRow(row);
            this.rows.push(row);
        };
        App2.prototype.resetRow = function (row) {
            row.setRowText(this.rowsOnScreen, this.minCharacters, this.characters);
            row.pixelsPerTick = ((Math.ceil(Math.random() * (this.maxSpeed - this.minSpeed)) + this.minSpeed) / 10);
            row.topPositioning = this.characterHeight * row.charactersInRow * -1;
        };
        App2.prototype.getTopRow = function () {
            return this.rows[this.rows.length - 1];
        };
        App2.prototype.getBottomRow = function () {
            return this.rows[0];
        };
        App2.prototype.setWidthsAndHeights = function (container) {
            this.screenHeight = container.clientHeight;
            var oneCharacterContainer = document.createElement('span');
            oneCharacterContainer.innerText = 'A';
            oneCharacterContainer.setAttribute('style', 'visibility:hidden; font-family: ' + window.getComputedStyle(container, null).getPropertyValue('font-family') + ';');
            var addedNode = container.appendChild(oneCharacterContainer);
            this.characterWidth = oneCharacterContainer.getBoundingClientRect().width;
            this.characterHeight = oneCharacterContainer.getBoundingClientRect().height;
            this.charactersInRow = Math.floor(container.clientWidth / this.characterWidth) - 1;
            this.rowsOnScreen = Math.ceil(container.clientHeight / this.characterHeight) + 1;
            this.minCharacters = Math.ceil(this.rowsOnScreen * this.minCharacterFactor);
            container.removeChild(addedNode);
        };
        return App2;
    }());
    exports.App2 = App2;
    var MatrixRow = (function () {
        function MatrixRow() {
        }
        Object.defineProperty(MatrixRow.prototype, "cssText", {
            get: function () {
                return "top: " + this.topPositioning + "px; left: " + this.leftPosition + "px; width: " + this.rowWidth + "px;";
            },
            enumerable: true,
            configurable: true
        });
        MatrixRow.prototype.setRowText = function (rowsOnScreen, minCharacters, characters) {
            var theString = '';
            this.charactersInRow = Math.ceil(Math.random() * (rowsOnScreen - minCharacters)) + minCharacters;
            for (var i = 0; i < this.charactersInRow; i++) {
                if (i > 0) {
                    theString += '<br />';
                }
                theString += characters[Math.floor(Math.random() * (characters.length))];
            }
            this.rowText = theString;
        };
        return MatrixRow;
    }());
    __decorate([
        aurelia_framework_1.computedFrom("topPositioning"),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], MatrixRow.prototype, "cssText", null);
    exports.MatrixRow = MatrixRow;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('app-v',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App2 = (function () {
        function App2() {
            this.rows = new Array();
            this.minSpeed = 30;
            this.maxSpeed = 70;
            this.minCharacterFactor = 0.5;
            this.characters = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
        }
        App2.prototype.attached = function () {
            var _this = this;
            this.setWidthsAndHeights(this.matrix);
            for (var i = 0; i < this.charactersInRow; i++) {
                this.addRow();
            }
            setInterval(function () { return _this.tick(); }, 25);
        };
        App2.prototype.tick = function () {
            var _this = this;
            this.rows.forEach(function (value, index) {
                value.topPositioning += value.pixelsPerTick;
                if (value.topPositioning > _this.screenHeight) {
                    _this.resetRow(value);
                }
            });
        };
        App2.prototype.addRow = function () {
            var row = new MatrixRow();
            row.leftPosition = this.rows.length * this.characterWidth;
            row.rowWidth = this.characterWidth;
            this.resetRow(row);
            this.rows.push(row);
        };
        App2.prototype.resetRow = function (row) {
            row.setRowText(this.rowsOnScreen, this.minCharacters, this.characters);
            row.pixelsPerTick = ((Math.ceil(Math.random() * (this.maxSpeed - this.minSpeed)) + this.minSpeed) / 10);
            row.topPositioning = this.characterHeight * row.charactersInRow * -1;
        };
        App2.prototype.getTopRow = function () {
            return this.rows[this.rows.length - 1];
        };
        App2.prototype.getBottomRow = function () {
            return this.rows[0];
        };
        App2.prototype.setWidthsAndHeights = function (container) {
            this.screenHeight = container.clientHeight;
            var oneCharacterContainer = document.createElement('span');
            oneCharacterContainer.innerText = 'A';
            oneCharacterContainer.setAttribute('style', 'visibility:hidden; font-family: ' + window.getComputedStyle(container, null).getPropertyValue('font-family') + ';');
            var addedNode = container.appendChild(oneCharacterContainer);
            this.characterWidth = oneCharacterContainer.getBoundingClientRect().width;
            this.characterHeight = oneCharacterContainer.getBoundingClientRect().height;
            this.charactersInRow = Math.floor(container.clientWidth / this.characterWidth) - 1;
            this.rowsOnScreen = Math.ceil(container.clientHeight / this.characterHeight) + 1;
            this.minCharacters = Math.ceil(this.rowsOnScreen * this.minCharacterFactor);
            container.removeChild(addedNode);
        };
        return App2;
    }());
    exports.App2 = App2;
    var MatrixRow = (function () {
        function MatrixRow() {
        }
        Object.defineProperty(MatrixRow.prototype, "cssText", {
            get: function () {
                return "top: " + this.topPositioning + "px; left: " + this.leftPosition + "px; width: " + this.rowWidth + "px;";
            },
            enumerable: true,
            configurable: true
        });
        MatrixRow.prototype.setRowText = function (rowsOnScreen, minCharacters, characters) {
            var theString = '';
            this.charactersInRow = Math.ceil(Math.random() * (rowsOnScreen - minCharacters)) + minCharacters;
            for (var i = 0; i < this.charactersInRow; i++) {
                if (i > 0) {
                    theString += '<br />';
                }
                theString += characters[Math.floor(Math.random() * (characters.length))];
            }
            this.rowText = theString;
        };
        return MatrixRow;
    }());
    __decorate([
        aurelia_framework_1.computedFrom("topPositioning"),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], MatrixRow.prototype, "cssText", null);
    exports.MatrixRow = MatrixRow;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('app-v4',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = (function () {
        function App() {
            this.rows = new Array();
            this.minSpeed = 30;
            this.maxSpeed = 70;
            this.minCharacterFactor = 0.5;
            this.minColumnDelay = 0;
            this.maxColumnDelay = 5;
            this.characters = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
        }
        App.prototype.attached = function () {
            var _this = this;
            this.setWidthsAndHeights(this.matrix);
            for (var i = 0; i < this.charactersInRow; i++) {
                this.addRow();
            }
            setInterval(function () { return _this.tick(); }, 25);
        };
        App.prototype.tick = function () {
            var _this = this;
            this.rows.filter(function (value) { return value.doTick === true; }).forEach(function (value) {
                if (value.addCharacters) {
                    value.pseudoHeight += value.pixelsPerTick;
                    value.charactersToDisplay = Math.floor(value.pseudoHeight / _this.characterHeight);
                    value.addCharacters = (value.charactersToDisplay < value.rowCharacters.length);
                }
                else {
                    value.topPositioning += value.pixelsPerTick;
                    value.charactersToRemove = Math.ceil(value.topPositioning / _this.characterHeight);
                    if (value.charactersToRemove > value.charactersToDisplay) {
                        _this.resetRow(value);
                    }
                }
            });
        };
        App.prototype.addRow = function () {
            var row = new MatrixRow();
            row.leftPosition = this.rows.length * this.characterWidth;
            this.resetRow(row);
            this.rows.push(row);
        };
        App.prototype.resetRow = function (row) {
            row.doTick = false;
            row.addCharacters = true;
            row.pseudoHeight = 0;
            row.topPositioning = 0;
            row.charactersToDisplay = 0;
            row.charactersToRemove = 0;
            row.setRowText(this.rowsOnScreen, this.minCharacters, this.characters);
            row.pixelsPerTick = (App.getRandomNumberBetween(this.maxSpeed, this.minSpeed) / 10);
            setTimeout(function () { row.doTick = true; }, App.getRandomNumberBetween(this.minColumnDelay, this.maxColumnDelay) * 1000);
        };
        App.prototype.getTopRow = function () {
            return this.rows[this.rows.length - 1];
        };
        App.prototype.getBottomRow = function () {
            return this.rows[0];
        };
        App.getRandomNumberBetween = function (min, max) {
            return (Math.ceil(Math.random() * (max - min)) + min);
        };
        App.prototype.setWidthsAndHeights = function (container) {
            this.screenHeight = container.clientHeight;
            var oneCharacterContainer = document.createElement('span');
            oneCharacterContainer.innerText = 'A';
            oneCharacterContainer.setAttribute('style', 'visibility:hidden; font-family: ' + window.getComputedStyle(container, null).getPropertyValue('font-family') + ';');
            var addedNode = container.appendChild(oneCharacterContainer);
            this.characterWidth = oneCharacterContainer.getBoundingClientRect().width;
            this.characterHeight = oneCharacterContainer.getBoundingClientRect().height;
            this.charactersInRow = Math.floor(container.clientWidth / this.characterWidth) - 1;
            this.rowsOnScreen = Math.ceil(container.clientHeight / this.characterHeight) + 1;
            this.minCharacters = Math.ceil(this.rowsOnScreen * this.minCharacterFactor);
            container.removeChild(addedNode);
        };
        return App;
    }());
    exports.App = App;
    var MatrixRow = (function () {
        function MatrixRow() {
            this.topPositioning = 0;
            this.pseudoHeight = 0;
            this.charactersToDisplay = 0;
            this.charactersToRemove = 0;
            this.rowCharacters = new Array();
            this.addCharacters = true;
            this.doTick = false;
        }
        Object.defineProperty(MatrixRow.prototype, "cssText", {
            get: function () {
                return "left: " + this.leftPosition + "px; top: " + this.topPositioning + "px";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatrixRow.prototype, "rowText", {
            get: function () {
                var _this = this;
                return this.rowCharacters.filter(function (value, index) { return (index >= _this.charactersToRemove && index < _this.charactersToDisplay); }).join('<br />');
            },
            enumerable: true,
            configurable: true
        });
        MatrixRow.prototype.setRowText = function (rowsOnScreen, minCharacters, characters) {
            this.rowCharacters = new Array();
            for (var i = 0; i < App.getRandomNumberBetween(rowsOnScreen, minCharacters); i++) {
                this.rowCharacters.push(characters[Math.floor(Math.random() * (characters.length))]);
            }
        };
        return MatrixRow;
    }());
    __decorate([
        aurelia_framework_1.computedFrom("topPositioning"),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], MatrixRow.prototype, "cssText", null);
    __decorate([
        aurelia_framework_1.computedFrom("charactersToDisplay", "charactersToRemove"),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], MatrixRow.prototype, "rowText", null);
    exports.MatrixRow = MatrixRow;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"assets/css/scss/matrix.css\"></require>\n    <div ref=\"matrix\" id=\"matrix\"></div>\n</template>\n"; });
define('text!app2.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"assets/css/scss/matrix.css\"></require>\n    <div ref=\"matrix\" id=\"matrix\">\n        <div class=\"matrix-row\" repeat.for=\"item of rows\" css=\"top: ${item.topPositioning}px\">${item.rowText}</div>\n    </div>\n</template>\n"; });
define('text!app3.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"assets/css/scss/matrix.css\"></require>\n    <div ref=\"matrix\" id=\"matrix\">\n        <div class=\"matrix-row matrix-column\" repeat.for=\"item of rows\" css=\"${item.cssText}\" innerhtml=\"${item.rowText}\"></div>\n    </div>\n</template>\n"; });
define('text!assets/css/scss/matrix.css', ['module'], function(module) { module.exports = "html, body {\n  width: 100%;\n  min-width: 100%;\n  height: 100%;\n  min-height: 100%;\n  padding: 0;\n  margin: 0; }\n\n#matrix {\n  width: 100%;\n  height: 100%;\n  background-color: black;\n  color: green;\n  position: absolute;\n  top: 0;\n  left: 0;\n  font-family: 'Courier New';\n  font-size: 50px;\n  text-align: center;\n  white-space: pre;\n  overflow: hidden; }\n\n#matrix .matrix-row {\n  position: absolute;\n  top: 0;\n  left: 0; }\n\n#matrix .matrix-column {\n  background-image: linear-gradient(to bottom, green, green, green, white);\n  color: transparent;\n  background-clip: text;\n  -webkit-background-clip: text;\n  text-align: center; }\n"; });
define('text!assets/css/scss/reset.css', ['module'], function(module) { module.exports = "html, body {\n  width: 100%;\n  min-width: 100%;\n  height: 100%;\n  min-height: 100%;\n  padding: 0;\n  margin: 0; }\n"; });
define('text!app-v1.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"assets/css/scss/matrix.css\"></require>\n    <div ref=\"matrix\" id=\"matrix\"></div>\n</template>\n"; });
define('text!app-v2.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"assets/css/scss/matrix.css\"></require>\n    <div ref=\"matrix\" id=\"matrix\">\n        <div class=\"matrix-row\" repeat.for=\"item of rows\" css=\"top: ${item.topPositioning}px\">${item.rowText}</div>\n    </div>\n</template>\n"; });
define('text!app-v3.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"assets/css/scss/matrix.css\"></require>\n    <div ref=\"matrix\" id=\"matrix\">\n        <div class=\"matrix-row matrix-column\" repeat.for=\"item of rows\" css=\"${item.cssText}\" innerhtml=\"${item.rowText}\"></div>\n    </div>\n</template>\n"; });
define('text!app-v3 - Copy.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"assets/css/scss/matrix.css\"></require>\n    <div ref=\"matrix\" id=\"matrix\">\n        <div class=\"matrix-row matrix-column\" repeat.for=\"item of rows\" css=\"${item.cssText}\" innerhtml=\"${item.rowText}\"></div>\n    </div>\n</template>\n"; });
define('text!app-v4.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"assets/css/scss/matrix.css\"></require>\n    <div ref=\"matrix\" id=\"matrix\">\n        <div class=\"matrix-row matrix-column\" repeat.for=\"item of rows\" css=\"${item.cssText}\" innerhtml=\"${item.rowText}\"></div>\n    </div>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map