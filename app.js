const Game = require('./game.js');
const Pedro = require('./pedro.js');
const Player = require('./player.js');

loadApp = function() {
  const game = new Game(Player, Pedro);
  
  game.init();
}

