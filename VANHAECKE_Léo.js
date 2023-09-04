"use strict";

const $startBtn = document.getElementById("start-btn");
const $guessBtn = document.getElementById("guess-btn");
const $cowBtn = document.getElementById("cow-btn");
const $output = document.getElementById("output");
const $numUsr = document.getElementById("num-usr");
const $maxUsr = document.getElementById("max-usr");
let secretNumber = 0;
let nbGuesses = 0;
let maxGuesses = 0;
let game = false;

function launchGame(_evt) {
  game = true;
  secretNumber = Math.floor(Math.random() * parseInt($maxUsr.value)) + 1;
  console.log(secretNumber);
  maxGuesses = Math.ceil(Math.log($maxUsr.value))+1;
  console.log(maxGuesses)
  nbGuesses = 0;
  $guessBtn.disabled = false;
  $output.textContent = `Devinez le nombre secret (entre 1 et ${$maxUsr.value}), en ${maxGuesses} essais.`;
  $numUsr.focus();
  $startBtn.disabled = true;
}

$numUsr.addEventListener("keydown", function (evt) {
  if (game && evt.key === "Enter") {
    checkGuess();
  }
});

function checkGuess() {
  if (game === true) {
    let $retour = '';
    let restant = maxGuesses - nbGuesses;
    const userGuess = parseInt($numUsr.value);
    if (isNaN(userGuess)) {
      $output.innerText +="\nVeuillez entrer un nombre valide.";
      return;
    }
    nbGuesses++;
    restant = maxGuesses - nbGuesses;
    if (userGuess === secretNumber) {
      if (nbGuesses === 1){
        $retour = `Bravo ! Vous avez trouvé le nombre secret : ${secretNumber} en ${nbGuesses} tentative.`;
      }
      else {
        $retour = `Bravo! Vous avez trouvé le nombre secret : ${secretNumber} en ${nbGuesses} tentatives.`;
      }
      $guessBtn.disabled = true;
      $startBtn.disabled = false;
      game = false;
      $numUsr.removeEventListener("keydown", checkGuess);
    } 
    else if (userGuess < secretNumber) {
      $retour = `Trop bas. Essayez encore. Essai(s) restant(s) : ${restant}`;
    } 
    else {
      $retour = `Trop haut. Essayez encore. Essai(s) restant(s) : ${restant}`;
    }
    if (nbGuesses >= maxGuesses) {
      $retour = `Vous avez atteint la limite de tentatives. Le nombre secret était ${secretNumber}.`;
      $guessBtn.disabled = true;
      $startBtn.disabled = false;
      game = false;
      $numUsr.removeEventListener("keydown", checkGuess);
    }
    $output.innerHTML += `<br>Tentative ${nbGuesses}: ${userGuess} - ${$retour}`;
    $numUsr.value = "";
  }
}

$guessBtn.addEventListener("click", checkGuess);
$startBtn.addEventListener("click", launchGame);

function addCow(evt) {
  console.debug(evt.pageX, evt.pageY);
  const cowImage = document.createElement("img");
  const rotation = Math.random() * 360;
  cowImage.classList.add("cow");
  cowImage.style.left = (evt.pageX-25) + "px";
  cowImage.style.top = (evt.pageY-25) + "px";
  cowImage.style.transform = `rotate(${rotation}deg)`;
  cowImage.src = "https://upload.wikimedia.org/wikipedia/commons/3/30/Cowicon.svg";
  document.body.appendChild(cowImage);
}

function toggleCow(_evt) {
  if (document.onmousedown instanceof Function) {
    document.onmousedown = null;
  } else {
    document.onmousedown = addCow;
  }
}
$cowBtn.addEventListener("click", toggleCow);