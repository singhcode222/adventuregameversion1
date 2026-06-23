let startingTire = "";
let pitTire = "";
let currentStrategy = "";
let overtakeAttempts = 0;
let currentPosition = "P4";

function radio(text) {
    document.querySelector(".radio-message").innerText = text;
}

function updateTireDisplay() {
    document.querySelector(".current-tire").innerText =
        pitTire || startingTire || "None";

    document.querySelector(".starting-tire-display").innerText =
        startingTire || "None";

    document.querySelector(".pit-tire-display").innerText =
        pitTire || "None";
}

function updatePosition(position) {
    currentPosition = position;
    document.querySelector(".current-position").innerText = position;
}

function hideAllScreens() {

    document.querySelector(".story-opening").style.display = "none";
    document.querySelector(".buttons").style.display = "none";
    document.querySelector(".option-one-screen").style.display = "none";
    document.querySelector(".option-two-screen").style.display = "none";
    document.querySelector(".overtake-fail").style.display = "none";
    document.querySelector(".pit-screen").style.display = "none";
    document.querySelector(".strategy-screen").style.display = "none";

    document.querySelector(".hamilton-win").style.display = "none";
    document.querySelector(".verstappen-win").style.display = "none";
    document.querySelector(".antonelli-win").style.display = "none";
    document.querySelector(".user-win").style.display = "none";
    document.querySelector(".dsq-screen").style.display = "none";
}

function startGame() {

    document.querySelector(".pre-race-tires").style.display = "none";

    document.querySelector(".story-opening").style.display = "block";
    document.querySelector(".buttons").style.display = "block";

    updateTireDisplay();
    updatePosition("P4");

    radio("Lights out and away we go at Monza.");
}

/* start tire */

document.querySelector(".start-soft").onclick = function () {
    startingTire = "Soft";
    updateTireDisplay();
    startGame();
};

document.querySelector(".start-medium").onclick = function () {
    startingTire = "Medium";
    updateTireDisplay();
    startGame();
};

document.querySelector(".start-hard").onclick = function () {
    startingTire = "Hard";
    updateTireDisplay();
    startGame();
};

/* start */

document.querySelector(".option-one").onclick = function () {

    document.querySelector(".story-opening").style.display = "none";
    document.querySelector(".buttons").style.display = "none";

    document.querySelector(".option-one-screen").style.display = "block";

    radio("Aggressive move into Turn 1.");
};

document.querySelector(".option-two").onclick = function () {

    document.querySelector(".story-opening").style.display = "none";
    document.querySelector(".buttons").style.display = "none";

    document.querySelector(".option-two-screen").style.display = "block";

    radio("Using the slipstream.");
};

/* overtaking */

function getFailChance() {

    if (overtakeAttempts === 0) {
        return 0.65;
    }

    if (overtakeAttempts === 1) {
        return 0.45;
    }

    if (overtakeAttempts === 2) {
        return 0.25;
    }

    return 0;
}

function attemptOvertake(successScreen) {

    let failChance = getFailChance();

    overtakeAttempts++;

    if (Math.random() < failChance) {

        document.querySelector(".option-one-screen").style.display = "none";
        document.querySelector(".option-two-screen").style.display = "none";

        document.querySelector(".overtake-fail").style.display = "block";

        document.querySelector(".attempt-message").innerText =
            "Attempt " +
            overtakeAttempts +
            " failed. DRS is helping and the next attempt will be easier.";

        radio("Still stuck behind the car ahead.");

        return;
    }

    successScreen();
}

function overtakeSuccess() {

    updatePosition("P3");

    hideAllScreens();

    document.querySelector(".pit-screen").style.display = "block";

    radio("Overtake completed. Safety Car deployed.");
}

document.querySelector(".one-overtake").onclick = function () {
    attemptOvertake(overtakeSuccess);
};

document.querySelector(".two-overtake").onclick = function () {
    attemptOvertake(overtakeSuccess);
};

document.querySelector(".retry-overtake").onclick = function () {

    document.querySelector(".overtake-fail").style.display = "none";

    document.querySelector(".option-two-screen").style.display = "block";

    radio("Prepare for another attempt.");
};

/* pit */

document.querySelector(".pit-soft").onclick = function () {

    pitTire = "Soft";
    updateTireDisplay();

    checkDSQ();
};

document.querySelector(".pit-medium").onclick = function () {

    pitTire = "Medium";
    updateTireDisplay();

    checkDSQ();
};

document.querySelector(".pit-hard").onclick = function () {

    pitTire = "Hard";
    updateTireDisplay();

    checkDSQ();
};

/* dsq rule */

function checkDSQ() {

    if (startingTire === pitTire) {

        hideAllScreens();

        document.querySelector(".dsq-screen").style.display = "block";

        document.querySelector(".dsq-reason").innerText =
            "You started on " +
            startingTire +
            " tires and switched to " +
            pitTire +
            " tires. FIA regulations require drivers in a dry race to use at least two different tire compounds. Try a different strategy.";

        radio("Car disqualified after the race.");

        return;
    }

    document.querySelector(".pit-screen").style.display = "none";
    document.querySelector(".strategy-screen").style.display = "block";

    radio("Pit stop complete. Final laps ahead.");
}

/* winner explantation */

function showWinner(screenClass, explanation, position) {

    hideAllScreens();

    updatePosition(position);

    document.querySelector(screenClass).style.display = "block";

    document
        .querySelector(screenClass + " .result-text")
        .innerText = explanation;
}

function determineWinner() {

    let score = 0;

    /* tire */

    if (startingTire === "Soft") score += 2;
    if (startingTire === "Medium") score += 1;

    if (pitTire === "Soft") score += 2;
    if (pitTire === "Medium") score += 1;

    /* strategy bonus points */

    if (currentStrategy === "Attack") {

        if (pitTire === "Soft") score += 2;
        else score -= 1;
    }

    if (currentStrategy === "Balance") {

        if (pitTire === "Medium") score += 2;
        else score += 1;
    }

    if (currentStrategy === "Defend") {

        if (pitTire === "Hard") score += 2;
    }

    /* race reulst */

    if (score >= 5) {

        showWinner(
            ".user-win",
            "Perfect strategy. Your tire choices gave you the pace needed to win at Monza.",
            "P1"
        );

        return;
    }

    if (score === 4) {

        showWinner(
            ".antonelli-win",
            "Antonelli managed the restart better and edged you to victory.",
            "P2"
        );

        return;
    }

    if (score === 3) {

        showWinner(
            ".verstappen-win",
            "Verstappen used superior race pace to take the win.",
            "P3"
        );

        return;
    }

    showWinner(
        ".hamilton-win",
        "Hamilton's Ferrari was too quick in the closing laps.",
        "P4"
    );
}

/* strat butons */

document.querySelector(".attack-strategy").onclick = function () {

    currentStrategy = "Attack";

    determineWinner();
};

document.querySelector(".balance-strategy").onclick = function () {

    currentStrategy = "Balance";

    determineWinner();
};

document.querySelector(".defend-strategy").onclick = function () {

    currentStrategy = "Defend";

    determineWinner();
};