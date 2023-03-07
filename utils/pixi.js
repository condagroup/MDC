import { Container, Point } from 'pixi.js';

export const background = (bgSize, inputSprite, type, forceSize) => {
  var sprite = inputSprite;
  var bgContainer = new Container();
  bgContainer.addChild(sprite);

  function resize() {
    var sp = { x: sprite.width, y: sprite.height };
    if (forceSize) sp = forceSize;
    var winratio = bgSize.x / bgSize.y;
    var spratio = sp.x / sp.y;
    var scale = 1;
    var pos = new Point(0, 0);
    if (type === 'cover' ? winratio > spratio : winratio < spratio) {
      //photo is wider than background
      scale = bgSize.x / sp.x;
      pos.y = -(sp.y * scale - bgSize.y) / 2;
    } else {
      //photo is taller than background
      scale = bgSize.y / sp.y;
      pos.x = -(sp.x * scale - bgSize.x) / 2;
    }

    sprite.scale = new Point(scale, scale);
    sprite.position = pos;
  }

  resize();

  return {
    container: bgContainer,
    doResize: resize,
  };
};
