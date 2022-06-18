import { TurnAction } from "../types/turn-actions";
import { Pipe } from "./pipe";
import { PlayerController } from "./player-controller";

export class GameController {
  private readonly pipe: Pipe;
  private playerController: PlayerController;

  constructor() {
    this.pipe = new Pipe();
    this.playerController = new PlayerController();
  }

  init() {
    this.pipe.init();
    this.playerController.init();
  }

  addPlayer(name: string) {
    this.playerController.addPlayer(name);
  }

  canStartGame() {
    return this.playerController.getPlayers().length > 1;
  }

  newGame() {
    this.pipe.init();
    this.playerController.newGame();
  }

  getPlayerTurn() {
    return this.playerController.getPlayerTurn();
  }

  processAction(action: TurnAction, playerName: string) {
    switch (action) {
      case TurnAction.STOP:
        this.playerController.processStop();
        break;

      case TurnAction.MORE:
        const diceQuantities =
          this.playerController.getDicesNeededForPlay(playerName);

        const dices = this.pipe.getRandomDices(diceQuantities);

        const { isLooser, isWinner } = this.playerController.processMore(
          playerName,
          dices
        );

        if (isLooser) {
          this.playerController.removePlayer(playerName);
          const players = this.playerController.getPlayers();

          if (players.length === 1) {
            //TODO emit player players[0] wins
          }
          return
        }

        if (isWinner) {
          //TODO emit win game event for playerName
        }

        break;
    }
  }
}
