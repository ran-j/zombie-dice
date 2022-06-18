import { Score } from "./score";

export class Player {
  private points!: number;

  constructor(public readonly name: string) {
    this.points = 0;
  }

  init() {
    this.points = 0;
  }

  getScore() {
    return this.points
  }

  addPoints(points: number) {
    this.points += points;
    return this.points;
  }

  getName(){
    return this.name;
  }
}
