const colorToApply = window.prompt("Enter a color");
let id = document.querySelectorAll("button");
const color = document.querySelector(".color");
const colorPanel = document.querySelector(".color-panel");

if(colorToApply){
    createButton();
}

function createButton(){
const newBtn = document.createElement("button");
newBtn.setAttribute("class", color);
newBtn.setAttribute("id", colorToApply);
newBtn.setAttribute("onclick", `applyBackground('${colorToApply}')`);
newBtn.textContent = colorToApply;
newBtn.style.backgroundColor = colorToApply;
colorPanel.appendChild(newBtn);
}

function applyBackground(color){
document.querySelector("body").style.backgroundColor = color;
}