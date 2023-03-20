const level1 = 
[
    ["#","#","#","#","#","#","#","#","#","#"],
    ["#","p"," "," "," "," "," "," "," ","#"],
    ["#"," ","#","#","#"," ","#","#"," ","#"],
    ["#"," ","#","#","#"," "," "," "," ","#"],
    ["#"," "," "," "," "," ","#","#"," ","#"],
    ["#"," ","#","#","#"," ","#","#"," ","#"],
    ["#"," ","#","#","#"," ","#","#"," ","#"],
    ["#"," ","#","#","#"," "," "," "," ","#"],
    ["#"," ","#","#","#"," ","#","#"," ","#"],
    ["#"," "," "," "," "," "," "," ","o","#"],
    ["#","#","#","#","#","#","#","#","#","#"],
];

const levelSize1 = {
    width: level1[0].length,
    height: level1.length
}

const levelModel1 = {
    level: level1,
    levelSize: levelSize1,
    score: 300,
    levelScoreProperties: {
        moveScore: -1,
        eatScore: 10
    }
}

const level2 = 
[
    ["#","#","#","#","#","#","#","#","#","#","#","#"],
    ["#","p"," "," "," "," "," "," "," "," "," ","#"],
    ["#"," ","#","#","#"," ","#","#"," ","#"," ","#"],
    ["#"," ","#","#","#"," "," "," "," ","#"," ","#"],
    ["#"," "," "," "," "," ","#","#"," "," "," ","#"],
    ["#","#","#"," ","#"," ","#","#"," ","#","#","#"],
    ["#"," "," "," ","#"," ","#","#"," "," "," ","#"],
    ["#"," ","#","#","#"," "," "," "," ","#"," ","#"],
    ["#"," ","#","#","#"," ","#","#"," ","#"," ","#"],
    ["#"," "," "," "," "," "," "," "," "," "," ","#"],
    ["#"," ","#"," ","#","#","#"," ","#","#"," ","#"],
    ["#"," ","#"," ","#"," "," ","o","#","#"," ","#"],
    ["#"," ","#"," ","#"," ","#","#","#","#"," ","#"],
    ["#"," "," "," "," "," "," "," "," "," "," ","#"],
    ["#","#","#","#","#","#","#","#","#","#","#","#"],
];

const levelSize2 = {
    width: level2[0].length,
    height: level2.length
}

const levelModel2 = {
    level: level2,
    levelSize: levelSize2,
    score: 300,
    levelScoreProperties: {
        moveScore: -1,
        eatScore: 10
    }
}

const level3 = 
[
    ['#','#','#','#','#','#','#','#','#','#','#','#','#','#','#'],
    ['#','p',' ',' ',' ',' ',' ','#',' ','#',' ',' ',' ',' ','#'],
    ['#','#','#',' ','#','#',' ','#',' ','#',' ','#','#',' ','#'],
    ['#',' ',' ',' ',' ',' ',' ','#',' ','#',' ',' ','#','#','#'],
    ['#',' ','#',' ','#','#',' ',' ',' ',' ',' ',' ',' ',' ','#'],
    ['#',' ','#',' ',' ','#',' ','#','#','#',' ','#','#',' ','#'],
    ['#','#','#',' ','#','#',' ',' ',' ','#',' ',' ','#',' ','#'],
    ['#',' ',' ',' ',' ','#','#',' ','#','#','#',' ',' ',' ','#'],
    ['#',' ','#','#',' ',' ',' ',' ','#',' ','#',' ','#','#','#'],
    ['#',' ',' ',' ',' ','#',' ','#','#',' ',' ',' ',' ',' ','#'],
    ['#',' ','#','#',' ','#',' ','#',' ',' ',' ','#','#',' ','#'],
    ['#',' ',' ','#',' ','#',' ','#',' ','#',' ',' ','#',' ','#'],
    ['#',' ','#','#','#','#',' ','#',' ','#','#',' ',' ',' ','#'],
    ['#',' ',' ',' ',' ',' ',' ',' ',' ',' ','#',' ','#',' ','#'],
    ['#','#','#','#','#','#','#','#','#','#','#','#','#','#','#'],
];

const levelSize3 = {
    width: level3[0].length,
    height: level3.length
}

const levelModel3 = {
    level: level3,
    levelSize: levelSize3,
    score: 300,
    levelScoreProperties: {
        moveScore: -1,
        eatScore: 10
    }
}

const level4 = 
[
    ['#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#',],
    ['#','p',' ',' ',' ','#',' ',' ','#',' ',' ',' ','#',' ',' ',' ',' ',' ',' ','#',],
    ['#','#','#','#',' ','#','#',' ','#',' ','#',' ','#','#','#','#',' ','#',' ','#',],
    ['#',' ','#',' ',' ',' ',' ',' ','#',' ','#',' ','#',' ',' ',' ',' ','#',' ','#',],
    ['#',' ',' ',' ','#','#','#',' ',' ',' ',' ',' ',' ',' ','#','#',' ','#',' ','#',],
    ['#',' ','#',' ',' ',' ','#','#',' ','#','#','#','#','#','#',' ',' ','#',' ','#',],
    ['#',' ','#',' ','#',' ',' ','#',' ',' ',' ',' ',' ',' ','#','#','#','#',' ','#',],
    ['#',' ',' ',' ','#','#',' ','#',' ','#',' ',' ','#',' ',' ',' ',' ',' ',' ','#',],
    ['#','#','#',' ',' ','#',' ',' ',' ','#','#',' ',' ','#',' ','#',' ','#','#','#',],
    ['#',' ','#','#',' ','#',' ','#',' ',' ',' ','#',' ','#',' ','#',' ',' ',' ','#',],
    ['#',' ','#',' ',' ','#',' ','#','#','#',' ',' ',' ','#',' ','#',' ','#',' ','#',],
    ['#',' ','#','#',' ','#',' ',' ',' ',' ','#',' ','#','#',' ','#',' ',' ','#','#',],
    ['#',' ',' ',' ',' ','#',' ','#','#',' ','#',' ','#',' ',' ','#',' ','#',' ','#',],
    ['#',' ','#','#','#','#',' ','#','#',' ',' ',' ',' ',' ','#','#',' ','#',' ','#',],
    ['#',' ','#',' ',' ',' ',' ',' ',' ',' ',' ','#','#',' ',' ',' ',' ',' ',' ','#',],
    ['#',' ','#',' ','#',' ','#',' ','#','#',' ','#',' ',' ',' ','#','#','#','#','#',],
    ['#',' ',' ',' ','#',' ','#',' ',' ','#',' ',' ',' ','#',' ',' ',' ',' ',' ','#',],
    ['#',' ','#','#','#',' ','#','#','#','#',' ','#',' ',' ',' ','#',' ','#','#','#',],
    ['#',' ',' ',' ',' ',' ','#',' ',' ',' ',' ','#',' ','#',' ','#',' ',' ',' ','#',],
    ['#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#',],
]

const levelSize4 = {
    width: level4[0].length,
    height: level4.length
}

const levelModel4 = {
    level: level4,
    levelSize: levelSize4,
    score: 300,
    levelScoreProperties: {
        moveScore: -1,
        eatScore: 10
    }
}

const level5 = 
[
    ['#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#',],
    ['#','p',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#',' ',' ','#','#',' ',' ',' ',' ',' ','#',' ',' ',' ','#',' ','#',],
    ['#','#','#',' ','#','#','#','#','#','#','#','#',' ','#',' ','#','#',' ',' ','#',' ','#',' ','#','#','#',' ','#',' ','#',],
    ['#',' ','#',' ','#',' ','#',' ',' ',' ',' ','#',' ','#',' ',' ',' ','#','#',' ',' ','#',' ',' ',' ','#',' ','#',' ','#',],
    ['#',' ','#',' ','#',' ','#',' ','#','#',' ','#',' ','#',' ','#',' ',' ',' ',' ','#','#','#',' ',' ','#',' ','#',' ','#',],
    ['#',' ',' ',' ',' ',' ','#',' ','#',' ',' ',' ',' ',' ',' ','#','#','#',' ','#',' ',' ',' ',' ','#','#',' ',' ',' ','#',],
    ['#',' ','#','#','#',' ','#',' ',' ',' ',' ','#',' ','#',' ','#',' ','#',' ','#','#','#','#',' ','#',' ',' ','#','#','#',],
    ['#',' ',' ',' ',' ',' ','#','#',' ','#',' ','#',' ','#',' ',' ',' ','#',' ','#',' ',' ','#',' ','#','#',' ',' ',' ','#',],
    ['#','#','#','#','#',' ',' ',' ',' ','#',' ','#',' ','#',' ','#',' ',' ',' ',' ',' ','#','#',' ',' ',' ',' ','#',' ','#',],
    ['#',' ',' ',' ','#','#','#','#',' ','#','#','#',' ','#','#','#',' ','#','#','#',' ',' ','#',' ','#',' ','#','#',' ','#',],
    ['#',' ','#',' ',' ',' ',' ',' ',' ','#','#',' ',' ','#',' ',' ',' ',' ',' ',' ',' ','#','#',' ','#',' ',' ',' ',' ','#',],
    ['#',' ','#','#','#',' ','#',' ',' ',' ','#','#',' ',' ','#',' ','#',' ','#',' ','#',' ',' ',' ','#',' ','#',' ','#','#',],
    ['#',' ','#',' ','#',' ','#','#',' ','#',' ','#','#',' ',' ','#',' ',' ',' ','#',' ',' ','#',' ','#',' ','#',' ',' ','#',],
    ['#',' ',' ',' ','#',' ',' ',' ',' ',' ',' ',' ',' ','#',' ','#',' ','#',' ',' ',' ','#','#',' ','#',' ','#',' ','#','#',],
    ['#','#','#',' ','#',' ','#',' ','#','#','#',' ','#','#',' ','#',' ',' ','#','#','#',' ','#',' ','#',' ',' ',' ',' ','#',],
    ['#',' ',' ',' ',' ',' ','#',' ','#',' ',' ',' ','#',' ',' ',' ',' ',' ','#',' ','#',' ',' ',' ','#','#',' ','#',' ','#',],
    ['#',' ','#','#',' ','#',' ',' ','#','#',' ','#','#','#',' ','#','#',' ','#',' ','#',' ','#',' ',' ','#','#','#',' ','#',],
    ['#',' ',' ','#',' ',' ','#',' ','#',' ',' ',' ','#','#',' ','#',' ',' ',' ',' ','#',' ',' ',' ','#','#',' ',' ',' ','#',],
    ['#',' ',' ',' ',' ',' ','#',' ','#',' ','#',' ','#',' ',' ',' ','#',' ','#','#','#',' ','#',' ',' ',' ',' ','#',' ','#',],
    ['#',' ','#','#','#',' ',' ',' ',' ',' ',' ',' ','#',' ','#',' ','#',' ',' ',' ',' ',' ','#','#','#',' ','#','#',' ','#',],
    ['#',' ','#',' ',' ','#','#','#','#','#',' ','#','#',' ','#',' ','#','#',' ','#',' ','#','#',' ',' ',' ','#','#',' ','#',],
    ['#',' ','#',' ','#','#',' ','#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#',' ','#',' ','#','#','#','#','#',' ','#',],
    ['#',' ','#',' ',' ',' ',' ','#',' ','#',' ',' ','#','#','#','#',' ','#','#',' ',' ','#',' ','#',' ',' ',' ','#',' ','#',],
    ['#',' ',' ',' ','#',' ',' ',' ',' ','#','#',' ',' ','#',' ','#',' ','#',' ','#',' ','#',' ','#',' ','#',' ',' ',' ','#',],
    ['#','#','#','#','#','#',' ','#',' ','#',' ',' ',' ',' ',' ','#',' ','#',' ',' ',' ','#',' ','#','#','#',' ','#',' ','#',],
    ['#',' ',' ',' ',' ','#',' ','#',' ','#',' ','#','#',' ','#','#',' ','#',' ','#','#',' ',' ',' ',' ',' ',' ','#',' ','#',],
    ['#',' ','#','#',' ','#',' ','#',' ','#',' ',' ','#',' ',' ','#',' ',' ',' ',' ',' ',' ','#',' ','#',' ','#','#',' ','#',],
    ['#',' ','#',' ',' ',' ',' ','#',' ','#','#',' ','#','#','#','#',' ','#',' ','#',' ','#','#','#','#','#','#',' ',' ','#',],
    ['#',' ',' ',' ','#',' ','#','#',' ',' ','#',' ',' ',' ',' ',' ',' ','#',' ','#',' ',' ',' ',' ',' ',' ',' ',' ','#','#',],
    ['#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#',],
]

const levelSize5 = {
    width: level5[0].length,
    height: level5.length
}

const levelModel5 = {
    level: level5,
    levelSize: levelSize5,
    score: 300,
    levelScoreProperties: {
        moveScore: -1,
        eatScore: 10
    }
}


const levelModels = [levelModel1, levelModel2, levelModel3, levelModel4, levelModel5]