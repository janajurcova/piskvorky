const buttons = document.querySelectorAll('button');
let activePlayer = 'circle';
let winner;
let changeImage = document.querySelector('.game-menu__player img');
const boardSize = 10;
const symbolsToWin = 5;


for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', (event) => {
        if (buttons[i].classList.length < 1) {
            event.target.classList.add(`game__field--${activePlayer}`, 'game__field');
            event.target.disabled = true;
            if (isWinningMove(event.target)) {
                winner = activePlayer === 'circle' ? 'kolečko' : 'křížek';
                confirm(`Vyhrál ${winner}. Spustit novou hru?`)
                    ? location.reload()
                    : '';
            }
            if (activePlayer === 'circle') {
                activePlayer = 'cross';
            } else {
                activePlayer = 'circle';
            }
            changeImage.src = `img/${activePlayer}.svg`;
        }
    });
}

const isWinningMove = (field) => {
    const symbol = getSymbol(field);
    const origin = getPosition(field);

    let i;

    let inRow = 1;

    //doleva
    i = origin.column;
    while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
        inRow++;
        i--;
    }
    //doprava
    i = origin.column;
    while (
        i < boardSize - 1 &&
        symbol === getSymbol(getField(origin.row, i + 1))
    ) {
        inRow++;
        i++;
    }

    if (inRow >= symbolsToWin) {
        return true;
    }

    let inColumn = 1;

    //nahoru
    i = origin.row;
    while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
        inColumn++;
        i--;
    }
    //dolů
    i = origin.row;
    while (
        i < boardSize - 1 &&
        symbol === getSymbol(getField(i + 1, origin.column))
    ) {
        inColumn++;
        i++;
    }

    if (inColumn >= symbolsToWin) {
        return true;
    }
};


// Přichystej funkci, getSymbol(field), která pro DOM element políčka s křížkem vrátí řetězec 'cross', pro kroužek 'circle' a pro neobsazené políčko hodnotu undefined.


const getSymbol = (field) => {
    if (field.classList.contains('game__field--circle')) {
        return 'circle';
    } else if (field.classList.contains('game__field--cross')) {
        return 'cross';
    }
};

// Napiš funkci getField(row, column), která pro číslo řádku a sloupce vrátí příslušný prvek.

const getField = (row, column) => {
    return buttons[row * boardSize + column];
};

const getPosition = (field) => {
    let i = 0;
    while (i < buttons.length && field !== buttons[i]) {
        i++;
    }
    return {
        row: Math.floor(i / boardSize),
        column: i % boardSize,
    };
};




