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
  stopWatch = 0;
  timePassed = 0;
  eggInstance: Egg;
  clicksToHatch = 30;
  timeResolution = 100;

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
    this.timePassed = 0;
    this.removeResult();
    this.eggInstance.restartEgg();
    this.hideResetButton();
  }

  startStopWatch() {
    this.stopWatch = setInterval(this.passTime, this.timeResolution);
  }

  stopStopWatch() {
    clearInterval(this.stopWatch);
  }

  passTime = () => this.timePassed += this.timeResolution;

  displayResult() {
    this.resultElement.textContent = `${(this.timePassed / 1000).toString()} seconds`;
  }

  removeResult() {
    this.resultElement.textContent = "";
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

  updateEggClick() {
    if (!this.stopWatch) {
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
