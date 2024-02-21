export enum EggState {
  Egg = "egg",
  Tamagtochi = "tamagotchi",
}

export type EggInitProps = {
  eggElement: HTMLImageElement,
  counterElement: HTMLParagraphElement,
};

export class Egg {
  eggClicks = 0;
  eggElement: HTMLImageElement;
  counterElement: HTMLParagraphElement;
  assets = new Map([
    [EggState.Egg, "assets/egg.svg"],
    [EggState.Tamagtochi, "assets/tamagotchi.svg"],
  ]);

  constructor(params: EggInitProps) {
    this.eggElement = params.eggElement;
    this.counterElement = params.counterElement;
    this.restartEgg();
    this.eggElement.addEventListener("click", () => {
      this.eggClicks++;
      this.counterElement.textContent = this.eggClicks.toString();
      for (let subscriber of this.tapSubscribers) {
        subscriber(this.eggClicks);
      }
    });
  }

  restartEgg() {
    this.eggClicks = 0;
    this.counterElement.textContent = this.eggClicks.toString();
    this.changeEggState(EggState.Egg);
  }

  changeEggState(newState: EggState) {
    if (!this.assets.has(newState)) {
      throw new Error("Egg image src not found");
    }

    this.eggElement.src = this.assets.get(newState)!;
  }

  tapSubscribers: Set<Function> = new Set();

  subscribeTap(subscriber: Function) {
    return this.tapSubscribers.add(subscriber);
  }

  unsubscribeTap(subscriber: Function) {
    return this.tapSubscribers.delete(subscriber);
  }
}
