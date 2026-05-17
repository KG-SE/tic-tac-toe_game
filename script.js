let player1Name = "Player 1";
let player2Name = "Player 2";

let startBtn = document.querySelector("#start-btn");
let player1Input = document.querySelector("#player1");
let player2Input = document.querySelector("#player2");

let boxes = document.querySelectorAll(".box");
let reset_btn = document.querySelector("#reset-btn");
let new_btn = document.querySelector("#new-btn");
let msg_container = document.querySelector(".msg-container");
let sms = document.querySelector("#sms");

let turnO = true; //Player X , player O
let gameStart = false;
let count = 0; //To Track Draw
let winning_pattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

startBtn.addEventListener("click", () => {
    gameStart = true;
    player1Name = player1Input.value || "Player 1";
    player2Name = player2Input.value || "Player 2";

    resetGame();

    document.querySelector(".player-inputs").style.display = "none";
});

const resetGame=()=>{
    turnO = true
    enable_boxes()
    count = 0
    msg_container.classList.add("hide")
};

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(!gameStart) return
        if(turnO) //Player O
        {
            box.innerText = "O"
            turnO = false
        }
        else //Player X
        {
            box.innerText = "X"
            turnO = true
        }
        box.disabled = true
        count ++
        let is_winner = check_Winner()
        if(count === 9 && !is_winner)
        {
            game_draw()
        }
    });
});

const game_draw=()=>{
    sms.innerText = "Game was a draw!"
    msg_container.classList.remove("hide")
    disable_boxes()
}

const disable_boxes=()=>{
    for (const box of boxes) {
        box.disabled = true
    }
};

new_btn.addEventListener("click",()=>{
    newGame()
})

const newGame=()=>{
    gameStart = false
    turnO = true
    count = 0
    enable_boxes()
    document.querySelector(".player-inputs").style.display = "block"
    player1Name = "Player 1"
    player2Name = "Player 2"
    player1Input.value = ""
    player2Input.value = ""
    msg_container.classList.add("hide")
    };

const enable_boxes=()=>{
    for (const box of boxes) {
        box.disabled = false
        box.innerText = ""
    }
};

const show_Winner = (winner) => {

    let winnerName = winner === "X" ? player1Name : player2Name;

    sms.innerText = `🎉 Congratulations, ${winnerName} wins!`;
    msg_container.classList.remove("hide");

    disable_boxes();
};

let check_Winner=()=>{
    for (let pattern of winning_pattern) {
        
        let pos1Val = boxes[pattern[0]].innerText
        let pos2Val = boxes[pattern[1]].innerText
        let pos3Val = boxes[pattern[2]].innerText

        if(pos1Val != "" && pos2Val != "" && pos3Val != "")
        {
            if(pos1Val === pos2Val && pos2Val === pos3Val)
            {
                show_Winner(pos1Val)
                return true
            }
        }
    }
    return false
};

reset_btn.addEventListener("click",(resetGame));
