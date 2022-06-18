import { Player } from "./player";

import * as utils from "../utils";
import * as config from "../configs";

import { Dice } from "./dice";
import { Score } from "./score";
import { DiceType } from "../types/dice-type";
import { ProcessMoreResult } from "../types/process-more-result";

const flag = "[PLAYER-CONTROLLER] ";

export class PlayerController {
  private players!: Player[];
  private dicesInPlayerHand!: Map<string, number>;
  private board!: Score;

  private currentTurnIndex!: number;

  init() {
    this.players = [];
    this.board = new Score();
    this.dicesInPlayerHand = new Map();
    this.currentTurnIndex = 0;
  }

  addPlayer(name: string) {
    utils.log(flag, `Adding player ${name}`);
    this.players.push(new Player(name));
  }

  removePlayer(name: string) {
    const player = this.getPlayer(name);
    if (!player) return;

    const playerIndex = this.players.findIndex(
      (player) => player.name === name
    );

    this.players.splice(playerIndex, 1);

    if (this.currentTurnIndex === playerIndex) {
      this.moveToNextPlayer();
    }
  }

  getPlayers() {
    return this.players.map((player) => player.getName());
  }

  getPlayer(name: string) {
    return this.players.find((player) => player.name === name)?.getName();
  }

  getPlayerScore(name: string) {
    const player = this.players.find((player) => player.name === name);
    if (!player) return;
    return player.getScore();
  }

  getPlayerTurn(): string {
    const playerName = this.players[this.currentTurnIndex].getName();
    if (!this.dicesInPlayerHand.get(playerName)) {
      this.dicesInPlayerHand.set(playerName, 3);
    }
    return playerName;
  }

  newGame() {
    this.players = [];
    this.board = new Score();
    this.dicesInPlayerHand = new Map();
    this.currentTurnIndex = 0;
  }

  processStop() {
    this.moveToNextPlayer();
  }

  processMore(playerName: string, dices: Dice[]): ProcessMoreResult {
    const player = this.players.find((player) => player.name === playerName);
    if (!player) {
      return { isLooser: false, isWinner: false };
    }

    const dicesDiscarded = dices.reduce((acc, dice) => {
      const diceType = dice.getType();
      const point = dice.getValue();
      if (diceType === DiceType["CÉREBRO"]) {
        acc++;
        player.addPoints(point);
      }
      this.board.add(diceType, point);
      return acc;
    }, 0);

    //update dices need to possible next roll
    const currentDices = this.dicesInPlayerHand.get(playerName) ?? 0;
    const dicesNeeded = currentDices - dicesDiscarded;
    this.dicesInPlayerHand.set(
      playerName,
      dicesNeeded === 0 ? config.MaxDiceInHand : dicesNeeded
    );

    //check some status
    const isLooser = this.isLooser();
    const isWinner = this.isPlayerWinner(playerName);

    return {
      isLooser,
      isWinner,
    };
  }

  getDicesNeededForPlay(playerName: string) {
    return this.dicesInPlayerHand.get(playerName) ?? config.MaxDiceInHand;
  }

  private isLooser() {
    return this.board.getScoreCount(DiceType["ESPINGARDA"]) >= 3;
  }

  private isPlayerWinner(playerName: string) {
    const player = this.players.find((player) => player.name === playerName);
    if (!player) return false;
    return player.getScore() >= config.DicesToWin;
  }

  private moveToNextPlayer() {
    const playerName = this.players[this.currentTurnIndex].getName();
    this.dicesInPlayerHand.delete(playerName);
    this.currentTurnIndex++;
    if (this.currentTurnIndex >= this.players.length) {
      this.currentTurnIndex = 0;
    }
    this.board.reset();
  }
}
