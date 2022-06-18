import { Color } from "../types/color";
import { DiceType } from "../types/dice-type";

export function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomItemFromArray<T>(array: T[]): T {
  return array[random(0, array.length - 1)];
}

export function randomColor(): Color {
  return randomEnum(Color) as Color;
}

export function randomDiceType(): DiceType {
  return randomEnum(DiceType) as DiceType;
}

export function randomEnum<T>(anEnum: T): T[keyof T] {
  const enumValues = Object.keys(anEnum)
    .map((n) => Number.parseInt(n))
    .filter((n) => !Number.isNaN(n)) as unknown as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  const randomEnumValue = enumValues[randomIndex];
  return randomEnumValue;
}
