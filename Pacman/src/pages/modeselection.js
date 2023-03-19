const modeButtonContainer = document.getElementById("mode-button-container");

const createButton = (gameModel) => {
    const button = document.createElement("button");
    const span = document.createElement("span");
    const text = document.createTextNode(`${gameModel.name}`);
    button.appendChild(span);
    button.appendChild(text);
    button.className = "mode-button";
    button.type = "button";
    button.onclick = () => location.href = `levelselection.html?mode=${gameModel.type}`
    modeButtonContainer.appendChild(button)
}

for(let i = 0; i < gameModels.length; i++){
    console.log("hey");
    createButton(gameModels[i]);
}