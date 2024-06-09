const body = document.getElementById("canvas");
const bird = document.getElementById("bird");
const scoreBox=document.getElementById("score");

let score=0;


let pillarGap = 0;
let prevWidth = 500;
let clear;

let clearRun;
let clearPillar;

clear = setInterval(() => {
    
    let topPillar = document.querySelectorAll(".pillarTop");
    let botPillar = document.querySelectorAll(".pillarBottom");
    topPillar.forEach((pillar) => {
        let left = parseFloat(window.getComputedStyle(pillar).left);
        let width = parseFloat(window.getComputedStyle(pillar).width);
        if (left <-width) {
            pillar.remove();
            
            score++;
            scoreBox.innerText="Score: " +score;
        } else {
            pillar.style.left = `${left - 3}px`;
        }
    });

    botPillar.forEach((pillar) => {
        let left = parseFloat(window.getComputedStyle(pillar).left);
        let width = parseFloat(window.getComputedStyle(pillar).width);
        if (left < -width) {
            pillar.remove();
        } else {
            pillar.style.left = `${left - 3}px`;
        }
    });

}, 10);

clearPillar = setInterval(() => {
    pillarGenerate();
}, 300);
// Create a pillar logic
function pillarGenerate() {
   
        if (prevWidth < 800) {
            
            let gap = Math.floor(Math.random() * 0) + 30;
            //for top
            let pillarHeight = Math.floor(Math.random() * 100) + 60;
            
            let newPillar = document.createElement("div");
            
            newPillar.setAttribute("class", "pillarTop");
            newPillar.style.height = `${pillarHeight}px`;
            newPillar.style.left = `${prevWidth + gap}px`;
            body.appendChild(newPillar);
    
            //for bottom
            let pillarHeight1 = Math.floor(Math.random() * 100) + 60;
            
            let newPillar1 = document.createElement("div");
           
            newPillar1.setAttribute("class", "pillarBottom");
            newPillar1.style.height = `${pillarHeight1}px`;
            newPillar1.style.left = `${prevWidth + gap}px`;
            body.appendChild(newPillar1);
            prevWidth +=gap;
           
        } else {
            prevWidth -= 50;
        }
    }

// jump logic
addEventListener("keydown", (event) => {
        let birdPos=parseFloat(window.getComputedStyle(bird).bottom);
        // console.log(birdPos);
        console.log(event.code);

        if (event.key == " " || event.key=="ArrowUp") {
            bird.style.bottom = `${birdPos+40}px`;
            
            
        }
});
clearRun = setInterval(() => {
    run();
}, 10);


function run() {
    let birdPos = parseInt(window.getComputedStyle(bird).bottom);
    
    bird.style.bottom = `${birdPos - 1.5}px`;
    // console.log(birdPos);

    // Get the first top and bottom pillar elements
    let topPillar = document.querySelectorAll(".pillarTop")[0];
    let botPillar = document.querySelectorAll(".pillarBottom")[0];

    // Check for collision with the top pillar
    let topPillarHeight = parseInt(window.getComputedStyle(topPillar).height);
    let topPillarLeft = parseInt(window.getComputedStyle(topPillar).left);
    console.log(topPillarHeight)
    if (birdPos >= (400-topPillarHeight) && topPillarLeft < 48) {
      
        gameOver();
        
    }

    // Check for collision with the bottom pillar
    let botPillarHeight = parseInt(window.getComputedStyle(botPillar).height);
    let botPillarLeft = parseInt(window.getComputedStyle(botPillar).left);

    if (birdPos <= botPillarHeight && botPillarLeft < 48) {
        
        gameOver();
    }

    // Check for collision with ground or ceiling
    if (birdPos < 0 || birdPos > 400) {
        // alert("Game over!");
        gameOver();
    }
}

//restart logic 

const restart=document.createElement("div");
function gameOver(){
  
    
    restart.setAttribute("id","restart");
    restart.innerText="Restart";
    
    restart.onclick = function() {
        window.location.reload();
    };

    body.appendChild(restart);
    clearInterval(clearPillar);
    clearInterval(clearRun);
    clearInterval(clear);
}




