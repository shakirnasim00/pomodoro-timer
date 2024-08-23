const btn25 = document.getElementById("twenty-five-button")
const btn5 = document.getElementById("five-button")

const startBtn = document.getElementById("start")
const pauseBtn = document.getElementById("pause")
const resetBtn = document.getElementById("reset")

const menu = document.getElementById("dropdown-menu")

const timerClock = document.getElementById("timer")

const notificationAudio = new Audio("resources/simple-notification-152054.mp3")

let interval;
let timerRunning = false;
let timeLeft = 1500; // 1500s = 25 minutes
let twentyFiveMinActive = true;

notificationAudio.load() //pre-load the audio

setButtonColor()


function setButtonColor() {
    if(twentyFiveMinActive === true) {
        btn25.style.backgroundColor = 'white';
        btn25.style.color = 'black';

        btn5.style.backgroundColor = "rgba(0, 0, 0, 0)";
        btn5.style.color = "white";
    } else if(twentyFiveMinActive === false) {
        btn5.style.backgroundColor = 'white';
        btn5.style.color = 'black';

        btn25.style.backgroundColor = "rgba(0, 0, 0, 0)";
        btn25.style.color = "white";
    }
}

function setTwentyFiveMin() {
    timeLeft = 1500;
    updateTimer()
    twentyFiveMinActive = true;
}

function setFiveMin() {
    timeLeft = 300;
    updateTimer()
    twentyFiveMinActive = false;
}

function updateTimer() {
    let minutes = Math.floor(timeLeft / 60)
    let seconds = timeLeft % 60

     let formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    timerClock.innerHTML = formattedTime;
}

function startTimer() {
    if (timerRunning) return; // If timer is already running, do nothing.

    timerRunning = true; // Sets timerRunning to true 

    interval = setInterval(()=> {
        timeLeft--;
        updateTimer();

        if(timeLeft === 0) {
            clearInterval(interval);
            notificationAudio.play();
        }
    }, 1000)
}

function pauseTimer() {
    clearInterval(interval);
    timerRunning = false;
}

function resetTimer()  {
    clearInterval(interval);
    timerRunning = false;

    if(twentyFiveMinActive) {
    timeLeft = 1500;
    } else {
        timeLeft = 300;
    }
    updateTimer();
}

function showMenu() {
    menu.style.display = "block";
}



startBtn.addEventListener("click", startTimer)

pauseBtn.addEventListener("click", pauseTimer)

resetBtn.addEventListener("click", resetTimer)

btn25.addEventListener("click", setButtonColor)

btn5.addEventListener("click", setButtonColor)

btn25.addEventListener("click", resetTimer)

btn5.addEventListener("click", resetTimer)

// document.getElementById('bg-icon').addEventListener('click', showMenu); to be added for menu