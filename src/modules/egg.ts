export enum EggState {
  Egg = "egg",
  Tamagtochi = "tamagotchi",
}

interface EggParams {
  clicksToHatch: number;
  onEggHatch: () => void;
}

export class Egg {
  eggClicks: number = 0;
  clicksToHatch: number;
  assets = new Map([
    [EggState.Egg, "assets/egg.svg"],
    [EggState.Tamagtochi, "assets/tamagotchi.svg"],
  ]);
  onEggHatch: () => void;

  constructor({ clicksToHatch, onEggHatch }: EggParams) {
    this.clicksToHatch = clicksToHatch;
    this.onEggHatch = onEggHatch;
  }

  tapEgg() {
    if (this.eggClicks >= this.clicksToHatch) {
      return;
    }

    this.eggClicks++;

    if (this.eggClicks >= this.clicksToHatch) {
      this.onEggHatch();
    }
  }
}
