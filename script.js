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
});

document.addEventListener("keydown", function (event) {
	if (!start) {
		nextSequence();
		start = !start;
	}
});
