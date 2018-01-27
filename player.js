module.exports = class Player {
  constructor(Game, x, y) {
    this._x = x;
    this._y = y;
    this.Game = Game;
    this._draw();
  }

  getX() { return this._x };
  getY() { return this._y };

  _draw() { this.Game.display.draw(this._x, this._y, "@", "#ff0") };
  
  act() {
    this.Game.engine.lock();
    /* wait for user input; do stuff when user hits a key */
    window.addEventListener("keydown", this);
  }

  _checkBox() {
    const key = this._x + "," + this._y;
    if (this.Game.map[key] != "*") {
      alert("There is no box here!");
    } else if (key == this.Game.ananas) {
      alert("Hooray! You found an ananas and won this game.");
      this.Game.engine.lock();
      window.removeEventListener("keydown", this);
    } else {
      alert("This box is empty :-(");
    }
  }

  handleEvent(e) {
    const keyMap = {};
    keyMap[38] = 0;
    keyMap[33] = 1;
    keyMap[39] = 2;
    keyMap[34] = 3;
    keyMap[40] = 4;
    keyMap[35] = 5;
    keyMap[37] = 6;
    keyMap[36] = 7;
  
    const code = e.keyCode;
  
    if (code == 13 || code == 32) {
      this._checkBox();
      return;
    }
  
    if (!(code in keyMap)) { return; }
  
    const diff = ROT.DIRS[8][keyMap[code]];
    const newX = this._x + diff[0];
    const newY = this._y + diff[1];
    const newKey = newX + "," + newY;
    
    if (!(newKey in this.Game.map)) { return; } /* cannot move in this direction */
  
    this.Game.display.draw(this._x, this._y, this.Game.map[this._x + "," + this._y]);
    this._x = newX;
    this._y = newY;
    this._draw();
    window.removeEventListener("keydown", this);
    this.Game.engine.unlock();
  }
}