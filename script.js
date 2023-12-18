"use strict";

// Element/s
const heading = document.querySelector("h1");
const container = document.querySelector(".container");
const body = document.querySelector("body");

// Initial state data/s
const buttonColors = ["red", "blue", "green", "yellow"];
const sounds = {
	wrong: new Audio("./sounds/wrong.mp3"),
	green: new Audio("./sounds/green.mp3"),
	blue: new Audio("./sounds/blue.mp3"),
	yellow: new Audio("./sounds/yellow.mp3"),
	red: new Audio("./sounds/red.mp3"),
};
let gamePattern = [];
let userClickedPattern = [];
let start = false;
let level = 0;

// Function/s
function playSound(name) {
	const sound = sounds[name];
	sound.play();
}

function animatePress(currentColor) {
	// Get button element based on corresponding color
	const button = document.getElementById(currentColor);

	// Add "pressed" class to the button (flash effect)
	button.classList.add("pressed");

	// Remove "pressed" class after 100 milliseconds
	setTimeout(() => {
		button.classList.remove("pressed");
	}, 100);
}

function nextSequence() {
	// Clear the user's sequence
	userClickedPattern = [];

	// Increment level by 1
	level++;

	heading.textContent = `Level ${level}`;

	// Generate a random number from 0 - 3
	const randomNumber = Math.floor(Math.random() * 4);

	// Using randomNumber, select an element in buttonColors array
	const randomChosenColor = buttonColors[randomNumber];

	console.log(randomChosenColor);

	// Add radomChosenColor to gamePattern array
	gamePattern.push(randomChosenColor);

	// Get the button with the same ID as randomChosenColor
	const button = document.getElementById(randomChosenColor);

	// Animate the button
	animatePress(button.id);

	// Play the sound for the button
	playSound(randomChosenColor);
}

function startOver() {
	gamePattern = [];
	userClickedPattern = [];
	start = false;
	level = 0;
}

function checkAnswer(currentLevel) {
	// Check if the most recent user answer matches the game pattern
	if (userClickedPattern[currentLevel - 1] === gamePattern[currentLevel - 1]) {
		// Check if the user has finished their sequence
		if (userClickedPattern.length === gamePattern.length) {
			// Clear the user's sequence for the next level after a delay
			setTimeout(() => {
				nextSequence();
			}, 1000);
		}
	} else {
		// Play wrong sound
		playSound("wrong");

		// Add "game-over" class to document body
		body.classList.add("game-over");

		// Remove "game-over" class after 200 milliseconds
		setTimeout(() => {
			body.classList.remove("game-over");
		}, 200);

		// Change heading textContent
		heading.textContent = "Game Over, Press Any Key to Restart";

		// Restart game
		startOver();
	}
}

// Event Listener/s
container.addEventListener("click", function (event) {
	// Target element/s with the class "color"
	const element = event.target.closest(".color");

	// Exit function if element does not have "color" class
	if (!element) return;

	// Get element id (with corresponding color)
	const userChosenColor = element.id;
	console.log(userChosenColor);

	// Add the corresponding color to userClickedPattern array
	userClickedPattern.push(userChosenColor);

	// Play sound based on userChosenColor
	playSound(userChosenColor);

	// Animate corresponding button color
	animatePress(userChosenColor);

	// Check the user's answer
	checkAnswer(userClickedPattern.length);
});

document.addEventListener("keydown", function () {
	if (!start) {
		nextSequence();
		start = !start;
	}
});
