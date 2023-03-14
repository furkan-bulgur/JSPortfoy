const levelCount = 3;
const levelButtonContainer = document.getElementById("level-button-container");


const createButton = (i) => {
    const button = document.createElement("button");
    const span = document.createElement("span");
    const text = document.createTextNode(`LEVEL ${i+1}`);
    button.appendChild(span);
    button.appendChild(text);
    button.className = "level-button";
    button.type = "button";
    button.onclick = () => location.href = `pacmanGame.html?level=${i}`
    levelButtonContainer.appendChild(button)
}

for(let i = 0; i < levelCount; i++){
    createButton(i);
}