let breathTime = 0; //for
let maxBreathTime = 8;
let isExhaling = false; //for inhale() and exhale() Blow Out functionality
let x = 0; //for inhale() and exhale()
let flameCount = 12; //for 
let breathTimeDisplay; //for
let hasInhaled = false;
let hasWon = false;
//let flamePositions = [[2,39.5], [1, 47.5]]; //top %, left %

function waitForCake() {
    alert("Make a wish before eating your cake.");
}

function requestWish() {
    let wish = prompt("Happy Birthday! Before you blow out your candles, make a wish!", "This birthday, I wish...");
    if (wish) {
        //remove "Make a wish" button
        event.srcElement.remove();

        //remove "waitForCake()" onclick attribute from cake img
        document.getElementById("flames-container").setAttribute("onclick", "null"); //maybe change to id=cake

        document.getElementById("sub-heading").innerHTML = "Now blow out your candles!";

        //create invisible flames
        for (let i = 1; i <= flameCount; i++) {
            console.log(i);
            createFlame(i);
        }

        //create Breath Time Display
        breathTimeDisplay = document.createElement("H3");
        breathTimeDisplay.innerHTML = "Breath Units: " + breathTime;
        document.getElementById("breath-time-container").appendChild(breathTimeDisplay);

        //create inhale and exhale buttons; assign functions
        createButton("Inhale", "buttons-container");
        document.getElementById("inhale").setAttribute("onclick", "inhale()");
        createButton("Exhale", "buttons-container");
        document.getElementById("exhale").setAttribute("onclick", "exhale()");
    }
}

//html id is set to lowercase Button Text
function createButton(buttonText, appendID) {
    let x = document.createElement("BUTTON");
    x.innerHTML = buttonText;
    x.setAttribute("id", buttonText.toLowerCase());
    document.getElementById(appendID).appendChild(x);
}

//create img element, add flame attributes (src, class, id, onclick), append
function createFlame(flameNumber) {
    let z = document.createElement("img");
    z.setAttribute("src", "resources/images/smoke.jpg");
    z.setAttribute("class", "flame");
    z.setAttribute("id", "flame" + flameNumber); //id specific flame for CSS
    z.setAttribute("onclick", "extinguishFlame()");
    document.getElementById("flames-container").appendChild(z);
}

//make smoke visible; reduce flameCount; flame onclick=null; if (flameCount == 0) {alert "win"}
function extinguishFlame() {
    if (isExhaling) {
        document.querySelector("#" + event.srcElement.id).style.opacity = 1;
        document.getElementById(event.srcElement.id).setAttribute("onclick", null);
        flameCount--;
        if (flameCount <=0) {
            alert("Good Job! Sorry, but you don't get your wish. Try keeping it to yourself next time.")
            hasWon = true;
            location.reload();
        }
    } else {
        alert("You can't blow out your candles if you're not exhaling.")
    }
}

//if (breathTime < 10) {increment Breath Time Display} else {alert "exhale"}
function inhale() {
    hasInhaled = true;
    isExhaling = false;
    if (breathTime < maxBreathTime) {
    breathTime++;
    breathTimeDisplay.innerHTML = "Breath Units: " + breathTime;
    } else {
        alert("Your lungs are full. Try exhaling.")
    }
}

//repeat secondly (effective immediately):
//decrement Breath Time Display; if (breathTime <= 0) {die}
function exhale() {
    if (!hasInhaled) {
        alert("You're out of breath. Try inhaling first.");
    }
    isExhaling = true;
    if (breathTime > 0) {
        x = setInterval(function() {
            if (!isExhaling) {
                clearInterval(x);
                breathTime++;
            }
            breathTime--;
            breathTimeDisplay.innerHTML = "Breath Units: " + breathTime;
            if (breathTime <= 0 && !hasWon) {
                clearInterval(x);
                die();
            }
        }, 1000);
    }
}

//alert "died" (minorly different if hasInhaled); reload page
function die() {
    if (!hasInhaled) {
        alert("Sorry, you died! Try inhaling next time.");
    } else {
        alert("Sorry, you died! Try inhaling more breath units next time.");
    }
    location.reload();
}