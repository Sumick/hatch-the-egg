import { Egg, EggState } from "./egg.js";

export type GameInitProps = {
  eggElement: HTMLImageElement | null;
  actionButtonElement: HTMLButtonElement | null;
  counterElement: HTMLParagraphElement | null;
  resultElement: HTMLParagraphElement | null;
}

export class Game {
  counterElement: HTMLParagraphElement;
  actionButtonElement: HTMLButtonElement;
  resultElement: HTMLParagraphElement;
  eggElement: HTMLImageElement;
  stopWatch: number | null = null;
  secondsPassed: number = 0;
  eggInstance: Egg;

  constructor(params: GameInitProps) {
    if (params.counterElement === null) {
      throw new Error("Counter element not found");
    }
    if (params.eggElement === null) {
      throw new Error("Egg element not found");
    }
    if (params.resultElement === null) {
      throw new Error("Result element not found");
    }
    if (params.actionButtonElement === null) {
      throw new Error("Action button element not found");
    }
    this.counterElement = params.counterElement;
    this.eggElement = params.eggElement;
    this.resultElement = params.resultElement;
    this.actionButtonElement = params.actionButtonElement;
    this.eggInstance = new Egg({
      clicksToHatch: 30,
      onEggHatch: this.hatchEgg.bind(this),
    });
    this.displayEggClicks();
    this.mountEgg();
    console.log("Game started");
  }

  displayEggClicks() {
    this.counterElement.innerText = String(this.eggInstance.eggClicks);
  }

  startStopWatch() {
    this.stopWatch = setInterval(() => {
      this.secondsPassed = this.secondsPassed + 100;
    }, 100);
  }

  showResetButton() {
    this.actionButtonElement.innerText = "Restart";
    this.actionButtonElement.classList.remove("hidden");
    this.actionButtonElement.addEventListener("click", () => {
      this.restartGame();
    });
  }

  hideResetButton() {
    this.actionButtonElement.classList.add("hidden");
    this.actionButtonElement.removeEventListener("click", () => {
      this.restartGame();
    });
  }

  restartGame() {
    this.secondsPassed = 0;
    this.displayResult();
    this.eggInstance.eggClicks = 0;
    this.displayEggClicks();
    this.displayEgg();
    this.hideResetButton();
  }

  stopStopWatch() {
    if (!this.stopWatch) {
      throw new Error("Stop watch not found");
    }

    clearInterval(this.stopWatch);
  }

  updateEggClick() {
    this.eggInstance.tapEgg();
    this.displayEggClicks();

    switch (this.eggInstance.eggClicks) {
      case 1:
        this.startStopWatch();
        break;
    }
  }

  displayEgg() {
    const eggImageSrc = this.eggInstance.assets.get(EggState.Egg);

    if (!eggImageSrc) {
      throw new Error("Egg image src not found");
    }

    this.eggElement.src = eggImageSrc;
  }

  mountEgg() {
    this.displayEgg();
    this.eggElement.addEventListener("click", this.updateEggClick.bind(this));
  }

  displayResult() {
    this.resultElement.innerText = !!this.secondsPassed
      ? (this.secondsPassed / 1000).toString() + " seconds"
      : "";
  }

  hatchEgg() {
    const eggImageSrc = this.eggInstance.assets.get(EggState.Tamagtochi);

    if (!eggImageSrc) {
      throw new Error("Egg image src not found");
    }

    this.eggElement.src = eggImageSrc;
    this.displayResult();

    this.stopStopWatch();
    this.showResetButton();
  }
}
