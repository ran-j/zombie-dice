import * as utils from "../utils";
import { Dice } from "./dice";

//TODO we don't need generate 13 fix dices

export class Pipe {
  private readonly dices!: Dice[];
  private maxDices = 13;

  constructor() {}

  init() {
    for (let i = 0; i < this.maxDices; i++) {
      const color = utils.randomColor();
      this.dices.push(new Dice(color));
    }
  }

  getRandomDices(diceQuantities: number): Dice[] {
    const dices: Dice[] = [];
    for (let i = 0; i < diceQuantities; i++) {
      dices.push(utils.randomItemFromArray(this.dices));
    }
    return dices;
  }
}
