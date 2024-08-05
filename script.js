let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCount = 1;

const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const timeDisplay = document.getElementById('time');
const lapsList = document.getElementById('lapsList');

function startStopwatch() {
    if (!running) {
        if (!startTime) {
            startTime = new Date().getTime();
        } else {
            startTime = new Date().getTime() - difference;
        }
        tInterval = setInterval(updateTime, 1000);
        startStopBtn.textContent = 'Pause';
        running = true;
    } else {
        clearInterval(tInterval);
        startStopBtn.textContent = 'Start';
        running = false;
    }
}

function resetStopwatch() {
    clearInterval(tInterval);
    running = false;
    startStopBtn.textContent = 'Start';
    timeDisplay.textContent = '00:00:00';
    difference = 0;
    startTime = null;
    lapsList.innerHTML = '';
    lapCount = 1;
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const formattedTime = `${(hours < 10 ? "0" : "") + hours}:${(minutes < 10 ? "0" : "") + minutes}:${(seconds < 10 ? "0" : "") + seconds}`;

    timeDisplay.textContent = formattedTime;
}

function addLap() {
    if (running) {
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCount}: ${timeDisplay.textContent}`;
        lapsList.appendChild(lapItem);
        lapCount++;
    }
}

startStopBtn.addEventListener('click', startStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', addLap);
