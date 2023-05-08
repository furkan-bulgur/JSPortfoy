const Directions = {
    Up: "Up",
    Left: "Left",
    Down: "Down",
    Right: "Right"
}

const GameTypes = {
    None: "None",
    UserSimpleGhostOneFood: "UserSimpleGhostOneFood",
    MinimaxSimpleGhostOneFood: "MinimaxSimpleGhostOneFood"
}

const PacmanAITypes = {
    User: "User",
    Minimax: "Minimax"
}

const GhostAITypes = {
    None: "None",
    Vertical: "Vertical",
    Horizontal: "Horizontal"
}

const CellTypes = {
    None: 0,
    Empty: 1,
    Wall: 2
}

const ScoreChangeReason = {
    Tick: "tick",
    Eat: "eat"
}

const gameLoopInterval = 10;
const aiUpdateInterval = 150;