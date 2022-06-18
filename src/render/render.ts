import { FlexLayout, QLayout, QMainWindow, QWidget } from "@nodegui/nodegui";
import { EventEmitter } from "stream";
import { GameController } from "../game/game-controller";
import { RenderEvents } from "../types/render-events";

import * as frames from "./levels";
import { MainWindowStyle } from "./styles";

export class Render extends EventEmitter implements RenderEvents {
  private windows!: QMainWindow;
  private centralWidget!: QWidget;
  private rootLayout!: QLayout; 

  init() {
    this.windows = new QMainWindow();
    this.windows.setWindowTitle("Zombie Dice");
    this.windows.resize(1100, 800);
    this.createLayout();
    this.windows.show();
    //prevent garbage collector
    (global as any).win = this.windows;
  }

  private createLayout() {
    this.centralWidget = new QWidget();
    this.centralWidget.setObjectName("myroot");

    this.rootLayout = new FlexLayout();

    this.centralWidget.setLayout(this.rootLayout);
    this.createStyle();
  }

  private createStyle() {
    this.windows.setCentralWidget(this.centralWidget);
    this.windows.setStyleSheet(MainWindowStyle);
  }

  public openLevelByName(name: string) {
    switch (name) {
      case "mainMenu":
        frames.MainMenu(this.rootLayout, (operation) => {
          if (operation === 0) {
            this.openLevelByName("new-game");
          }
          if (operation === -1) {
            this.windows.close();
          }
        });
        break;
      case "credits":
        //TODO
        break;
      case "loaging":
        frames.ShowLogo(this.rootLayout, () =>
          this.openLevelByName("mainMenu")
        );
        break;
      case "board":
        //TODO
        break;
    }
  }
}
