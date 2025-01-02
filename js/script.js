/**
 * Starts the game by hiding the start screen, showing the game canvas, and initializing the level and game.
 */
function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    document.getElementById('panel-div').style.display = 'block';
    initLevel();
    init();
}

/**
 * Restarts the game by hiding the game over and win screens, showing the game canvas, and re-initializing the level and game.
 * Unmutes the sounds if they were muted previously.
 */
function retryGame() {
    document.getElementById('game-over-screen').style.display = 'none';
    document.getElementById('win-screen').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    document.getElementById('panel-div').style.display = 'block';
    initLevel();
    init();
    unmuteSounds();
}

/**
 * Shows the dialog element by removing the 'd-none' class.
 */
function showDialog() {
    document.getElementById('dialog').classList.remove('d-none');
}

/**
 * Hides the dialog element by adding the 'd-none' class.
 */
function hideDialog() {
    document.getElementById('dialog').classList.add('d-none');
}

/**
 * Shows the impressum dialog by removing the 'd-none' class.
 */
function showImpressum() {
    document.getElementById('imp-dialog').classList.remove('d-none');
}

/**
 * Hides the impressum dialog by adding the 'd-none' class.
 */
function hideImpressum() {
    document.getElementById('imp-dialog').classList.add('d-none');
}