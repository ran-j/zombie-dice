import {
  ImageConversionFlag,
  QImage,
  QLabel,
  QLayout,
  QPixmap,
  QProgressBar,
} from "@nodegui/nodegui";

import * as utils from "../../utils";

import LogoSprite from "../../../assets/logo.png";

const flag = "[RENDER] [FRAME] [SHOW-LOGO]";

export function ShowLogo(rootLayout: QLayout, next: () => void) {
  utils.log(flag, "showing logo");

  const label = new QLabel();
  label.setObjectName("logoLabel");

  const image = new QImage();
  image.load(LogoSprite);

  label.setPixmap(QPixmap.fromImage(image, ImageConversionFlag.AutoColor));

  const progressBar = new QProgressBar();
  progressBar.setMinimum(0);
  progressBar.setMaximum(100);
  progressBar.setObjectName("logoProgressBar");

  rootLayout.addWidget(label);
  rootLayout.addWidget(progressBar);

  const interval = setInterval(() => {
    progressBar.setValue(progressBar.value() + 1);
    if (progressBar.value() === 100) {
      utils.log(flag, "removing logo");
      clearInterval(interval);
      rootLayout.removeWidget(progressBar);
      rootLayout.removeWidget(label);
      progressBar.delete();
      label.delete();
      next();
    }
  }, 40);
}
