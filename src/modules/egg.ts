export enum EggState {
  Egg = "egg",
  Tamagtochi = "tamagotchi",
}

export class Egg {
  eggClicks: number = 0;
  assets = new Map([
    [EggState.Egg, "assets/egg.svg"],
    [EggState.Tamagtochi, "assets/tamagotchi.svg"],
  ]);

  tapEgg() {
    this.eggClicks++;
  }
}
