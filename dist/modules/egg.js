export var EggState;
(function (EggState) {
    EggState["Egg"] = "egg";
    EggState["Tamagtochi"] = "tamagotchi";
})(EggState || (EggState = {}));
export class Egg {
    constructor({ clicksToHatch, onEggHatch }) {
        this.eggClicks = 0;
        this.assets = new Map([
            [EggState.Egg, "assets/egg.svg"],
            [EggState.Tamagtochi, "assets/tamagotchi.svg"],
        ]);
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
