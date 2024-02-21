import { Egg, EggState } from "./egg.js";

export type GameInitProps = {
  eggElement: HTMLImageElement;
  actionButtonElement: HTMLButtonElement;
  counterElement: HTMLParagraphElement;
  resultElement: HTMLParagraphElement;
}

export class Game {
  counterElement: HTMLParagraphElement;
  actionButtonElement: HTMLButtonElement;
  resultElement: HTMLParagraphElement;
  eggElement: HTMLImageElement;
  stopWatch = 0;
  timePassed = 0;
  clicksToHatch = 30;
  timeResolution = 100;

  eggInstance: Egg;

  constructor(params: GameInitProps) {
    this.counterElement = params.counterElement;
    this.eggElement = params.eggElement;
    this.resultElement = params.resultElement;
    this.actionButtonElement = params.actionButtonElement;
    this.actionButtonElement.addEventListener("click", this.restartGame);

    this.eggInstance = new Egg({
      eggElement: params.eggElement,
      counterElement: params.counterElement,
    });
  }

  finishGame() {
    clearInterval(this.stopWatch);
    this.stopWatch = 0;
    this.resultElement.textContent = `${(this.timePassed / 1000).toString()} seconds`;
    this.actionButtonElement.classList.remove("hidden");

    this.eggInstance.changeEggState(EggState.Tamagtochi);
    this.eggInstance.unsubscribeTap(this.onEggTap);
  }

  restartGame = () => {
    this.timePassed = 0;
    this.resultElement.textContent = "";
    this.actionButtonElement.classList.add("hidden");

    this.eggInstance.restartEgg();
    this.eggInstance.subscribeTap(this.onEggTap);
  };

  passTime = () => this.timePassed += this.timeResolution;

  onEggTap = (eggClicks: number) => {
    if (!this.stopWatch) {
      this.stopWatch = setInterval(this.passTime, this.timeResolution);
    }

    if (eggClicks >= this.clicksToHatch) {
      this.finishGame();
    }
  };
}
