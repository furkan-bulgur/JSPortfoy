class InputManager{
    constructor(){
        this.listeners = [];
        this.isActive = true;
    }

    addListener(listener){
        this.listeners.push(listener);
    }

    removeListener(listener){
        this.listeners = this.listeners.filter(l => l != listener);
    }

    keypress(event){
        if(!this.isActive){
            return;
        }

        this.listeners.forEach(listener => listener.keypress(event.keyCode));
    }
}
let inputManager = new InputManager();
window.addEventListener("keydown", (e) => inputManager.keypress(e));