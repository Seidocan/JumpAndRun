function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    document.getElementById('panel-frame').style.display = 'block';
    initLevel();
    init();
}


function retryGame() {
    document.getElementById('game-over-screen').style.display = 'none';
    document.getElementById('win-screen').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    document.getElementById('panel-frame').style.display = 'block';
    initLevel();
    init();
    unmuteSounds();
}

function showDialog() {
    document.getElementById('dialog').classList.remove('d-none');
}

function hideDialog(){
    document.getElementById('dialog').classList.add('d-none');
}

function showImpressum(){
    document.getElementById('imp-dialog').classList.remove('d-none');
}

function hideImpressum(){
    document.getElementById('imp-dialog').classList.add('d-none');
}