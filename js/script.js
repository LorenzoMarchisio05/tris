const light_dark_toggle = document.getElementById("mode-toggle");
let turno = 0;
let cnt = 0;

light_dark_toggle.addEventListener("change", handleLightDarkMode);

function handleLightDarkMode() {
    document.body.classList.toggle("dark");
    document.getElementsByClassName("ball")[0].classList.toggle("dark");
}

const cells = [...document.getElementsByClassName("cell")];
const campo = [cells.slice(0, 3), cells.slice(3, 6), cells.slice(6, 9)];

reset();

function handleCellClick({ target }) {
    if (!target.free) return;
    cnt++;
    target.innerText = turno % 2 == 0 ? "X" : "O";
    target.removeEventListener("mouseover", handleMouseOver);
    target.removeEventListener("mouseout", handleMouseOut);
    target.style.cursor = "default";
    target.free = false;

    const row = parseInt(target.dataset.row);
    const col = parseInt(target.dataset.col);
    checkWin(row, col);

    turno++;
}

function handleMouseOver({ target }) {
    target.innerText = turno % 2 == 0 ? "X" : "O";
}

function handleMouseOut({ target }) {
    target.innerText = "";
}

// GAME LOGIC

const isDiagonalePrincipale = (row, col) =>
    (row === 0 && col === 0) ||
    (row === 1 && col === 1) ||
    (row === 2 && col === 2);

const isDiagonaleSecondaria = (row, col) =>
    (row === 0 && col === 2) ||
    (row === 1 && col === 1) ||
    (row === 2 && col === 0);

function controllaVittoriaDP() {
    let i = 0;
    let j = 0;

    const isWinning = () =>
        i < 2 &&
        !campo[i][j].free &&
        campo[i + 1][j + 1].innerText == campo[i][j].innerText;

    while (isWinning()) {
        j++;
        i++;
    }
    return j === 2 ? true : false;
}

function controllaVittoriaDS() {
    let i = 0;
    let j = 2;

    const isWinning = () =>
        i < 2 &&
        !campo[i][j].free &&
        campo[i + 1][j - 1].innerText == campo[i][j].innerText;

    while (isWinning()) {
        j--;
        i++;
    }
    return j === 0 ? true : false;
}

function controllaVittoriaRiga(row) {
    let j = 0;

    const isWinning = () =>
        j < 2 &&
        !campo[row][j].free &&
        campo[row][j + 1].innerText == campo[row][j].innerText;

    while (isWinning()) {
        j++;
    }
    return j === 2 ? true : false;
}

function controllaVittoriaColonna(col) {
    let i = 0;

    const isWinning = () =>
        i < 2 &&
        !campo[i][col].free &&
        campo[i + 1][col].innerText == campo[i][col].innerText;

    while (isWinning()) {
        i++;
    }
    return i === 2 ? true : false;
}

function checkWin(row, column) {
    // se non sono state selezionate almeno 3 celle è inutile controllare
    if (cnt < 3) return;

    // controllo le diagonali
    if (isDiagonalePrincipale(row, column) && controllaVittoriaDP()) {
        handleEndGame(true);
        return;
    }

    if (isDiagonaleSecondaria(row, column) && controllaVittoriaDS()) {
        handleEndGame(true);
        return;
    }

    if (controllaVittoriaRiga(row)) {
        handleEndGame(true);
        return;
    }

    if (controllaVittoriaColonna(column)) {
        handleEndGame(true);
        return;
    }

    if (cnt == 9) {
        handleEndGame(false);
    }
}

function handleEndGame(vittoria = false) {
    const dialog = document.querySelector("dialog");

    dialog.children[1].innerText = vittoria
        ? `Il giocatore ${turno % 2 == 0 ? "X" : "O"} ha vinto`
        : `La partita termina con un pareggio`;

    dialog.open = true;

    dialog.children[2].onclick = () => {
        dialog.open = false;
        reset();
    };
}

function reset() {
    turno = 0;
    cnt = 0;
    cells.forEach((cell) => {
        cell.innerText = "";
        cell.addEventListener("click", handleCellClick);
        cell.addEventListener("mouseover", handleMouseOver);
        cell.addEventListener("mouseout", handleMouseOut);
        cell.style.cursor = "";
        cell.free = true;
    });
}
