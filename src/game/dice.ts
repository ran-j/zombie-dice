import { Color } from "../types/color";
import { DiceType } from "../types/dice-type";
import * as utils from "../utils";

//TODO dice type depends on the color
//TODO dice value depends on the dice type

export class Dice {
  constructor(private readonly color: Color) {}

  getColor(): Color {
    return this.color;
  }

  getType(): DiceType {
    return utils.randomDiceType();
  }

  getValue(): number {
    return 1
  }
}
