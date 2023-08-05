import { Egg, EggState } from "./egg.js";
export class Game {
    constructor() {
        this.counterElement = null;
        this.actionButtonElement = null;
        this.resultElement = null;
        this.eggElement = null;
        this.stopWatch = null;
        this.secondsPassed = 0;
        this.eggInstance = new Egg({
            clicksToHatch: 30,
            onEggHatch: this.hatchEgg.bind(this),
        });
    }
    init(params) {
        if (!params.counterElement || !params.eggElement) {
            throw new Error("One of elements not found");
        }
        this.counterElement = params.counterElement;
        this.eggElement = params.eggElement;
        this.resultElement = params.resultElement;
        this.actionButtonElement = params.actionButtonElement;
        this.displayEggClicks();
        this.mountEgg();
        console.log("Game started");
    }
    displayEggClicks() {
        if (!this.counterElement) {
            throw new Error("Counter element not found");
        }
        this.counterElement.innerText = String(this.eggInstance.eggClicks);
    }
    startStopWatch() {
        this.stopWatch = setInterval(() => {
            this.secondsPassed = this.secondsPassed + 100;
        }, 100);
    }
    showResetButton() {
        if (!this.actionButtonElement) {
            throw new Error("Action button element not found");
        }
        this.actionButtonElement.innerText = "Restart";
        this.actionButtonElement.classList.remove("hidden");
        this.actionButtonElement.addEventListener("click", () => {
            this.restartGame();
        });
    }
    hideResetButton() {
        if (!this.actionButtonElement) {
            throw new Error("Action button element not found");
        }
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
        if (!this.eggElement) {
            throw new Error("Egg element not found");
        }
        const eggImageSrc = this.eggInstance.assets.get(EggState.Egg);
        if (!eggImageSrc) {
            throw new Error("Egg image src not found");
        }
        this.eggElement.src = eggImageSrc;
    }
    mountEgg() {
        if (!this.eggElement) {
            throw new Error("Egg element not found");
        }
        this.displayEgg();
        this.eggElement.addEventListener("click", this.updateEggClick.bind(this));
    }
    displayResult() {
        if (!this.resultElement) {
            throw new Error("Result element not found");
        }
        this.resultElement.innerText = !!this.secondsPassed
            ? (this.secondsPassed / 1000).toString() + " seconds"
            : "";
    }
    hatchEgg() {
        if (!this.eggElement) {
            throw new Error("Egg element not found");
        }
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
