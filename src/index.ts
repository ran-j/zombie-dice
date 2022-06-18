import { GameController } from "./game/game-controller";
import { Render } from "./render/render";
import * as utils from "./utils";

const flag = "[MAIN]";

utils.log(flag, "Starting Zombie Dice");

const render = new Render();
const gameController = new GameController();

//This is to prevent possible garbage collector DO NOT USE THIS directly
(global as any)._gameBase = {
    gameController,
    render
}

render.addListener("new-game", (render: Render, players: string[]) => {
  utils.log(flag, "New game");
  gameController.newGame();

  players.forEach((player) => {
    gameController.addPlayer(player);
  });
});

gameController.init(); 
render.init();

render.openLevelByName("loaging")