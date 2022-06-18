import { DiceType } from "../types/dice-type";
import { ScoreCount } from "../types/score-count";

export class Score {
  private score!: ScoreCount;

  init() {
    this.reset();
  }

  add(diceType: DiceType, count: number) {
    this.score[diceType] += count;
  }

  getScore() {
    return this.score;
  }

  reset() {
    Object.keys(DiceType).forEach((key : string) => {
      this.score[key as DiceType] = 0;
    })
  }

  getScoreCount(type: DiceType) {
    return this.score[type];
  }
}
