
//DOM ELEMENT
const elemMessageBox = document.getElementById(`message-box`);
const elemParagraphs = elemMessageBox.getElementsByTagName(`p`);
const elemStageInfo = document.getElementById(`stage-info`);
const stageInfoText = elemStageInfo.getElementsByTagName(`h1`);
const elemNextButton = document.getElementById(`next-stage`);


const elemPlayerInfo = document.getElementById(`player-info`);
const elemEnemyInfo = document.getElementById(`enemy-info`);
const elemBattleOption = document.getElementById(`battle-option`);
const elemEnemySprite = document.getElementById(`monster-sprite`);


const playerName = elemPlayerInfo.getElementsByClassName(`name`);
const playerHpText = elemPlayerInfo.getElementsByClassName(`hp-text`);
const playerHpBar = elemPlayerInfo.getElementsByClassName(`bar`);

const enemyName = elemEnemyInfo.getElementsByClassName(`name`);
const enemyHpText = elemEnemyInfo.getElementsByClassName(`hp-text`);
const enemyHpBar = elemEnemyInfo.getElementsByClassName(`bar`);
const enemySpritesBody = elemEnemySprite.getElementsByClassName(`monster-body`);
const enemyBaloon = document.getElementById(`monster-baloon`)
//DOM ELEMENT


//Initial database
let currentStage = 0;

let playerBaseHp = 20;
let playerDefaultName = `Player`;
let playerValue = null;

let enemyBaseHp = 3;
let enemyDefaultName = `Enemy`;
let enemyValue = null;
let enemyMessages = [`?`,`Rock`,`Paper`,`Scissors`];

let objectPlayer = {};
let objectEnemy = {};

let greenColor = `#4caf50`;
let yellowColor = `yellow`;
let redColor = `red`;
let blueColor = `blue`;

let idleMessage;
//Initial database

function initializePlayer(player) {

    player.name = playerDefaultName;
    player.maxHp = playerBaseHp;
    player.currHp = player.maxHp;
    playerName[0].innerHTML = player.name;
}

function initializeEnemy(enemy) {

    enemy.name = enemyDefaultName;
    enemy.maxHp = enemyBaseHp;
    enemy.currHp = enemy.maxHp;
    enemySpritesBody[0].style.visibility = `visible`;
    enemyName[0].innerHTML = enemy.name;
    enemySpritesBody[0].style.filter = `none`;
}

function updateHpInfo() {
    playerHpText[0].innerHTML = `HP: ${objectPlayer.currHp}/${objectPlayer.maxHp}`;
    playerHpBar[0].style.width = `${(objectPlayer.currHp / objectPlayer.maxHp) * 100}%`;
    if ((objectPlayer.currHp / objectPlayer.maxHp * 100) > 50) {
        playerHpBar[0].style.backgroundColor = greenColor;
    }
    else if ((objectPlayer.currHp / objectPlayer.maxHp * 100) > 20) {
        playerHpBar[0].style.backgroundColor = yellowColor;
    }
    else {
        playerHpBar[0].style.backgroundColor = redColor;
    }


    enemyHpText[0].innerHTML = `HP: ${objectEnemy.currHp}/${objectEnemy.maxHp}`;
    enemyHpBar[0].style.width = `${(objectEnemy.currHp / objectEnemy.maxHp) * 100}%`;

    if ((objectEnemy.currHp / objectEnemy.maxHp * 100) > 50) {
        enemyHpBar[0].style.backgroundColor = greenColor;
    }
    else if ((objectEnemy.currHp / objectEnemy.maxHp * 100) > 20) {
        enemyHpBar[0].style.backgroundColor = yellowColor;
    }
    else {
        enemyHpBar[0].style.backgroundColor = redColor;
    }

}
function translateToText(value){
    let text = ``;
    if(value === 1){
        text=`Rock`;
    }
    else if(value === 2){
        text=`Paper`;
    }
    else if(value === 3){
        text= `Scissors`;
    }

    return text;
}
function damage(result,playerValue,enemyValue) {
    let playerChoice = translateToText(playerValue);
    let enemyChoice = translateToText(enemyValue);

    let combatMessage = `You pick ${playerChoice}\n Enemy pick ${enemyChoice} \n\n`;
    let winMessage = `You win! deal 1 damage to enemy`;
    let loseMessage = `You lose! take 1 damage`;
    let drawMessage = `It's a draw!`;
    if (result === 1) {
        objectEnemy.currHp -= 1
        if (objectEnemy.currHp < 0) { objectEnemy.currHp = 0 };
        updateMessageBox(combatMessage + winMessage);
    }
    else if (result === 2) {
        objectPlayer.currHp -= 1
        if (objectPlayer.currHp < 0) { objectPlayer.currHp = 0 };
        updateMessageBox(combatMessage + loseMessage);
    }
    else {
        updateMessageBox(combatMessage + drawMessage)
    }
    updateHpInfo();
}

function checkEnemyHpBoost(){
    if(currentStage % 3 === 0){
        enemyBaseHp++;
    }
}
function updateMessageBox(message) {
    elemParagraphs[0].innerText = message;

}
function updateEnemyMessage(message){
    enemyBaloon.innerHTML = message;
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
function enemyDeadEffect(){
    enemySpritesBody[0].style.filter = `grayscale(100%)`;
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

function gameFlow(e){
    playerValue = parseInt(e.currentTarget.value);
    enemyValue = enemyRandomChoices(3);
    let result = checkResult();
    damage(result,playerValue,enemyValue);
    checkEndRound();

}
function checkEndRound(){
    if (objectEnemy.currHp === 0) {
        hideBattleOptions();
        enemyDeadEffect();
        showNextStageButton();
        updateMessageBox(`YOU WIN!`);
    }
    else if (objectPlayer.currHp === 0) {
        hideBattleOptions();
        updateMessageBox(`YOU LOSE!
        Final Score: ${currentStage}`);
    }
}
function showNextStageButton() {
        elemNextButton.style.visibility = `visible`;
        elemNextButton.style.display = `inline`;
        elemNextButton.disabled = false;
    
}

function hideNextStageButton(){
    elemNextButton.style.display = `none`;
    elemNextButton.disabled = true;
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
function showBattleOptions(){
    elemBattleOption.style.visibility = `visible`;
    elemBattleOption.style.display = `flex`;
}
function initializeStage() {
    //Initialize Round
    updateStage();
    checkEnemyHpBoost();
    initializeEnemy(objectEnemy);
    updateHpInfo();
    hideNextStageButton();
    showBattleOptions();
    updateEnemyMessage(enemyMessages[0]);
    updateMessageBox(`Choose your option`);
    //Initialize Round
}


//===============================GAME START HERE==============================
//Add listener to all buttons
elemNextButton.addEventListener('click' ,initializeStage);
addBattleOptionButtonsListener();
//Add listener to all buttons

//Initialize Player data
initializePlayer(objectPlayer);
//Initialize Player data

//Start round!
initializeStage();
//Start round!
//===============================GAME END HERE==============================





