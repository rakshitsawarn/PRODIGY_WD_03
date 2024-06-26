let btnRef = document.querySelectorAll(".button-option");
let restartBtn = document.getElementById("restart");
let startGameBtn = document.getElementById("start-game");
let backArrowBtn = document.getElementById("back-arrow");
let nameInputDiv = document.getElementById("name-input");
let gameContainerDiv = document.querySelector(".game-container");
let containerDiv = document.querySelector(".container");
let resultDiv = document.getElementById("result");
let modeSelect = document.getElementById("mode-select");

let player1Name = "";
let player2Name = "";
let gameStarted = false;
let isAI = false;


let winningPattern = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8],
    [2, 4, 6],
];


let xTurn = true;
let count = 0;

const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
};

const winFunction = (letter, pattern) => {
    pattern.forEach(index => {
        btnRef[index].classList.add('win');
    });

    let lineClass;
    switch (pattern.toString()) {
        case "0,1,2":
        case "3,4,5":
        case "6,7,8":
            lineClass = "line-horizontal";
            break;
        case "0,3,6":
        case "1,4,7":
        case "2,5,8":
            lineClass = "line-vertical";
            break;
        case "0,4,8":
            lineClass = "line-diagonal-left";
            break;
        case "2,4,6":
            lineClass = "line-diagonal-right";
            break;
    }

    pattern.forEach(index => {
        btnRef[index].classList.add(lineClass);
    });

    disableButtons();

    let winner = letter === "X" ? player1Name : player2Name;
    resultDiv.innerText = `Congrats from team DE-FAKE to ${winner} for Winning!!`;
    resultDiv.style.display = "block";
};

const winChecker = () => {
    for (let pattern of winningPattern) {
        let [element1, element2, element3] = [
            btnRef[pattern[0]].innerText,
            btnRef[pattern[1]].innerText,
            btnRef[pattern[2]].innerText,
        ];
        if (element1 != "" && element2 != "" && element3 != "") {
            if (element1 == element2 && element2 == element3) {
                winFunction(element1, pattern);
            }
        }
    }
};


btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (gameStarted && !element.innerText) {
            if (xTurn) {
                element.innerText = "X";
            } else {
                element.innerText = "O";
            }
            element.disabled = true;
            element.classList.add('animate');
            xTurn = !xTurn;
            count += 1;
            if (count === 9) {
                resultDiv.innerText = "It's a draw!";
                resultDiv.style.display = "block";
            }
            winChecker();
        }
    });
});


restartBtn.addEventListener("click", () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
        element.classList.remove('win', 'line-horizontal', 'line-vertical', 'line-diagonal-left', 'line-diagonal-right', 'animate');
    });
    resultDiv.style.display = "none";
    xTurn = true;
    count = 0;
    gameStarted = false;
    nameInputDiv.style.display = "flex";
    gameContainerDiv.style.display = "none";
});


startGameBtn.addEventListener("click", () => {
    player1Name = document.getElementById("player1").value;
    if (modeSelect.value === "player2") {
        player2Name = document.getElementById("player2").value;
        if (player1Name && player2Name) {
            nameInputDiv.style.display = "none";
            gameContainerDiv.style.display = "flex";
            gameStarted = true;
        } else {
            alert("Please enter names for both players.");
        }
    } else if (modeSelect.value === "ai") {
        player2Name = "AI";
        if (player1Name) {
            nameInputDiv.style.display = "none";
            gameContainerDiv.style.display = "flex";
            gameStarted = true;
            
            startAIGame();
        } else {
            alert("Please enter your name.");
        }
    }
});


backArrowBtn.addEventListener("click", () => {
    gameContainerDiv.style.display = "none";
    nameInputDiv.style.display = "flex";
});

function startAIGame() {
   
    btnRef.forEach((element) => {
        element.addEventListener("click", () => {
            if (gameStarted && !xTurn) {
                
                let emptyButtons = [...btnRef].filter(btn => btn.innerText === "");
                let randomIndex = Math.floor(Math.random() * emptyButtons.length);
                emptyButtons[randomIndex].innerText = "O";
                emptyButtons[randomIndex].disabled = true;
                emptyButtons[randomIndex].classList.add('animate');
                xTurn = !xTurn;
                count += 1;
                if (count === 9) {
                    resultDiv.innerText = "It's a draw!";
                    resultDiv.style.display = "block";
                }
                winChecker();
            }
        });
    });
}
