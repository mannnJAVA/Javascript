const quotes = [
    "JavaScript makes web pages interactive.",

    
    "When you wake each morning, remember that the day is not a blank space waiting for fate. It is a field waiting for the seeds you plant through every choice, word, and action. The smallest effort, repeated with patience, builds a life stronger than any sudden stroke of luck.",

    "Practice makes a developer perfect.",
    
    "The greatest victories rarely come with trumpets. They arrive quietly, after long nights of persistence, when nobody is watching and you have only your own will to lean on. True strength is the decision to keep moving when comfort whispers for you to stop.",
    
    "Wisdom is not a trophy earned at the end of study; it is the practice of listening to experience and reshaping your thoughts. It is the humility to admit what you do not know and the courage to act on the truths you discover along the way.",
    
    "Coding is like writing a story with logic.",

    "Progress is a slow river, not a lightning strike. Each day you add a stone to the bank, each effort a ripple that carries you forward. You may not see the change in a week or a month, but years from now the current of your choices will have carved a powerful path.",
    

    "Learning by doing is the best way to master programming."
];

const quoteE1 = document.getElementById("quote");
const inputE1 = document.getElementById("input");
const resultE1 = document.getElementById("result");
const resetBtn = document.getElementById("resetBtn");
const timerE1 = document.getElementById("timer");

let startTime;
let currentQuote;
let timerInterval = null;

// Load a new quote
function loadNewQuote() {
    currentQuote = quotes[Math.floor(Math.random() * quotes.length)];

    // Display each character as span
    quoteE1.innerHTML = "";
    currentQuote.split("").forEach(char => {
        const span = document.createElement("span");
        span.innerText = char;
        quoteE1.appendChild(span);
    });

    // Reset input & results
    inputE1.value = "";
    resultE1.textContent = "";
    timerE1.textContent = "Time: 0s";

    // Stop running timer
    clearInterval(timerInterval);
    timerInterval = null;
    startTime = null;
}

// Start timer
function startTimer() {
    startTime = new Date();
    timerInterval = setInterval(() => {
        const currentTime = new Date();
        const timePassed = Math.floor((currentTime - startTime) / 1000);
        timerE1.textContent = `Time: ${timePassed}s`;
    }, 1000);
}

// Calculate accuracy
function calculateAccuracy(typed, original) {
    let correct = 0;
    for (let i = 0; i < typed.length; i++) {
        if (typed[i] === original[i]) correct++;
    }
    return Math.round((correct / original.length) * 100);
}

// Handle typing
inputE1.addEventListener("input", () => {
    const arrayQuote = quoteE1.querySelectorAll("span");
    const arrayValue = inputE1.value.split("");

    // Start timer only once
    if (timerInterval === null) {
        startTimer();
    }

    let correct = true;
    arrayQuote.forEach((charspan, index) => {
        const char = arrayValue[index];
        if (char == null) {
            charspan.classList.remove("correct", "incorrect");
            correct = false;
        } else if (char === charspan.innerText) {
            charspan.classList.add("correct");
            charspan.classList.remove("incorrect");
        } else {
            charspan.classList.add("incorrect");
            charspan.classList.remove("correct");
            correct = false;
        }
    });

    // When finished typing
    if (correct && inputE1.value.length === currentQuote.length) {
        const endTime = new Date();
        clearInterval(timerInterval);
        timerInterval = null;
        const timeTaken = (endTime - startTime) / 1000; // seconds
        const words = currentQuote.split(" ").length;
        const speed = Math.round((words / timeTaken) * 60);
        const accuracy = calculateAccuracy(inputE1.value, currentQuote);

        resultE1.textContent = `✅ Done! 
        Speed: ${speed} WPM | Accuracy: ${accuracy}% | Time: ${timeTaken}s`;
    }
});

// Reset button
resetBtn.addEventListener("click", loadNewQuote);

// Load first quote
loadNewQuote();
