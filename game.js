'use strict';

// imports
const CommandEnum = quick.CommandEnum;
const Quick = quick.Quick;
const Sprite = quick.Sprite;
const Scene = quick.Scene;

// classes
class GameScene extends Scene {
  constructor() {
    super();
    this.setWidth(950).setHeight(600);
    this.add(new Background());
    let player = new Player();
    this.add(player);
    this.add(new Camera(player));
    // random squares to give some movement perspective:
    for (let i=0; i<20; ++i) {
      this.add(
        new Sprite()
          .setCenterX(Quick.random(950))
          .setCenterY(Quick.random(600))
          .setSize(10, 10)
          .setColor('yellow')
      );
    }
  }
}

class Camera extends Sprite {
  constructor(follow) {
    super();
    this.follow = follow;
  }

  update() {
    let x = this.follow.getCenterX()-Quick.getCenterX();
    let y = this.follow.getCenterY()-Quick.getCenterY();
    if (x < 0) {
      x = 0;
    } else if (x > this.getScene().getWidth()-Quick.getWidth()) {
      x = this.getScene().getWidth()-Quick.getWidth();
    }
    if (y < 0) {
      y = 0;
    } else if (y > this.getScene().getHeight()-Quick.getHeight()) {
      y = this.getScene().getHeight()-Quick.getHeight();
    }
    this.getScene().setX(x).setY(y);
  }
}

class Background extends Sprite {
  constructor() {
    super();
    this.setColor('Black');
  }

  init() {
    this.setSize(this.getScene());
  }
}

class Player extends Sprite {
  constructor() {
    super();
    this.speed = 3;
    this.controller = Quick.getController();
    this.setColor('White');
    this.setSize(32, 32);
  }

  update() {
    if (this.controller.keyDown(CommandEnum.LEFT) && this.getLeft() > 0) {
      this.moveX(-this.speed);
    } else if (this.controller.keyDown(CommandEnum.RIGHT) && this.getRight() < this.getScene().getWidth()) {
      this.moveX(this.speed);
    }

    if (this.controller.keyDown(CommandEnum.UP) && this.getTop() > 0) {
      this.moveY(-this.speed);
    } else if (this.controller.keyDown(CommandEnum.DOWN) && this.getBottom() < this.getScene().getHeight()) {
      this.moveY(this.speed);
    }
  }
}

Quick.setName('Skel');
//Quick.setKeepAspect(true);  // I'd have this set
Quick.init(function () { return new GameScene() });
