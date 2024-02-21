export type EggInitProps = {
  eggElement: HTMLImageElement,
  counterElement: HTMLParagraphElement,
};

export class Egg {
  eggClicks = 0;
  eggElement: HTMLImageElement;
  counterElement: HTMLParagraphElement;
  defaultImgUrl = "assets/egg.svg";
  hatchedImgUrl = "assets/tamagotchi.svg";
  isHatched = false;

  constructor(params: EggInitProps) {
    this.eggElement = params.eggElement;
    this.counterElement = params.counterElement;
    this.restartEgg();
    this.eggElement.addEventListener("click", () => {
      if (this.isHatched) {
        return;
      }
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
    this.eggElement.src = this.defaultImgUrl;
    this.isHatched = false;
  }

  hatchEgg() {
    this.eggElement.src = this.hatchedImgUrl;
    this.isHatched = true;
  }

  tapSubscribers: Set<Function> = new Set();

  subscribeTap(subscriber: Function) {
    return this.tapSubscribers.add(subscriber);
  }

  unsubscribeTap(subscriber: Function) {
    return this.tapSubscribers.delete(subscriber);
  }
}
