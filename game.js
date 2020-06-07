
//DOM ELEMENTS
const elemMessageBox = document.getElementById(`message-box`);
const elemParagraphs = elemMessageBox.getElementsByTagName(`p`);
const elemStageInfo = document.getElementById(`stage-info`);
const stageInfoText = elemStageInfo.getElementsByTagName(`h1`);
const elemNextButton = document.getElementById(`next-stage`);
const elemPlayAgainButton = document.getElementById(`play-again`);


const elemPlayerInfo = document.getElementById(`player-info`);
const elemEnemyInfo = document.getElementById(`enemy-info`);
const elemBattleOption = document.getElementById(`battle-option`);
const elemEnemySprite = document.getElementById(`monster-sprite`);


const elemPlayerNames = elemPlayerInfo.getElementsByClassName(`name`);
const elemPlayerHpTexts = elemPlayerInfo.getElementsByClassName(`hp-text`);
const elemPlayerHpBars = elemPlayerInfo.getElementsByClassName(`bar`);

const elemEnemyNames = elemEnemyInfo.getElementsByClassName(`name`);
const elemEnemyHpTexts = elemEnemyInfo.getElementsByClassName(`hp-text`);
const elemEnemyHpBars = elemEnemyInfo.getElementsByClassName(`bar`);
const elemEnemySpritesBody = elemEnemySprite.getElementsByClassName(`monster-body`);
const elemEnemyBaloon = document.getElementById(`monster-baloon`)
//DOM ELEMENTS



//SETTING HERE
const settingPlayerBaseHp = 20;
const settingEnemyBaseHp = 3;
const settingEnemyName = `Enemy`;
const settingPlayerDefaultName = `Player`;
//SETTING HERE

//Variables
let currentStage;

let playerBaseHp;
let playerDefaultName;
let playerValue;

let enemyBaseHp;
let enemyDefaultName;
let enemyValue;
let enemyMessages;

let objectPlayer;
let objectEnemy;
//Variables

//Initial database
let greenColor = `#4caf50`;
let yellowColor = `yellow`;
let redColor = `red`;
let blueColor = `blue`;
//Initial database

function initializeBaseValue() {
    currentStage = 0;

    playerBaseHp = settingPlayerBaseHp;
    playerDefaultName = settingPlayerDefaultName;
    playerValue = null;

    enemyBaseHp = settingEnemyBaseHp;
    enemyDefaultName = settingEnemyName;
    enemyValue = null;
    enemyMessages = [`?`, `Rock`, `Paper`, `Scissors`];

    objectPlayer = {};
    objectEnemy = {};
}

function initializePlayer(player) {

    player.name = playerDefaultName;
    player.maxHp = playerBaseHp;
    player.currHp = player.maxHp;
    player.elemTextName = elemPlayerNames[0];
    player.elemTextHp = elemPlayerHpTexts[0];
    player.elemBarHp = elemPlayerHpBars[0];

    player.elemTextName.innerHTML = player.name;
}

function initializeEnemy(enemy) {

    enemy.name = enemyDefaultName;
    enemy.maxHp = enemyBaseHp;
    enemy.currHp = enemy.maxHp;
    enemy.elemTextName = elemEnemyNames[0];
    enemy.elemTextHp = elemEnemyHpTexts[0];
    enemy.elemBarHp = elemEnemyHpBars[0];
    enemy.elemSprite = elemEnemySpritesBody[0];

    enemy.elemTextName.innerHTML = enemy.name;

    enemy.elemSprite.style.visibility = `visible`;
    enemy.elemSprite.style.filter = `none`;
}

//Update UI information about HP (text and bar)
function updateHpInfo(objectUnit) {
    objectUnit.elemTextHp.innerHTML = `HP: ${objectUnit.currHp}/${objectUnit.maxHp}`;
    objectUnit.elemBarHp.style.width = `${(objectUnit.currHp / objectUnit.maxHp) * 100}%`;
    updateHpBarColor(objectUnit);
}
function updateHpBarColor(objectUnit) {
    if ((objectUnit.currHp / objectUnit.maxHp * 100) > 50) {
        objectUnit.elemBarHp.style.backgroundColor = greenColor;
    }
    else if ((objectEnemy.currHp / objectEnemy.maxHp * 100) > 20) {
        objectUnit.elemBarHp.style.backgroundColor = yellowColor;
    }
    else {
        objectUnit.elemBarHp.style.backgroundColor = redColor;
    }
}
function translateChoiceToText(value) {
    let text = ``;
    if (value === 1) {
        text = `Rock`;
    }
    else if (value === 2) {
        text = `Paper`;
    }
    else if (value === 3) {
        text = `Scissors`;
    }

    return text;
}

function setCombatMessage(result, playerValue, enemyValue) {
    let playerChoice = translateChoiceToText(playerValue);
    let enemyChoice = translateChoiceToText(enemyValue);

    let combatMessage = `You pick ${playerChoice}\n Enemy pick ${enemyChoice} \n\n`;
    let winMessage = `You win! deal 1 damage to enemy`;
    let loseMessage = `You lose! take 1 damage`;
    let drawMessage = `It's a draw!`;

    if (result === 1) {
        return combatMessage + winMessage;
    }
    else if (result === 2) {
        return combatMessage + loseMessage;
    }
    else {
        return combatMessage + drawMessage;
    }
}
function damage(result, playerValue, enemyValue) {

    let target = null;

    if (result === 1) {
        target = objectEnemy;
        objectEnemy.currHp -= 1
        if (objectEnemy.currHp < 0) { objectEnemy.currHp = 0 };
    }
    else if (result === 2) {
        target = objectPlayer;
        objectPlayer.currHp -= 1
        if (objectPlayer.currHp < 0) { objectPlayer.currHp = 0 };
    }

    //Directly update message and info on UI after damage calculation
    updateMessageBox(setCombatMessage(result, playerValue, enemyValue));
    if (target !== null) {
        updateHpInfo(target);
    }
}

function checkEnemyHpBoost() {
    if (currentStage % 3 === 0) {
        enemyBaseHp++;
    }
}
function updateMessageBox(message) {
    elemParagraphs[0].innerText = message;

}
function updateEnemyMessage(message) {
    elemEnemyBaloon.innerHTML = message;
}

function updateStage() {
    currentStage++
    stageInfoText[0].innerText = `Current Stage: ${currentStage}`;
}
function enemyRandomChoices(numOfChoices) {
    let choices = Math.floor(Math.random() * numOfChoices) + 1;

    updateEnemyMessage(enemyMessages[choices]);

    return choices;
}
function enemyDeadEffect() {
    elemEnemySpritesBody[0].style.filter = `grayscale(100%)`;
}
function checkResult() {
    if (playerValue == enemyValue) {
        return 0;

    }
    else if (playerValue == 1 && enemyValue == 3) {
        return 1;
    }
    else if (playerValue == 1 && enemyValue == 2) {
        return 2;
    }

    else if (playerValue == 2 && enemyValue == 1) {
        return 1;
    }
    else if (playerValue == 2 && enemyValue == 3) {
        return 2;
    }

    else if (playerValue == 3 && enemyValue == 2) {
        return 1;
    }
    else if (playerValue == 3 && enemyValue == 1) {
        return 2;
    }
}

function gameFlow(e) {
    playerValue = parseInt(e.currentTarget.value);
    enemyValue = enemyRandomChoices(3);
    let result = checkResult();
    damage(result, playerValue, enemyValue);
    checkEndRound();

}
function checkEndRound() {
    if (objectEnemy.currHp === 0) {
        hideBattleOptions();
        enemyDeadEffect();
        showButton(elemNextButton);
        updateMessageBox(`YOU WIN!`);
    }
    else if (objectPlayer.currHp === 0) {
        hideBattleOptions();
        showButton(elemPlayAgainButton);
        updateMessageBox(`YOU LOSE!
        Final Score: ${currentStage}`);
    }
}
function showButton(element) {
    element.style.visibility = `visible`;
    element.style.display = `inline`;
    element.disabled = false;

}

function hideButton(element) {
    element.style.display = `none`;
    element.disabled = true;
}

function addBattleOptionButtonsListener() {
    for (let i = 0; i < elemBattleOption.children.length; i++) {
        elemBattleOption.children[i].addEventListener('click', function (e) {
            gameFlow(e);
        });
    }
}

function hideBattleOptions() {
    elemBattleOption.style.visibility = `hidden`;
    elemBattleOption.style.display = `none`;

}
function showBattleOptions() {
    elemBattleOption.style.visibility = `visible`;
    elemBattleOption.style.display = `flex`;
}
function initializeStage() {
    //Initialize Round
    updateStage();      //Increment stage variable and update stage text
    checkEnemyHpBoost();    //Check if enemy base HP got a boost
    initializeEnemy(objectEnemy); //Initialize the enemy with it's value (hp/sprite)
    updateHpInfo(objectPlayer); //update HP info in UI
    updateHpInfo(objectEnemy); //update HP info in UI
    hideButton(elemNextButton);  //hide next stage button (next stage only shown after you win the stage)
    hideButton(elemPlayAgainButton);
    showBattleOptions();    //Show your RPS buttons
    updateEnemyMessage(enemyMessages[0]);
    updateMessageBox(`Choose your option`);
    //Initialize Round
}
function initializeButtonsListener(){
    elemNextButton.addEventListener('click', initializeStage);
    elemPlayAgainButton.addEventListener(`click`, startGame);
    addBattleOptionButtonsListener();
}
function startGame() {
    //Set starting value for all variables
    initializeBaseValue();
    //Initialize Player data
    initializePlayer(objectPlayer);
    //Initialize Player data

    //Start round!
    initializeStage();
    //Start round!
}
//===============================GAME START HERE==============================
initializeButtonsListener();
startGame();

//===============================GAME END HERE==============================





