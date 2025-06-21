let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".resetBtn");
let subTitle = document.querySelector("#subtitle")
let turnO = true;
let count = 0; //for draw condition
let winningBoxes =[];
let winPattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];
//function for reset
const resetGame = ()=>{
    turnO = true
    document.getElementById('win').style.display = 'none';
    document.getElementById("congrats").innerHTML = "";
    enabled()
    count = 0;
    subTitle.innerHTML = "Let's Start with O";
    
}

boxes.forEach((val) => { 
    // add eventlistner as a callback function of forEach method
    //eventlistner takes the values from html after clicking the each box from the class boxes
    val.addEventListener("click", function(){
        // console.log("clicked");
        // val.innerText = "A"


        // if(turnO){
        //      val.innerText = "O";
        //      turnO = false;
        // }
        // else{
        //      val.innerText = "X";
        //      turnO = true;
        // }

        //instead of this we can use ternary operator
        val.innerText = turnO ? "O" : "X";
        val.style.color = turnO ? "blueviolet":"rgb(47, 2, 88)";
        subTitle.innerHTML = turnO ? "Now! it's X's turn" : "Now! it's O's turn"
        turnO = !turnO;
        val.disabled = true;
        count++
        //check who is winner
        let isWinner = checkWinner();

        //if draw
        if(count === 9 && !isWinner){
            gameDraw();
        }

    })
})
    //function for disable the boxes after wining
    const disabled = function(){
        for( let box of boxes){
            box.disabled = true;
        }
    }

    //function for disabled the boxes after restart
    const enabled = function(){
        for( let box of boxes){
            box.disabled = false;
            box.innerText = "";
            box.style.backgroundColor = "";
        }
        winningBoxes =[];
    }

    //function for cheacking each pattern from winPattern array
    const checkWinner = function(){
        for(let pattern of winPattern){
            
            let posVal1 = boxes[pattern[0]].innerText;
            let posVal2 = boxes[pattern[1]].innerText;
            let posVal3 = boxes[pattern[2]].innerText;

            if(posVal1 != "" && posVal2 != "" && posVal3!= ""){
                if(posVal1===posVal2 && posVal2 === posVal3){
                    // console.log("winner")
                   winningBoxes = pattern;
                   showWinner(posVal1);
                   
                   return true;
                   
                }
            }
        }
    };

    //gamedraw
    const gameDraw = ()=>{
        document.getElementById('win').style.display = 'none';
        document.getElementById("congrats").innerHTML = "The game was Draw!";
        disabled();
        subTitle.innerHTML = "Draw! &#128530;"
    }
    //winner
    const showWinner =(val)=>{
        document.getElementById('win').style.display = 'block';
        document.getElementById("congrats").innerHTML = `Congratulations! ${val} is winner!`;
        disabled();
        subTitle.innerHTML = `${val} Win! &#128515;`
        winningBoxes.forEach((index) => {
        boxes[index].style.backgroundColor = "rgb(18, 218, 78)"; // light green
    });
    } 

   
    //resetbtn
    resetBtn.addEventListener("click", resetGame)