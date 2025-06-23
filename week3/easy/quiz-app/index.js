import { quizData } from "./data.js";

const question = document.querySelector(".question");
const optionAText = document.getElementById("optionAText");
const optionBText = document.getElementById("optionBText");
const optionCText = document.getElementById("optionCText");
const optionDText = document.getElementById("optionDText");

const options = document.querySelectorAll("input[name='options']");

const submitBtn = document.querySelector("#submitBtn");
const resetBtn = document.querySelector("#resetBtn");

let result = document.querySelector(".result");
let currentIndex = 0;
let answer = [];

window.addEventListener("DOMContentLoaded", () => {
  displayQuestion();
  displayButtons(); 
});

options.forEach(option => {
  option.addEventListener('change', displayButtons);
});

function displayQuestion() {
  const current = quizData[currentIndex];
  question.textContent = current.question;

  optionAText.textContent = current.a;
  optionBText.textContent = current.b;
  optionCText.textContent = current.c;
  optionDText.textContent = current.d;

  options.forEach((input) => (input.checked = false));
  result.textContent = "";
}

function submit() {
  let selectedValue = null;
  options.forEach((input) => {
    if (input.checked) selectedValue = input.value;
  });

  answer[currentIndex] = selectedValue;
  currentIndex++;

  let score = 0;
  answer.forEach((ans, idx) => {
    if (ans === quizData[idx].correct) score++;
  });

  if (currentIndex === quizData.length) {
    result.textContent = `You've won ${score} out of ${quizData.length} questions! 🎉`;
     displayButtons();
  } else {
    displayQuestion();
    displayButtons();
  }
}

function reset() {
  currentIndex = 0;
  answer = [];
  displayQuestion();
  displayButtons();
}

function displayButtons() {
  const anySelected = Array.from(options).some((input) => input.checked);

  if (currentIndex === quizData.length) {
    submitBtn.style.display = "none";
    resetBtn.style.display = "block";
  } else if (anySelected) {
    submitBtn.style.display = "block";
    resetBtn.style.display = "none";
  } else {
    submitBtn.style.display = "none";
    resetBtn.style.display = "none";
  }
}

submitBtn.addEventListener("click", submit);
resetBtn.addEventListener("click", reset);
