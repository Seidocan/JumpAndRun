let canvas;
let world;
let keyboard = new Keyboard();
let gamestart = false;
let soundsMuted = false;
let sounds = {
    walking_sound: new Audio('audio/steps.mp3'),
    jump_sound: new Audio('audio/jump.mp3'),
    idle_sound: new Audio('audio/longidle.mp3'),
    chicken: new Audio('audio/chicken.mp3'),
    chick: new Audio('audio/chick.mp3'),
    hurt: new Audio('audio/hurt.mp3'),
    coin: new Audio('audio/piccoin.mp3'),
    bottle: new Audio('audio/picbottle.mp3'),
    spend: new Audio('audio/fullHP.mp3'),
    throw_sound: new Audio('audio/throwbottle.mp3'),
    music: new Audio('audio/Elpollolocotheme.mp3'),
    win: new Audio('audio/win.mp3'),
    hit_enemy: new Audio('audio/hitenemy.mp3'),
    stomp: new Audio('audio/stomp.mp3'),
    boss_hit: new Audio('audio/boss_hit.mp3')
}

sounds.music.volume = 0.02;
sounds.chicken.volume = 0.2;
sounds.bottle.volume = 0.25;
sounds.chick.volume = 0.15;

/**
 * Initializes the game by setting up the canvas and the game world.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

/**
 * Plays a specific sound if it is paused. Restarts the sound from the beginning.
 * @param {string} sound - The name of the sound to be played.
 */
function playSound(sound) {
    const audio = sounds[sound];
    if (audio && audio.paused) {
        audio.currentTime = 0;
        audio.play().catch(error => {
            console.error(`Fehler beim Abspielen des Sounds ${sound}:`, error);
        });
    }
}

/**
 * Pauses a specific sound if it is currently playing.
 * @param {string} sound - The name of the sound to be paused.
 */
function pauseSound(sound) {
    const audio = sounds[sound];
    if (audio && !audio.paused) {
        audio.pause();
    }
}

/**
 * Toggles fullscreen mode for the canvas element.
 */
function toggleFullscreen() {
    const canvas = document.getElementById('canvas');
    if (!document.fullscreenElement) {
        canvas?.requestFullscreen?.();
    } else {
        document.exitFullscreen?.();
    }
}

/**
 * Toggles the mute state for all game sounds.
 */
function toggleMuteSounds() {
    if (soundsMuted) {
        unmuteSounds();
        document.getElementById('toggle-sounds').src = 'img/hud_icons/soundOn.png';
    } else {
        muteSounds();
        document.getElementById('toggle-sounds').src = 'img/hud_icons/soundOff.png';
    }
    soundsMuted = !soundsMuted;
}

/**
 * Mutes all game sounds.
 */
function muteSounds() {
    for (let soundName in sounds) {
        sounds[soundName].muted = true;
    }
}

/**
 * Unmutes all game sounds.
 */
function unmuteSounds() {
    for (let soundName in sounds) {
        sounds[soundName].muted = false;
    }
}

/**
 * Stops all game activities, including intervals, timeouts, and resets the game world.
 */
function stopAll() {
    clearIntervals();
    clearTimeouts();
    world = null;
    keyboard = new Keyboard();
}

/**
 * Clears all active intervals in the game.
 */
function clearIntervals() {
    let id = setInterval(() => { }, 0);
    while (id--) {
        clearInterval(id);
    }
}

/**
 * Clears all active timeouts in the game.
 */
function clearTimeouts() {
    let id = setTimeout(() => { }, 0);
    while (id--) {
        clearTimeout(id);
    }
}

window.addEventListener('resize', handleOrientationChange);
window.addEventListener('orientationchange', handleOrientationChange);
document.addEventListener('DOMContentLoaded', handleOrientationChange);

/**
 * Handles the change in screen orientation. 
 */
function handleOrientationChange() {
    const rotateDiv = document.getElementById('rotate');
    let canvas = document.getElementById('canvas-div');
    let winScreen = document.getElementById('win-div');
    let gameOverScreen = document.getElementById('game-over-div');
    let panelFrame = document.getElementById('panel-div');
    let startScreen = document.getElementById('start-screen');
    let canvasDiv = document.getElementById('canvas-div');
    let muteBtn = document.getElementById('toggle-sound-btn');

    if (window.innerWidth > window.innerHeight) {
        showLandscapeMode(rotateDiv, canvas, winScreen, gameOverScreen, panelFrame, startScreen, canvasDiv, muteBtn);
    } else {
        showPortraitMode(rotateDiv, canvas, winScreen, gameOverScreen, panelFrame, startScreen, canvasDiv, muteBtn);
    }
}

/**
 * Shows the elements in landscape mode (width > height).
 * @param {HTMLElement} rotateDiv - The element to hide in landscape mode.
 * @param {HTMLElement} canvas - The canvas element to show in landscape mode.
 * @param {HTMLElement} winScreen - The win screen to show in landscape mode.
 * @param {HTMLElement} gameOverScreen - The game over screen to show in landscape mode.
 * @param {HTMLElement} panelFrame - The panel frame to show in landscape mode.
 * @param {HTMLElement} startScreen - The start screen to show in landscape mode.
 * @param {HTMLElement} canvasDiv - The canvas div to show in landscape mode.
 */
function showLandscapeMode(rotateDiv, canvas, winScreen, gameOverScreen, panelFrame, startScreen, canvasDiv, muteBtn) {
    rotateDiv.classList.add('d-none');
    canvas.classList.remove('d-none');
    winScreen.classList.remove('d-none');
    gameOverScreen.classList.remove('d-none');
    panelFrame.classList.remove('d-none-i');
    startScreen.classList.remove('d-none');
    canvasDiv.classList.remove('d-none');
    muteBtn.classList.remove('d-none');
}

/**
 * Shows the elements in portrait mode (height > width).
 * @param {HTMLElement} rotateDiv - The element to show in portrait mode.
 * @param {HTMLElement} canvas - The canvas element to hide in portrait mode.
 * @param {HTMLElement} winScreen - The win screen to hide in portrait mode.
 * @param {HTMLElement} gameOverScreen - The game over screen to hide in portrait mode.
 * @param {HTMLElement} panelFrame - The panel frame to hide in portrait mode.
 * @param {HTMLElement} startScreen - The start screen to hide in portrait mode.
 * @param {HTMLElement} canvasDiv - The canvas div to hide in portrait mode.
 */
function showPortraitMode(rotateDiv, canvas, winScreen, gameOverScreen, panelFrame, startScreen, canvasDiv, muteBtn) {
    rotateDiv.classList.remove('d-none');
    canvas.classList.add('d-none');
    winScreen.classList.add('d-none');
    gameOverScreen.classList.add('d-none');
    panelFrame.classList.add('d-none-i');
    startScreen.classList.add('d-none');
    canvasDiv.classList.add('d-none');
    muteBtn.classList.add('d-none');
}

/**
 * Event listener for keyboard input (keydown).
 * @param {KeyboardEvent} event - The event triggered by the keydown action.
 */
window.addEventListener("keydown", (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (event.keyCode == 38) {
        keyboard.UP = true;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (event.keyCode == 66) {
        keyboard.B = true;
    }
    if (event.keyCode == 70) {
        keyboard.F = true;
        toggleFullscreen();
    }
    if (event.keyCode == 83) {
        keyboard.S = true;
        toggleMuteSounds();
    }
    if (event.keyCode == 67) {
        keyboard.C = true;
    }
});

/**
 * Event listener for keyboard input (keyup).
 * @param {KeyboardEvent} event - The event triggered by the keyup action.
 */
window.addEventListener("keyup", (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
        pauseSound('walking_sound');
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = false;
        pauseSound('walking_sound');
    }
    if (event.keyCode == 38) {
        keyboard.UP = false;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (event.keyCode == 66) {
        keyboard.B = false;
    }
    if (event.keyCode == 70) {
        keyboard.F = false;
    }
    if (event.keyCode == 83) {
        keyboard.S = false;
    }
    if (event.keyCode == 67) {
        keyboard.C = false;
    }
});

/**
 * Event listener for touchstart (when a user touches the screen).
 * @param {TouchEvent} event - The touchstart event triggered by the user interaction.
 */
window.addEventListener("touchstart", (event) => {
    if (event.target.id === 'button-right') {
        event.preventDefault();
        keyboard.RIGHT = true;
    }
    if (event.target.id === 'button-left') {
        event.preventDefault();
        keyboard.LEFT = true;
    }
    if (event.target.id === 'button-jump') {
        event.preventDefault();
        keyboard.SPACE = true;
    }
    if (event.target.id === 'button-throw') {
        event.preventDefault();
        keyboard.B = true;
    }
    if (event.target.id === 'toggle-sounds') {
        event.preventDefault();
        keyboard.S = true;
        toggleMuteSounds();
    }
}, { passive: false });

/**
 * Event listener for touchend (when a user releases a touch on the screen).
 * @param {TouchEvent} event - The touchend event triggered by the user interaction.
 */
window.addEventListener("touchend", (event) => {
    if (event.target.id === 'button-right') {
        event.preventDefault();
        keyboard.RIGHT = false;
        pauseSound('walking_sound');
    }
    if (event.target.id === 'button-left') {
        event.preventDefault();
        keyboard.LEFT = false;
        pauseSound('walking_sound');
    }
    if (event.target.id === 'button-jump') {
        event.preventDefault();
        keyboard.SPACE = false;
        pauseSound('walking_sound');
    }
    if (event.target.id === 'button-throw') {
        event.preventDefault();
        keyboard.B = false;
        pauseSound('walking_sound');
    }
    if (event.target.id === 'toggle-sounds') {
        event.preventDefault();
        keyboard.S = false;

    }
}, { passive: false });