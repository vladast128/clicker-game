let score = 0;

let clickPower = 1;
let upgradeCost = 10;

let autoClickerCost = 40;
let autoClickerPower = 0;

// Загрузка сохранения
loadGame();

// Элементы
const scoreElement = document.getElementById("score");

const clickButton =
    document.getElementById("clickButton");

const upgradeButton =
    document.getElementById("upgradeButton");

const upgradeCostElement =
    document.getElementById("upgradeCost");

const autoClickerButton =
    document.getElementById("autoClickerButton");

const autoClickerCostElement =
    document.getElementById("autoClickerCost");

const autoClickerPowerElement =
    document.getElementById("autoClickerPower");

const resetButton =
    document.getElementById("resetButton");

// Звуки (если используешь)
const clickSound =
    document.getElementById("clickSound");

const upgradeSound =
    document.getElementById("upgradeSound");

// Пул звуков клика
const clickSounds = [];

for (let i = 0; i < 10; i++) {
    clickSounds.push(
        new Audio("sounds/click.mp3")
    );
}

function playClickSound() {

    for (const sound of clickSounds) {

        if (sound.paused) {

            sound.currentTime = 0;
            sound.play();

            return;
        }
    }

}

updateUI();

// Кнопка клика
clickButton.addEventListener("click", () => {

    playClickSound();

    score += clickPower;

    updateUI();
    saveGame();

});

// Улучшение клика
upgradeButton.addEventListener("click", () => {

    if (score >= upgradeCost) {

        if (upgradeSound) {
            upgradeSound.currentTime = 0;
            upgradeSound.play();
        }

        score -= upgradeCost;

        clickPower++;

        upgradeCost *= 1.5;

        updateUI();
        saveGame();

    }

});

// Автокликер
autoClickerButton.addEventListener("click", () => {

    if (score >= autoClickerCost) {

        if (upgradeSound) {
            upgradeSound.currentTime = 0;
            upgradeSound.play();
        }

        score -= autoClickerCost;

        if (autoClickerPower === 0) {
            autoClickerPower = 1;
        } else {
            autoClickerPower *= 2;
        }

        autoClickerCost *= 3;

        updateUI();
        saveGame();

    }

});

// Автоматическая добыча
setInterval(() => {

    score += autoClickerPower;

    updateUI();
    saveGame();

}, 1000);

// Сброс прогресса
resetButton.addEventListener("click", () => {

    const answer = confirm(
        "Вы уверены, что хотите сбросить прогресс?"
    );

    if (answer) {

        score = 0;

        clickPower = 1;
        upgradeCost = 10;

        autoClickerCost = 40;
        autoClickerPower = 0;

        localStorage.removeItem(
            "clickerSave"
        );

        updateUI();

    }

});

// Обновление интерфейса
function updateUI() {

    scoreElement.textContent = score;

    upgradeCostElement.textContent =
        upgradeCost;

    autoClickerCostElement.textContent =
        autoClickerCost;

    autoClickerPowerElement.textContent =
        autoClickerPower;

}

// Сохранение
function saveGame() {

    const data = {

        score,

        clickPower,
        upgradeCost,

        autoClickerCost,
        autoClickerPower

    };

    localStorage.setItem(
        "clickerSave",
        JSON.stringify(data)
    );

}

// Загрузка
function loadGame() {

    const save =
        localStorage.getItem("clickerSave");

    if (!save) return;

    const data =
        JSON.parse(save);

    score =
        data.score || 0;

    clickPower =
        data.clickPower || 1;

    upgradeCost =
        data.upgradeCost || 10;

    autoClickerCost =
        data.autoClickerCost || 40;

    autoClickerPower =
        data.autoClickerPower || 0;

}
