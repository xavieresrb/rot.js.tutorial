module.exports = class Game {
  constructor(PlayerClass, PedroClass) {
    this.PlayerClass = PlayerClass;
    this.PedroClass = PedroClass;

    this.map = {};
    this.display = null;
    this.engine = null;
    this.ananas = null;
    this.player = null;
    this.pedro = null;
  }

  init() {
    this.display = new ROT.Display({
      width: 100,
      heigth: 50,
      fontSize: 20,
      fontStyle: "bold"
    });
    document.body.appendChild(this.display.getContainer());
    this._generateMap();

    const scheduler = new ROT.Scheduler.Simple();
    scheduler.add(this.player, true);
    scheduler.add(this.pedro, true);
    this.engine = new ROT.Engine(scheduler);
    this.engine.start();
  }

  _generateMap() {
    const digger = new ROT.Map.Digger();
    const freeCells = [];

    const digCallback = function (x, y, value) {
      if (value) { return; } /* do not store walls */

      const key = x + "," + y;
      this.map[key] = ".";
      freeCells.push(key);
    }

    digger.create(digCallback.bind(this));
    this._generateBoxes(freeCells);
    this._drawWholeMap();

    this.player = this._createBeing(this.PlayerClass, freeCells);
    this.pedro = this._createBeing(this.PedroClass, freeCells);

  }

  _drawWholeMap() {
    for (let key in this.map) {
      const parts = key.split(",");
      const x = parseInt(parts[0]);
      const y = parseInt(parts[1]);
      this.display.draw(x, y, this.map[key]);
    }
  }

  _generateBoxes(freeCells) {
    for (let i = 0; i < 10; i++) {
      const index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
      const key = freeCells.splice(index, 1)[0];
      this.map[key] = "*";
      if (i === 0) {
        this.ananas = key;
      }
    }
  }

  _createBeing(what, freeCells) {
    const index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
    const key = freeCells.splice(index, 1)[0];
    const parts = key.split(",");
    const x = parseInt(parts[0]);
    const y = parseInt(parts[1]);

    return new what(this, x, y);
  }
}

