'use strict'

const allButtons = document.querySelectorAll('button');
const themeSelector = document.querySelectorAll('input');
const screen = document.querySelector(".screen");
const screenButtons = document.querySelectorAll(".on-screen");
const deleteBtn = document.querySelector("#delete");
const equalBtn = document.querySelector("#equal");
const resetBtn = document.querySelector("#reset");
const sound = document.querySelector("#sound");
let screenValue = '';

themeSelector.forEach((selector) => {
  selector.addEventListener("click", () => {
    document.documentElement.className = '';
    document.documentElement.classList.add(`${selector.value}`);
    localStorage.setItem('theme', selector.value);
  })
})

function init() {
  screen.textContent = 0;
  if (localStorage.getItem('theme') !== null) {
    document.documentElement.classList.add(localStorage.getItem('theme'));
    document.querySelector(`[value="${localStorage.getItem('theme')}"]`).checked = true;
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add("theme-1");
    document.querySelector(`[value=theme-1]`).checked = true;
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    document.documentElement.classList.add("theme-2");
    document.querySelector(`[value=theme-2]`).checked = true;
  }
}

init()

screenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.textContent === 'x') {
      button.textContent = '*';
    }

    screenValue += button.textContent;
    screen.textContent = screenValue;
  })
})

equalBtn.addEventListener("click", () => {
  try {
    if (eval(screen.textContent) === Infinity) {
      screen.textContent = 0;
      screenValue = ''; 
    } else {
      let output = eval(screen.textContent);
      screenValue = output;
      screen.textContent = output; 
    }
  } catch (e) {
    screenValue = '';
    screen.textContent = e.name + ', RESET '; 
  }
})

resetBtn.addEventListener("click", () => {
  screenValue = '';
  screen.textContent = 0;
})

deleteBtn.addEventListener("click", () => {
  screen.textContent = screen.textContent.slice(0, -1);
  screenValue = screen.textContent;
})

allButtons.forEach((button) => {
  button.addEventListener("click", () => {
    sound.play();
  })
})