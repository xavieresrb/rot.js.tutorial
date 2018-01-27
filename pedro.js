module.exports = class Pedro {
  constructor(Game, x, y) {
    this._x = x;
    this._y = y;
    this.Game = Game;
    this._draw();
  }

  act() {
    let x = this.Game.player.getX();
    let y = this.Game.player.getY();

    const passableCallback = (x, y) => (x + "," + y in this.Game.map);
    // Activation object for the callback
    const astar = new ROT.Path.AStar(x, y, passableCallback.bind(this), { topology: 4 });
    const path = [];
    const pathCallback = (x, y) => {
      path.push([x, y]);
    }
    astar.compute(this._x, this._y, pathCallback);
    path.shift(); /* remove Pedro's position */

    if (path.length == 1) {
      this.Game.engine.lock();
      alert("Game over - you were captured by Pedro!");
    } else {
      x = path[0][0];
      y = path[0][1];
      this.Game.display.draw(this._x, this._y, this.Game.map[this._x + "," + this._y]);
      this._x = x;
      this._y = y;
      this._draw();
    }
  }

  _draw() {
    this.Game.display.draw(this._x, this._y, "P", "red");
  }

}