let canvas;
let world;
let keyboard = new Keyboard();
let gamestart = false;
let soundsMuted = false;
let sounds = {
    walking_sound: new Audio('audio/steps.mp3'),
    jump_sound: new Audio('audio/jump.mp3'),
    idle_sound: new Audio('audio/longidle.mp3'),
    chicken_perma_sound: new Audio('audio/chicken.mp3'),
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
sounds.chicken_perma_sound.volume = 0.15;
sounds.bottle.volume = 0.25;

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
    } else {
        muteSounds();
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
 * Handles the orientation change event and adjusts the visibility of various elements on the page.
 */
function handleOrientationChange() {
    const rotateDiv = document.getElementById('rotate'); 
    let canvas = document.getElementById('canvas-div');
    let winScreen = document.getElementById('win-div');  
    let gameOverScreen = document.getElementById('game-over-div');
    let panelFrame = document.getElementById('panel-div');
    let startScreen = document.getElementById('start-screen');
    let canvasDiv = document.getElementById('canvas-div');

    if (window.innerWidth > window.innerHeight) {
        rotateDiv.classList.add('d-none');
        canvas.classList.remove('d-none');
        winScreen.classList.remove('d-none');
        gameOverScreen.classList.remove('d-none')
        panelFrame.classList.remove('d-None');
        startScreen.classList.remove('d-none');
        canvasDiv.classList.remove('d-none');
    } else {
        rotateDiv.classList.remove('d-none');
        canvas.classList.add('d-none');
        winScreen.classList.add('d-none');
        gameOverScreen.classList.add('d-none')
        panelFrame.classList.add('d-None');
        startScreen.classList.add('d-none');
        canvasDiv.classList.add('d-none');
    }
}

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
        toggleMuteSounds();
    }
    if (event.keyCode == 67) {
        keyboard.C = true;
    }
});

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
});

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
    }
    if (event.target.id === 'button-throw') {
        event.preventDefault();
        keyboard.B = false;
    }
});