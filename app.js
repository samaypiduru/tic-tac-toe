/*

TO-DO LIST:
- cpu still makes random choices
- work on the ui

*/

var board;
const boardElements = [
    "box0", "box1", "box2",
    "box3", "box4", "box5",
    "box6", "box7", "box8"
];
const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

resetBoard();
//checkGameOver();

// resets board at the start of the game
function resetBoard() {
    board = ["", "", "", "", "", "", "", "", ""];
    document.getElementById("gameInfo").innerHTML = "Begin";
    document.getElementById("gameInfo").value = "user turn";
    showBoard();
    for(let i = 0; i < boardElements.length; i++) {
        document.getElementById(boardElements[i]).style.removeProperty("background-color");

    }
    //document.getElementsByClassName("space").style.backgroundColor = "";
}

// assigns each div its board value by iterating through the div names
function showBoard() {
    for(let i = 0; i < boardElements.length; i++) {
        document.getElementById(boardElements[i]).innerHTML = board[i];
    }
}

// checks if the board space is open and takes in user move, then the computer makes the move
function playerMove(spaceIndex) {
    if(board[spaceIndex] == "" && !checkGameOver() && document.getElementById("gameInfo").value != "cpu turn") {
        board[spaceIndex] = "X";
        showBoard();
        
        if(!checkGameOver()) {
            computerMove();
            setTimeout(() => {
                showBoard();
            }, 450);
            document.getElementById("gameInfo").value = "user turn";
        }
    }
    checkGameOver();
}

// makes a random move, and the player is restricted from moving during this time
function computerMove() {
    document.getElementById("gameInfo").value = "cpu turn";
    board[randomOpenSpace()] = "O";
}

// finds a random open space for the computer to make its move
function randomOpenSpace() {
    let openSpaces = [];

    for(let i = 0; i < 9; i++) {
        if(board[i] == "") {
            openSpaces.push(i);
        }
    }
    return openSpaces[Math.floor(Math.random()*openSpaces.length)];
}

/* 
    loops through a 2d array of win scenarios, win[][], and checks if any such pattern is present on the board,
    then concats the resulting X or O pattern, and ends the game if a consecutive-3 pattern is found.
    if a win or loss is detected, the winning/losing pattern will be highlighted on the board.
*/
function checkGameOver() {
    for(let i = 0; i < wins.length-1; i++) {
        if(board[wins[i][0]].concat(board[wins[i][1]]).concat(board[wins[i][2]]) == "XXX") {
            document.getElementById(boardElements[wins[i][0]]).style.backgroundColor= "#ADFF2F"; // green-yellow
            document.getElementById(boardElements[wins[i][1]]).style.backgroundColor= "#ADFF2F";
            document.getElementById(boardElements[wins[i][2]]).style.backgroundColor= "#ADFF2F";

            document.getElementById("gameInfo").innerHTML = "Victory";

            return true;     
        }
        else if(board[wins[i][0]].concat(board[wins[i][1]]).concat(board[wins[i][2]]) == "OOO") {
            document.getElementById(boardElements[wins[i][0]]).style.backgroundColor= "#FF6347"; // tomato red
            document.getElementById(boardElements[wins[i][1]]).style.backgroundColor= "#FF6347";
            document.getElementById(boardElements[wins[i][2]]).style.backgroundColor= "#FF6347";

            document.getElementById("gameInfo").innerHTML = "Defeat";

            return true;
        }
    }
    for(space in board) {
        if(board[space] == "") {
            document.getElementById("gameInfo").innerHTML = "...";
            return false;
        }
    }
    document.getElementById("gameInfo").innerHTML = "Tie";
    return true;
}