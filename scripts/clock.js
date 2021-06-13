let el = document.querySelector("#outerCircle");
let timerInput = 0;
function setTimerInput() {
    timerInput = document.querySelector("#timerInput").value;
    if (timerInput == '' || typeof parseInt(timerInput) != 'number' || isNaN(parseInt(timerInput))) {
        alert("input type not valid");
        return;
    }
    playTimer(timerInput);
}

document.querySelector("#timerSubmit").addEventListener('click', setTimerInput);

function playTimer(timerInput) {
    document.querySelector("#outerCircle").style.display = "flex";
    document.querySelector("#settingContainer").style.display = "none";
    document.querySelector("#countingMessage").innerText = "Counting...";
    let countTime = 1;
    desiredTime.innerText = countTime;
    let step = 360 / timerInput;
    let deg = 0;
    let progressbar = setInterval(() => {
        if (deg >= 360) {
            clearInterval(progressbar);
            document.querySelector("#timerInput").value = "";
            document.querySelector("#countingMessage").innerText = "Counting finished successfully!";
            document.querySelector("#settingContainer").style.display = "flex";
            document.querySelector("#outerCircle").style.display = "none";
        }
        el.style.background = "conic-gradient( #5fafff " + deg + "deg, #fff 6deg)";
        deg++;
    }, (1000/step));
    let timer = setInterval(() => {
        countTime++;
        if (countTime >= timerInput) {
            clearInterval(timer);
        }
        desiredTime.innerText = countTime;
    }, 1000);
}
