import { ImageConversionFlag, QImage, QLabel, QLayout, QPixmap } from "@nodegui/nodegui";

import * as utils from "../../utils";

const flag = "[RENDER] [FRAME] [MAIN-MENU]";

import MenuLogo from "../../../assets/MenuLogo.png";

export function MainMenu(
  rootLayout: QLayout,
  next: (operation: number) => void
) {
  utils.log(flag, "showing menu");

  const label = new QLabel();
  label.setObjectName("logoLabel");

  const image = new QImage();
  image.load(MenuLogo);

  label.setPixmap(QPixmap.fromImage(image, ImageConversionFlag.AutoColor));

  rootLayout.addWidget(label);
}
