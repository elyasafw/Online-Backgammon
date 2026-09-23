export function pointToIndex(point, color) {
    return color === "white" ? point - 1 : 24 - point;
}

export function calculateDestination(from, die, color) {
    return color === "white" ? from - die : from + die;
}

export function getBarDestination(die, color) {
    return color === "white" ? 24 - die : die - 1;
}

export function distanceToExit(index, color) {
    return color === "white" ? index + 1 : 24 - index;
}

export function createInitialBoard() {
    const board = [];

    for (let i = 0; i < 24; i++) {
        board.push({ owner: null, checkers: 0 });
    }

    board[23] = { owner: "white", checkers: 2 };
    board[12] = { owner: "white", checkers: 5 };
    board[7] = { owner: "white", checkers: 3 };
    board[5] = { owner: "white", checkers: 5 };

    board[0] = { owner: "black", checkers: 2 };
    board[11] = { owner: "black", checkers: 5 };
    board[16] = { owner: "black", checkers: 3 };
    board[18] = { owner: "black", checkers: 5 };

    return board;
}

export function createInitialGameState() {
    return {
        board: createInitialBoard(),
        currentPlayer: "white",
        dice: [],
        remainingDice: [],
        bar: { white: 0, black: 0 },
        borneOff: { white: 0, black: 0 },
        status: "waiting-for-roll",
        winner: null,
    };
}

function rollDie() {
    return Math.floor(Math.random() * 6) + 1;
}

export function rollForFirstPlayer() {
    let isTie = true;
    let whiteRoll = null;
    let blackRoll = null;
    while (isTie) {
        whiteRoll = rollDie();
        blackRoll = rollDie();

        if (whiteRoll !== blackRoll) {
            isTie = false;
        }
    }
    const openPlayer = whiteRoll > blackRoll ? "white" : "black";

    return {
        whiteRoll,
        blackRoll,
        openPlayer,
    };
}

export function rollRegularTurn() {
    const firstRoll = rollDie();
    const secondRoll = rollDie();

    return {
        dice: [firstRoll, secondRoll],
        remainingDice:
            firstRoll === secondRoll
                ? [firstRoll, firstRoll, firstRoll, firstRoll]
                : [firstRoll, secondRoll],
    };
}
