import { DiceType } from "./dice-type";

 
export type ScoreCount = {
    [diceType in DiceType]: number;
}
