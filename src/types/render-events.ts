import { Render } from "../render/render";

export interface RenderEvents {
  on(
    event: "new-game",
    listener: (render: Render, players: string[]) => void
  ): this;
}
