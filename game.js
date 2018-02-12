'use strict';

// imports
const CommandEnum = quick.CommandEnum;
const Quick = quick.Quick;
const Sprite = quick.Sprite;
const Scene = quick.Scene;

// constants
const SPEED = 2;

// classes
class GameScene extends Scene {
  constructor() {
    super();
    let width = Quick.getWidth()*1.5;
    let height = Quick.getHeight()*1.5;
    this.setWidth(width).setHeight(height);
    this.add(new Background(width, height));
    let player = new Player(this.getCenterX(), this.getCenterY());
    this.add(player);
    this.add(new Camera(player));
    // random squares to give some movement perspective:
    for (let i=0; i<20; ++i) {
      let bgSquare = new Sprite();
      bgSquare.setX(Quick.random(width)).setY(Quick.random(height));
      bgSquare.setSize(10, 10).setColor('yellow');
      this.add(bgSquare);
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
  constructor(width, height) {
    super(0, 0, width, height);
    // without setting color, you get a quake-like no-clip glitch
    this.setColor('green');
  }
}

class Player extends Sprite {
  constructor(x, y) {
    super(x, y);
    this.controller = Quick.getController();
    this.setColor('White');
    this.setSize(32, 32);
  }

  // override
  update() {
    if (this.controller.keyDown(CommandEnum.LEFT) && this.getLeft() > 0) {
      this.moveX(-SPEED);
    } else if (this.controller.keyDown(CommandEnum.RIGHT) && this.getRight() < this.getScene().getWidth()) {
      this.moveX(SPEED);
    }

    if (this.controller.keyDown(CommandEnum.UP) && this.getTop() > 0) {
      this.moveY(-SPEED);
    } else if (this.controller.keyDown(CommandEnum.DOWN) && this.getBottom() < this.getScene().getHeight()) {
      this.moveY(SPEED);
    }
  }
}

Quick.setName('Skel');
Quick.setKeepAspect(true);  // I'd have this set
Quick.init(function () { return new GameScene() });
