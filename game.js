var humanPlayer;
var computerPlayer;
var moving;

document.addEventListener("DOMContentLoaded", function() { console.log("content loaded");
    humanPlayer = document.getElementById("humanPlayer");
    computerPlayer = document.getElementById("computerPlayer");
    layout(humanPlayer, 45, 0.5);
    layout(computerPlayer, 45, 98.5);
    layout(document.getElementById("ball"), 49.5, 49.5, 3, 3)
});

document.addEventListener('keydown', function() {
    if(event.keyCode == 38) {
        // controls up
        move(humanPlayer,"up");
    } else if(event.keyCode == 40) {
        // controls down
        move(humanPlayer,"down");
    }
});

document.addEventListener('keyup', function() {moving = false;});

function move(element, direction, distance=200, duration=1000) {
    var topOrLeft = (direction=="left" || direction=="right") ? "left" : "top";
    var isNegated = (direction=="up" || direction=="left");
    if (isNegated) { distance *= -1; }
    var elStyle = window.getComputedStyle(element);
    var value = elStyle.getPropertyValue(topOrLeft).replace("px", "");
    var destination = Number(value) + distance;
    var frameDistance = distance / (duration / 10);
    if(!(Number(elStyle.getPropertyValue("top").replace("px","")) == 0)) {
        moving = true;
        function moveAFrame() {
        elStyle = window.getComputedStyle(element);
        value = elStyle.getPropertyValue(topOrLeft).replace("px", "");
        var newLocation = Number(value) + frameDistance;
        var beyondDestination = ( (!isNegated && newLocation>=destination) || (isNegated && newLocation<=destination) );
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

function layout(element, topval, leftval, height, width) {
    var elementStyle = window.getComputedStyle(element);
    var dh = window.innerHeight;
    var verPerc = window.innerHeight/100;
    var widPerc = window.innerWidth/100;
    element.style.top = verPerc*topval+"px";
    element.style.left = widPerc*leftval+"px";
    element.style.width = verPerc*width+"px";
    element.style.height = verPerc*height+"px";
    setInterval(function() {if(!moving) {layout(humanPlayer, 45, 0.5);
        layout(computerPlayer, 45, 98.5);
        layout(document.getElementById("ball"), 49.5,49.5,3,3);}},1500);
}