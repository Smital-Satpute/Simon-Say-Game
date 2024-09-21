let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highestScore = 0;

let h3 = document.querySelector("h3");
let scoreDisplay = document.querySelector("#high-score");

document.addEventListener("keypress" , function() {
    if(started == false) {
        console.log("Game is Started");
        started = true;

        levelUP();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 300);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 300);
}

function levelUP() {
    userSeq = [];
    level++;
    h3.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    btnFlash(randBtn);
}

function checkAns(idx) {

    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUP,1000);
        }
    } else {
        if(level > highestScore) {
            highestScore = level - 1;
        }

        scoreDisplay.innerHTML = `Highest Score: ${highestScore}`;

        h3.innerHTML = `GAME OVER! Your Score was ${level} <br> Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white"; 
        },150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1); 
}

let allBtns = document.querySelectorAll(".btn");

for(let btn of allBtns) {
    btn.addEventListener("click",btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
