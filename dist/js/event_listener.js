import {COMMANDS, MESSAGES} from './constants.js';

//cache DOM elements
const terminal = document.getElementById("terminal");
const response = document.getElementById('resp');
const iframe_content = document.getElementById('cont');
const EMPTY_PAGE_PATH = 'pages/empty.html';
const EMPTY_STRING = "";

//always keep the terminal in focus
document.addEventListener("click", () => terminal.focus());

//enter key event listener
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;

  const input = acceptCommand();

  if (isUnrecognizedCommand(input)) {
    serveUnrecognizedCommand();
  } else {
    serveCommand(input);
  }

  resetTypingAnimation();
});

function resetTypingAnimation() {
    response.style.animation = 'none';
    void response.offsetHeight; // restart animation
    response.style.animation = null;
}

function isUnrecognizedCommand(input) {
    return !COMMANDS[input];
}

function serveCommand(input) {
    response.value = getRandomMsg();
    iframe_content.src = COMMANDS[input];
}

function serveUnrecognizedCommand() {
    response.value = COMMANDS.unrecognized;
    iframe_content.src = EMPTY_PAGE_PATH;
}

function acceptCommand() {
    const input = terminal.value.trim().toLowerCase();
    terminal.value = EMPTY_STRING; //wipe terminal after 'enter'
    return input;
}

function getRandomMsg() {
    return MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
}
