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
    DFSOneFood: "DFSOneFood",
}

const PacmanAITypes = {
    User: "User",
    BFS: "BFS",
    DFS: "DFS"
}

const CellTypes = {
    None: 0,
    Empty: 1,
    Wall: 2
}

const ScoreChangeReason = {
    Move: "move",
    Eat: "eat"
}

const gameLoopInterval = 10;