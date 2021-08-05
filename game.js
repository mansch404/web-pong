
/*
* PONG GAME
*/

// Variables

var humanPlayer;
var computerPlayer;
var ball;
var humanPlayerBoundings;
var computerPlayerBoundings;

// Document Event Listener

document.addEventListener("DOMContentLoaded", function () {
    console.log("content loaded");
    humanPlayer = document.getElementById("humanPlayer");
    computerPlayer = document.getElementById("computerPlayer");
    humanPlayerBoundings = humanPlayer.getBoundingClientRect();
    computerPlayerBoundings = computerPlayer.getBoundingClientRect();
    ball = document.getElementById("ball");
    layout(humanPlayer, 45, 0.5);
    layout(computerPlayer, 45, 98.5);
    layout(ball, 49.5, 49.5, 3, 3)
});

document.addEventListener('keydown', function () {
    if (event.keyCode == 38) {
        // controls up
        move(humanPlayer, "up");
    } else if (event.keyCode == 40) {
        // controls down
        move(humanPlayer, "down");
    }
});

// Window Event Listener

window.addEventListener("resize", function () {
    layout(computerPlayer, 45, 98.5);
    layout(ball, 49.5, 49.5, 3, 3, 500);
});

// Functions

function move(element, direction, distance = 200, duration = 1000) {
    if (humanPlayerBoundings.top >= 0 && humanPlayerBoundings.top <= window.innerHeight) {
        console.log(humanPlayerBoundings.top);
        var topOrLeft = (direction == "left" || direction == "right") ? "left" : "top";
        var isNegated = (direction == "up" || direction == "left");
        if (isNegated) { distance *= -1; }
        var elStyle = window.getComputedStyle(element);
        var value = elStyle.getPropertyValue(topOrLeft).replace("px", "");
        var destination = Number(value) + distance;
        var frameDistance = distance / (duration / 10);
        if (!(Number(elStyle.getPropertyValue("top").replace("px", "")) == 0)) {
            function moveAFrame() {
                elStyle = window.getComputedStyle(element);
                value = elStyle.getPropertyValue(topOrLeft).replace("px", "");
                var newLocation = Number(value) + frameDistance;
                var beyondDestination = ((!isNegated && newLocation >= destination) || (isNegated && newLocation <= destination));
                if (beyondDestination) {
                    element.style[topOrLeft] = destination + "px";
                    clearInterval(movingFrames);
                }
                else {
                    element.style[topOrLeft] = newLocation + "px";
                }
            }
            var movingFrames = setInterval(moveAFrame, 10);
        }
    }
}

function layout(element, topval, leftval, height, width) {
    var elementStyle = window.getComputedStyle(element);
    var dh = window.innerHeight;
    var verPerc = window.innerHeight / 100;
    var widPerc = window.innerWidth / 100;
    element.style.top = verPerc * topval + "px";
    element.style.left = widPerc * leftval + "px";
    element.style.width = verPerc * width + "px";
    element.style.height = verPerc * height + "px";

}

function getPositionRelative(element, dir) {
    var h = window.innerHeight / 100;
    console.log(h);
    var elementStyle = window.getComputedStyle(element);
    var elementHeightCurr = Number(elementStyle.getPropertyValue(dir).replace("px", "")) / 50;
    var posRel = h / elementHeightCurr;
    return posRel;
}

