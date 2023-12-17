"use strict";

// Element/s
const heading = document.querySelector("h1");
const container = document.querySelector(".container");

// Data/s
const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let start = false;
let level = 0;

// Function/s
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

function playSound(name) {
	let sound = new Audio(`./sounds/${name}.mp3`);
	sound.play();
}

function nextSequence() {
	// Increment level by 1
	level++;

	heading.textContent = `Level ${level}`;

	// Generate a random number from 0 - 3
	const randomNumber = Math.floor(Math.random() * 4);

	// Using randomNumber, select an element in buttonColors array
	const randomChosenColor = buttonColors[randomNumber];

	// Add radomChosenColor to gamePattern array
	gamePattern.push(randomChosenColor);

	// Get the button with the same ID as randomChosenColor
	const button = document.getElementById(randomChosenColor);

	// Animate the button
	animatePress(button.id);

	// Play the sound for the button
	playSound(randomChosenColor);
}

function checkAnswer(currentLevel) {
	// Check if the most recent user answer matches the game pattern
	if (userClickedPattern[currentLevel - 1] === gamePattern[currentLevel - 1]) {
		// Check if the user has finished their sequence
		if (userClickedPattern.length === gamePattern.length) {
			// Clear the user's sequence for the next level after a delay
			setTimeout(() => {
				userClickedPattern = [];
				nextSequence();
			}, 1000);
		}
	} else {
		// If the sequences do not match, end the game
		alert("Game Over! Your score is: " + (level - 1));

		// Reset variables for a new game
		gamePattern = [];
		userClickedPattern = [];
		start = false;
		level = 0;
		heading.textContent = "Press Any Key to Start";
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

	// Add the corresponding color to userClickedPattern array
	userClickedPattern.push(userChosenColor);

	// Play sound based on userChosenColor
	playSound(userChosenColor);

	// Animate corresponding button color
	animatePress(userChosenColor);

	// Check the user's answer
	checkAnswer(userClickedPattern.length);
});

document.addEventListener("keydown", function (event) {
	if (!start) {
		nextSequence();
		start = !start;
	}
});
