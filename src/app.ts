import { Game } from "./modules/game.js";

document.addEventListener("DOMContentLoaded", function () {
  const counter = document.querySelector(
    "#counter"
  ) as HTMLParagraphElement | null;
  const egg = document.querySelector("#egg") as HTMLImageElement | null;

  const game = new Game();
  game.init({
    counterElement: counter,
    eggElement: egg,
  });
});
