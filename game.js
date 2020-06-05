
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

let EnemyBaseHp = 3;
let enemyDefaultName = `Enemy`;
let enemyValue = null;

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
    enemy.maxHp = EnemyBaseHp;
    enemy.currHp = enemy.maxHp;
    enemySpritesBody[0].style.visibility = `visible`;
    enemyName[0].innerHTML = enemy.name;
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

function damage(value) {
    if (value === 1) {
        objectEnemy.currHp -= 1
        if (objectEnemy.currHp < 0) { objectEnemy.currHp = 0 };
        updateMessageBox(`You win! deal 1 damage to enemy`)
    }
    else if (value === 2) {
        objectPlayer.currHp -= 1
        if (objectPlayer.currHp < 0) { objectPlayer.currHp = 0 };
        updateMessageBox(`You lose! take 1 damage`)
    }
    else {
        updateMessageBox(`It's a tie!`)
    }
    updateHpInfo();
}


function updateMessageBox(message) {
    elemParagraphs[0].innerText = message;

}

function updateStage() {
    currentStage++
    stageInfoText[0].innerText = `Current Stage: ${currentStage}`;
}
function randomChoices(limit) {
    let choices = Math.floor(Math.random() * limit) + 1;
    if (choices === 1) {
        enemyBaloon.innerHTML = `Rock`;
    }
    else if (choices === 2) {
        enemyBaloon.innerHTML = `Paper`;
    }
    else if (choices === 3) {
        enemyBaloon.innerHTML = `Scissors`;
    }
    return choices;
}

function animateChoices(){
    for (let i = 0; i < 10; i++) {
        setTimeout(function(){enemyBaloon.innerHTML = randomChoices(3)},1000);
        
    }
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
function toggleNextStage() {

    if (elemNextButton.disabled === true) {
        elemNextButton.style.visibility = `visible`;
        elemNextButton.style.display = `inline`;
        elemNextButton.disabled = false;
    }
    else {
        elemNextButton.style.visibility = `hidden`;
        elemNextButton.style.display = `none`;
    }
}
function optionButtonListener() {
    for (let i = 0; i < elemBattleOption.children.length; i++) {
        elemBattleOption.children[i].addEventListener('click', function (e) {
            playerValue = e.currentTarget.value;
            enemyValue = randomChoices(3);
            console.log('this is player value ' + playerValue);
            console.log(`this is computer value ${enemyValue}`);

            let result = checkResult();

            console.log(`this is battle result ${result}`)
            damage(result);

            if (objectEnemy.currHp === 0) {
                elemBattleOption.style.display = `none`;
                enemySpritesBody[0].style.filter = `grayscale(100%)`;
                toggleNextStage();
                updateMessageBox(`YOU WIN!`)
            }
            else if (objectPlayer.currHp === 0) {
                elemBattleOption.style.display = `none`;
                updateMessageBox(`YOU LOSE!
                Final Score: ${currentStage}`);
            }
        });
    }
}

function hideOptionButton() {
    for (let i = 0; i < elemBattleOption.children.length; i++) {
        elemBattleOption.children[i].style.display = `none`;
    }

}

function initializeStage() {
    //Initialize Round
    updateStage();
    if(currentStage % 3 === 0){EnemyBaseHp++};
    initializeEnemy(objectEnemy);
    updateHpInfo();
    elemNextButton.style.display = `none`;
    elemNextButton.disabled = true;
    elemBattleOption.style.visibility = `visible`;
    elemBattleOption.style.display = `flex`;
    enemySpritesBody[0].style.filter = `none`;
    updateMessageBox(`Choose your option`);
    //Initialize Round
}
elemNextButton.addEventListener('click' ,initializeStage);
initializePlayer(objectPlayer);
initializeStage();
optionButtonListener();





