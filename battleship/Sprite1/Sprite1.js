/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sprite1 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Sprite1/costumes/costume1.svg", {
        x: 15.833333333333343,
        y: 15.833343333333346,
      }),
      new Costume("costume2", "./Sprite1/costumes/costume2.svg", {
        x: 15.833333333333343,
        y: 15.833343333333346,
      }),
    ];

    this.sounds = [new Sound("pop", "./Sprite1/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "searchVariables" },
        this.whenIReceiveSearchvariables
      ),
    ];

    this.vars.mynumberx = 0;
    this.vars.mynumbery = 10;
    this.vars.i = 356;
  }

  *whenGreenFlagClicked() {
    this.stage.vars.NumberOfGuesses = 0;
    this.vars.mynumberx = 0;
    this.vars.mynumbery = 0;
    this.goto(-126, 126);
    for (let i = 0; i < 10; i++) {
      for (let i = 0; i < 10; i++) {
        this.createClone();
        this.x += 28;
        this.vars.mynumberx++;
        yield;
      }
      this.vars.mynumberx = 0;
      this.vars.mynumbery++;
      this.y -= 28;
      this.x = -126;
      yield;
    }
    this.visible = false;
  }

  *startAsClone() {
    this.visible = true;
    yield* this.searchvariables();
    while (true) {
      if (this.touching("mouse") && this.mouse.down) {
        this.stage.vars.Guessesdatax =
          this.toString(this.stage.vars.Guessesdatax) +
          this.toString(this.vars.mynumberx);
        this.stage.vars.Guessesdatay =
          this.toString(this.stage.vars.Guessesdatay) +
          this.toString(this.vars.mynumbery);
        this.broadcast("searchVariables");
        while (!!(this.touching("mouse") && this.mouse.down)) {
          yield;
        }
      }
      if (null) {
        null;
      }
      yield;
    }
  }

  *searchvariables() {
    this.effects.clear();
    this.vars.i = 1;
    for (let i = 0; i < this.stage.vars.Guessesdatax.length; i++) {
      if (
        this.compare(
          this.letterOf(this.stage.vars.Guessesdatax, this.vars.i - 1),
          this.vars.mynumberx
        ) === 0
      ) {
        if (
          this.compare(
            this.letterOf(this.stage.vars.Guessesdatay, this.vars.i - 1),
            this.vars.mynumbery
          ) === 0
        ) {
          this.effects.brightness +=
            (375 / (this.stage.vars.Guessesdatax.length / 5)) * -1;
        }
      }
      this.vars.i++;
    }
  }

  *whenIReceiveSearchvariables() {
    yield* this.searchvariables();
  }
}
