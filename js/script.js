const light_dark_toggle = document.getElementById("mode-toggle");
let turno = 0;
let cnt = 0;

light_dark_toggle.addEventListener("change", handleLightDarkMode);

function handleLightDarkMode() {
    document.body.classList.toggle("dark");
    document.getElementsByClassName("ball")[0].classList.toggle("dark");
}

reset();

function handleCellClick({ target }) {
    if (!target.free) return;
    cnt++;
    target.innerText = turno % 2 == 0 ? "X" : "O";
    target.removeEventListener("mouseover", handleMouseOver);
    target.removeEventListener("mouseout", handleMouseOut);
    target.style.cursor = "default";
    target.free = false;

    checkWin();

    turno++;
}

function handleMouseOver({ target }) {
    target.innerText = turno % 2 == 0 ? "X" : "O";
}

function handleMouseOut({ target }) {
    target.innerText = "";
}

function checkWin() {
    if (cnt == 9) {
        alert("pareggio");
        reset();
    }
}

function reset() {
    const cells = [...document.getElementsByClassName("cell")];
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
