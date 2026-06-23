let startingTire = "";
let pitTire = "";
let failOvertakeNext = false;


function radio(text) {
    document.querySelector(".radio-message").innerText = text;
}


function updateTireDisplay() {
    document.querySelector(".current-tire").innerText = pitTire || startingTire || "None";
}


document.querySelector(".story-opening").style.display = "none";
document.querySelector(".buttons").style.display = "none";
document.querySelector(".option-one-screen").style.display = "none";
document.querySelector(".option-two-screen").style.display = "none";
document.querySelector(".strategy-screen").style.display = "none";
document.querySelector(".overtake-fail").style.display = "none";
document.querySelector(".pit-screen").style.display = "none";
document.querySelector(".hamilton-win").style.display = "none";
document.querySelector(".verstappen-win").style.display = "none";
document.querySelector(".antonelli-win").style.display = "none";
document.querySelector(".user-win").style.display = "none";


function startGame() {
    document.querySelector(".pre-race-tires").style.display = "none";
    document.querySelector(".story-opening").style.display = "block";
    document.querySelector(".buttons").style.display = "block";

    updateTireDisplay();
    radio("Lights out at Monza.");
}


document.querySelector(".start-soft").onclick = function () {
    startingTire = "Soft";
    startGame();
};

document.querySelector(".start-medium").onclick = function () {
    startingTire = "Medium";
    startGame();
};

document.querySelector(".start-hard").onclick = function () {
    startingTire = "Hard";
    startGame();
};


document.querySelector(".option-one").onclick = function () {
    document.querySelector(".story-opening").style.display = "none";
    document.querySelector(".buttons").style.display = "none";
    document.querySelector(".option-one-screen").style.display = "block";

    radio("Aggressive start.");
};

document.querySelector(".option-two").onclick = function () {
    document.querySelector(".story-opening").style.display = "none";
    document.querySelector(".buttons").style.display = "none";
    document.querySelector(".option-two-screen").style.display = "block";

    radio("Controlled start.");
};


function attemptOvertake(successCallback) {

    if (failOvertakeNext) {
        failOvertakeNext = false;
        radio("Retry guaranteed success.");
        successCallback();
        return;
    }

    if (Math.random() < 0.45) {
        document.querySelector(".option-one-screen").style.display = "none";
        document.querySelector(".option-two-screen").style.display = "none";
        document.querySelector(".overtake-fail").style.display = "block";

        radio("Overtake failed!");
        failOvertakeNext = true;
        return;
    }

    successCallback();
}


document.querySelector(".one-overtake").onclick = function () {
    attemptOvertake(function () {
        document.querySelector(".option-one-screen").style.display = "none";
        document.querySelector(".pit-screen").style.display = "block";
        radio("Overtake completed.");
    });
};

document.querySelector(".two-overtake").onclick = function () {
    attemptOvertake(function () {
        document.querySelector(".option-two-screen").style.display = "none";
        document.querySelector(".pit-screen").style.display = "block";
        radio("Clean overtake.");
    });
};


document.querySelector(".retry-overtake").onclick = function () {
    document.querySelector(".overtake-fail").style.display = "none";
    document.querySelector(".pit-screen").style.display = "block";
    radio("Retrying next lap...");
};


document.querySelector(".pit-soft").onclick = function () {
    pitTire = "Soft";
    updateTireDisplay();

    document.querySelector(".pit-screen").style.display = "none";
    document.querySelector(".strategy-screen").style.display = "block";

    radio("Soft tire fitted. Maximum attack possible.");
};

document.querySelector(".pit-medium").onclick = function () {
    pitTire = "Medium";
    updateTireDisplay();

    document.querySelector(".pit-screen").style.display = "none";
    document.querySelector(".strategy-screen").style.display = "block";

    radio("Medium tire fitted. Balanced strategy.");
};

document.querySelector(".pit-hard").onclick = function () {
    pitTire = "Hard";
    updateTireDisplay();

    document.querySelector(".pit-screen").style.display = "none";
    document.querySelector(".strategy-screen").style.display = "block";

    radio("Hard tire fitted. Long stint mode.");
};


document.querySelector(".attack-strategy").onclick = function () {
    document.querySelector(".strategy-screen").style.display = "none";

    if (pitTire === "Soft") {
        document.querySelector(".user-win").style.display = "block";
    } else {
        document.querySelector(".hamilton-win").style.display = "block";
    }
};

document.querySelector(".balance-strategy").onclick = function () {
    document.querySelector(".strategy-screen").style.display = "none";

    if (pitTire === "Medium") {
        document.querySelector(".antonelli-win").style.display = "block";
    } else {
        document.querySelector(".verstappen-win").style.display = "block";
    }
};

document.querySelector(".defend-strategy").onclick = function () {
    document.querySelector(".strategy-screen").style.display = "none";

    if (pitTire === "Hard") {
        document.querySelector(".verstappen-win").style.display = "block";
    } else {
        document.querySelector(".hamilton-win").style.display = "block";
    }
};