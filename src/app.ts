import { Game, GameInitProps } from "./modules/game.js";

document.addEventListener("DOMContentLoaded", function () {
  const counterElement = document.querySelector("#counter");
  const eggElement = document.querySelector("#egg");
  const resultElement = document.querySelector("#result");
  const actionButtonElement = document.querySelector("#action-btn");
  if (!counterElement || !eggElement || !resultElement || !actionButtonElement) {
    return;
  }

  const gameInitProps = {
    actionButtonElement,
    resultElement,
    counterElement,
    eggElement,
  } as GameInitProps;

  new Game(gameInitProps);
});
