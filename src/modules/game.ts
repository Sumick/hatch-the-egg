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
  secondsPassed = 0;
  eggInstance: Egg;
  clicksToHatch = 30;

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
      eggElement: params.eggElement,
      counterElement: params.counterElement,
    });
    
    this.mountEgg();
    console.log("Game started");
  }

  restartGame() {
    this.secondsPassed = 0;
    this.displayResult();
    this.eggInstance.restartEgg();
    this.hideResetButton();
  }

  startStopWatch() {
    this.stopWatch = setInterval(() => {
      this.secondsPassed = this.secondsPassed + 100;
    }, 100);
  }

  stopStopWatch() {
    if (!this.stopWatch) {
      throw new Error("Stop watch not found");
    }

    clearInterval(this.stopWatch);
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

  displayResult() {
    this.resultElement.innerText = !!this.secondsPassed
      ? (this.secondsPassed / 1000).toString() + " seconds"
      : "";
  }

  updateEggClick() {
    if (this.stopWatch === null) {
      this.startStopWatch();
    }

    this.eggInstance.tapEgg();

    if (this.eggInstance.eggClicks >= this.clicksToHatch) {
      this.hatchEgg();
    }
  }

  mountEgg() {
    this.eggElement.addEventListener("click", this.updateEggClick.bind(this));
  }

  hatchEgg() {
    this.eggInstance.changeEggState(EggState.Tamagtochi);
    this.displayResult();
    this.stopStopWatch();
    this.showResetButton();
  }
}
