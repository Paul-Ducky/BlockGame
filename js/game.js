//          //====================================================================\\
//          || get all the variables muhahahaha --> initial settings for the game. ||
//          \\====================================================================//


    const target = document.getElementById('target');
    const player = document.getElementById('player');
    const points = document.getElementById("score");
    const lifeTracker = document.getElementById("life-tracker");
    points.innerText = "Score: 00";
    let lives = 5;
    let time = 0
    let totalScore = 0;
    let totalImmunity = 0;
    let speed = 10; //@todo add multipliers!
    let immune = false;
    let blocks = []

function game() {
//       //===============================================\\
//      || All time-based functions: time, score, movement ||
//       \\===============================================//

    function timer() { // time and spawn mechanic
        ++time;
        if (time % 2 === 0 || time % 3 === 0) {
            spawnChaser();
        }
        if (time % 4 === 0 || time % 6 === 0) {
            spawnRunner();
        }
        if (time % 10 === 0 || time % 15 === 0) {
            spawnBigBoi();
        }
        if (time % 25 === 0) {
            spawnTerminator();
        }
        if (time % 40 === 0) {
            spawnLife();
        }
        if (time % 60 === 0) {
            spawnImmunity();
        }
    }

    function ticks() {
        ++totalScore
        points.innerText = "Score: " + totalScore;
        lifeTracker.innerText = "lives: " + lives;
        if (lives <= 0) {
            // if lives becomes 0 or less -> stop everything;
            reset();
            alert("you survived " + time + " Seconds! and Scored: " + totalScore + " points!");
            clearInterval(runTimer);
            clearInterval(tickRate);
            clearInterval(moveRate);
            clearInterval(collisionCheckRate);
            game();
        }
    }

    function move() {

        blocks = document.querySelectorAll(".hostile");
        blocks.forEach(block => {

            let randomizer = Math.floor(Math.random() * 20);
            let blockLeft = Number(block.style.left.substring(0, (block.style.left.length - 2)));
            let blockTop = Number(block.style.left.substring(0, (block.style.left.length - 2)));
            if (randomizer >= 15) {
                block.style.left = (blockLeft - Math.floor(Math.random() * innerWidth)) + "px";
            } else if (randomizer >= 10) {
                block.style.left = (blockLeft + Math.floor(Math.random() * innerWidth)) + "px";
            } else if (randomizer >= 5) {
                block.style.top = (blockTop - Math.floor(Math.random() * innerHeight)) + "px";
            } else if (randomizer < 5) {
                block.style.top = (blockTop + Math.floor(Math.random() * innerHeight)) + "px";
            }
        });
    }
    let collisionCheckRate = setInterval(collision,10)
    let runTimer = setInterval(timer, 800); // keep this on 1k for 1sec intervals --> find a way to update more frequently without messing with score
    let tickRate = setInterval(ticks, 100);
    let moveRate = setInterval(move, 4000);


//                  //===============================================\\
//                  ||Function overview: reset - spawning - collision||
//                  \\===============================================//

    function reset() {
        time = 0;
        totalScore = 0;
        lives = 5;
        speed = 10;
        points.innerText = "00";
        totalImmunity = 0;
        blocks = document.querySelectorAll(".collidable");
        blocks.forEach(block => {
            block.remove()
        });
    }

    function lostLife() {
        target.style.background = "#B50000";
        setTimeout(function () {
            target.style.background = "#262626";
        }, 50);
    }

    function gainedLife() {
        target.style.background = "#00aa00";
        setTimeout(function () {
            if (immune) {
                target.style.background = "#004F70"
            } else {
                target.style.background = "#262626";
            }
        }, 50);
    }

    function gainedImmunity() {
        target.style.background = "#004F70";
        setTimeout(function () {
            target.style.background = "#262626"
        }, 10000)
    }

    function placement(element) {
        element.style.left = Math.round(Math.random() * innerWidth) - element.offsetWidth + "px";
        element.style.top = Math.round(Math.random() * innerHeight) - element.offsetHeight + "px";
    }

    function spawnChaser() {

        let chaser = document.createElement("div");
        chaser.className = "chaser collidable hostile";
        placement(chaser);
        target.appendChild(chaser);

    }

    function spawnRunner() {

        let runner = document.createElement("div");
        runner.className = "runner collidable hostile";
        placement(runner)
        target.appendChild(runner);

    }


    function spawnBigBoi() {

        let bigBoi = document.createElement("div");
        bigBoi.className = "big-boi collidable hostile";
        placement(bigBoi)
        target.appendChild(bigBoi);

    }

    function spawnTerminator() {

        let terminator = document.createElement("div");
        terminator.className = "terminator collidable hostile";
        placement(terminator);
        target.appendChild(terminator);

    }

    function spawnLife() {
        let life = document.createElement("div");
        life.className = "life collidable";
        placement(life);
        target.appendChild(life);
    }

    function spawnImmunity() {
        if (totalImmunity < 1) {
            totalImmunity++
            let immunity = document.createElement("div");
            immunity.className = "immunity collidable";
            immunity.style.left = Math.round(Math.random() * innerWidth) + "px";
            immunity.style.top = Math.round(Math.random() * innerHeight) + "px";
            target.appendChild(immunity)
        }
    }

    function removeImmunity() {
        player.className = "";
        immune = false;
        totalImmunity = 0;
        return immune;
    }

    function collision() {
        let collided = false;
        let currentLeft = Number(player.style.left.substring(0, (player.style.left.length - 2)));
        let currentWidth = Number(player.style.width.substring(0, (player.style.width.length - 2)));
        let currentTop = Number(player.style.top.substring(0, (player.style.top.length - 2)));
        let currentHeight = Number(player.style.height.substring(0, (player.style.height.length - 2)));

        blocks = document.querySelectorAll(".collidable");
        blocks.forEach(block => {

            let blockLeft = block.getBoundingClientRect().left;
            let blockWidth = block.getBoundingClientRect().right - blockLeft;
            let blockTop = block.getBoundingClientRect().top;
            let blockHeight = block.getBoundingClientRect().bottom - blockTop;

            if (currentLeft < blockLeft + blockWidth &&
                currentLeft + currentWidth > blockLeft &&
                currentTop < blockTop + blockHeight &&
                currentTop + currentHeight > blockTop) {
                collided = true;

                if (collided === true) {
                    if (block.className.includes("chaser")) {
                        block.remove();
                        if (immune) {
                            //nothing happens
                        } else {
                            lives = lives - 1;
                            lostLife();
                        }
                    }
                    if (block.className.includes("big-boi")) {
                        block.remove();
                        if (immune) {
                            //nothing happens
                        } else {
                            lives = lives - 2;
                            lostLife();
                        }
                    }
                    if (block.className.includes("runner")) {
                        block.remove();
                        if (immune) {
                            //nothing happens
                        } else {
                            lives = lives - 1;
                            lostLife();
                        }
                    }
                    if (block.className.includes("terminator")) {
                        if (immune) {
                            //nothing happens
                        } else {
                            lives = 0;
                            lostLife();
                        }
                    }
                    if (block.className.includes("life")) {
                        lives = lives + 1;
                        block.remove();
                        gainedLife();
                    }
                    if (block.className.includes("immunity")) {
                        player.className = "immunity"
                        block.remove();
                        gainedImmunity();
                        immune = true;
                        setTimeout(removeImmunity, 10000);
                        return immune;
                    }
                    //if (block.className.includes("")){ }
                }
            } else {
                collided = false;
                return collided
            }
        });
    }

}


//                  //=================\\
//                  || player controls ||
//                  \\=================//


// sadly css needs "px" so to adjust we need to remove them
// also had to style inline, or else we'd jump into the borders on first key downs!
document.addEventListener("keydown", function (event) {
    let currentLeft = Number(player.style.left.substring(0, (player.style.left.length - 2)));
    let currentTop = Number(player.style.top.substring(0, (player.style.top.length - 2)));
    switch (event.key) {
        case "q":
            if (currentLeft <= 0) {
                player.style.left = 5 + "px";
            } else {
                player.style.left = (currentLeft - speed) + "px";
            }
            break;
        case "a":
            if (currentLeft <= 0) {
                player.style.left = 5 + "px";
            } else {
                player.style.left = (currentLeft - speed) + "px";
            }
            break;
        case "d":
            if (currentLeft >= innerWidth - player.offsetWidth) {
                player.style.left = innerWidth - player.offsetWidth - 5 + "px";
            } else {
                player.style.left = (currentLeft + speed) + "px";
            }
            break;
        case "z":
            if (currentTop <= 0) {
                player.style.top = 5 + "px";
            } else {
                player.style.top = (currentTop - speed) + "px";
            }
            break;
        case "w":
            if (currentTop <= 0) {
                player.style.top = 5 + "px";
            } else {
                player.style.top = (currentTop - speed) + "px";
            }
            break;
        case "s":
            if (currentTop >= innerHeight - player.offsetHeight) {
                player.style.top = innerHeight - player.offsetHeight - 5 + "px";
            } else {
                player.style.top = (currentTop + speed) + "px";
            }
            break;
    }
});

game();
//@todo add movement to hostiles!
