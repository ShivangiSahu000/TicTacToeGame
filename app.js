// WRITTEN CODE EXPLANATION
// 2 players hote hai -> alternate baari aati hai
// player 1 -> X player -> 0
// 9 total boxes hai jinko hamne 0 to 8 numbers die hai
// winning horzontally , vertically , diagonally ho sakti hai
// winning patters are {0 1 2} {3 4 5} {6 7 8} {0 3 6} {1 4 7} {2 5 8} {0 4 8} {2 4 6} total 8 patters to win this game

//1st step jin jin elements ka kaam padne wala hai unko access kr lo
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
//newgame button ko access kr lo
let newGameBtn = document.querySelector("#new-btn");
//msgContainer ko access kr rhe hai
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// apne game mei alternate turns aa rhi hai (X,O,X,O) toh apne game ko pata hona chahiye ki next turn kiski hai
let turnO = true; //if playerX print X if playerO print O
// if this turnO is true that means print O otherwise print X
let count = 0; //agar draw ho jata hai game tab

//now we will store winning patterns in a 2D array
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];


const checkWinner = () => {
  //winpatterns par traverse kra
  for (let pattern of winPatterns) {
    //pattern woh 1 array ko denote kr rha hai
    //pattern[0] current pattern array ki 1st position ko denote kr rha
    //boxes[pattern[0]] print karega html element poora
    //boxes[pattern[0]].innerText print karega X hai ya O hai ya empty hai
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;
    //agar teeno position mei se ek bhi khaali hai matlab woh winner nhi hai toh dont go inside and check further
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
    //agar pos1Val pos2Val pos3Val teeno aapas mei equal hai tab winner mil gya
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
        //pos1Val hi apna winner hai
      }
    }
  }
};


// har ek box par event listener lagana hai
//boxes ek object hai usme buttons hai 8 har ek button par click krne pr kuch hona chahiye toh usme traverse karna rahega toh forEach loop laga dia
//andar ek button ko box bol rhe usme ek event listener lagana hai
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    //handler
    //box par click krne par text milega ya X ya O
    //pehle pta kro X likhna hai ya O likhna hai
    if (turnO) {
      box.style.color = "#7ae582";
      box.innerText = "O";
      turnO = false; //false set krna jaroori hai
      //loophole abhi tk ka logic mei O par click kia toh X ban jaaega
      // but hame toh ek baar value dene ke baad uss button ko disable krna hai
    } else {
      box.style.color = "#ff758f";
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true; //isse button disable ho gya
    count++;
    //ab hame check krna hai apne winner ko
    //jaise hi har ek box click hoga waise hi check kro ki winner toh nhi aa gya koi
    //this function will check the winner
    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = ()=>{
    for(box of boxes){
        box.disabled = true;
    }
    //yeh function hamare saare boxes ko disable kar dega jaise hi winner mil jaaega
};

const enableBoxes = ()=>{
    for(box of boxes){
        box.disabled = false;
        //jab new game par click ho toh wapas se saare boxes enable ho jaae
        box.innerText = ""; 
        //saara content boxes ka khaali kr dia dobara
    }
}
const showWinner = (winner)=>{
    msg.innerText = `Congratulations the Winner is ${winner}`;
    msgContainer.classList.remove('hide');
    //hide class ko remove kr dia taaki winner message visible ho jaae
    //winner show karne ke baad ham chahte hai ki aage game continue na ho-> saare boxes disable ho jaae
    disableBoxes();
}



//reset game jaise hi click kre saari blocks buttons blank ho jaae wapas se 
const resetGame = ()=>{
    //starting mei 0 ki turn thi toh same wahi ho jae reset se
    turnO = true;
    count = 0;
    enableBoxes(); //sare boxes ko enable krna hai
    msgContainer.classList.add("hide"); //hide class ko wapas se disable kr dia meaning winner ko hide kr dia reset ke baad
}

newGameBtn.addEventListener("click",resetGame); //jaise hi new game btn pr click kro waise hi reset game call ho jaaega

resetBtn.addEventListener("click",resetGame);