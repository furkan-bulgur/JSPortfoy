const Directions = {
    Up: "Up",
    Left: "Left",
    Down: "Down",
    Right: "Right"
}

const GameTypes = {
    None: "None",
    UserOneFood: "UserOneFood",
    BFSOneFood: "BFSOneFood",
    BFSMultipleFood: "BFSMultipleFood",
    AStarOneFood: "AStarOneFood",
    UserSimpleGhostOneFood: "UserSimpleGhostOneFood"
}

const PacmanAITypes = {
    User: "User",
    BFS: "BFS",
    AStar: "AStar"
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