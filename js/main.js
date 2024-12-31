// Access To Element We Will You

let myGame= document.querySelector(".my-game");
let start= document.querySelector(".start");
let startTitle= document.querySelector(".start-title");
let startGame= document.querySelector("input");
let countOfQuestion= document.querySelector(".count-of-ques-in");
let questions= document.querySelector(".questions");
let titleQuestion= document.querySelector(".title");
let answerOne= document.querySelector(".answer-one");
let answerTwo= document.querySelector(".answer-two");
let answerThree= document.querySelector(".answer-three");
let answerFour= document.querySelector(".answer-four");
let allAnswer= Array.from(document.querySelectorAll(".answers span"));
let btnAnswer= document.querySelector("button");
let timer= document.querySelector(".time");
let timeAndBullets= document.querySelector(".time-bulltes");

// Part Of Array

let trueAndFalseArray= [], randomNumberArray= [] , userAnswerArray= [];

// Part Of Variable

let myRequestData,correctAnswer,randomNumber,userAnswer;

let countOfQues= 15,countAnswerQues= 0,checkClassActive= false;

let allQues=0 , trueAnswer=0 , falseAnswer=0;

// The Main Code

startTitle.innerHTML= `في هذا التحدي يجب أن يتم الإجابة عن ${countOfQues} سؤال خلال دقيقة ونص`;
startGame.onclick= function (){

  start.style.cssText= "display: none";

  getResponseData();
  countOfQuestion.innerHTML= countOfQues;
  bulitBulltes(countOfQues);
  answerOnclick();
  setTimer();

  btnAnswer.onclick = function (){

    checkClassActive= false;
    // Check If User Choose Answer On Not Before Click
    for (let x=0 ; x<allAnswer.length ; x++){
      if (allAnswer[x].classList.contains("active")){
        checkClassActive= true;
        break;
      }
    }
    if (countAnswerQues <= countOfQues && checkClassActive === true){

      // Store All User Answer To Use In LocalStorage
      userAnswerArray.push(userAnswer);

      // Store The Answer Is True Or Wrong on Click
      userAnswer === correctAnswer ? trueAndFalseArray.push(true) : trueAndFalseArray.push(false);

      allAnswer.forEach((ele) => {
        ele.classList.remove("active");
      });
      getResponseData();

      // Remove Old divBulltes
      document.querySelector(".bulltes").remove();

      bulitBulltes(countOfQues);
      answerOnclick();
    }
  }

}



// Part Of Functions

// 1- Function To Get Data From JSON

function getResponseData(){

  let myRequest= new XMLHttpRequest();

  myRequest.onreadystatechange= function (){
    if (myRequest.readyState === 4 && myRequest.status === 200){
      myRequestData= JSON.parse(myRequest.responseText);

      // To Check The Question Is Not Repeat
      while(true){
        randomNumber= Math.floor(Math.random() * Object.keys(myRequestData).length);
        if (randomNumberArray.length > 0){
          if (randomNumberArray.includes(randomNumber)){
            continue;
          }
          else {
            randomNumberArray.push(randomNumber);
            showQuesAndAnswers();
            break;
          }
        }
        else {
          randomNumberArray.push(randomNumber);
          showQuesAndAnswers();
          break;
        }
      }
    }
  };

  myRequest.open("GET", "html_questions.json", true);
  myRequest.send();
}

// 2- Function To Built Bullets

function  bulitBulltes(num){
  
  // Creat New divBulltes
  let divBullets= document.createElement("div");
  divBullets.setAttribute("class","bulltes");
  timeAndBullets.appendChild(divBullets);


  for (let x=0 ; x<num ; x++){
    let span= document.createElement("span");

    divBullets.appendChild(span);
  }

  // Put Answer True Or Wrong In Bulltes

  if (trueAndFalseArray.length > 0){
    let allBulltes= Array.from(document.querySelectorAll(".bulltes span"));
    for (let x=0 ; x<trueAndFalseArray.length ; x++){
      allBulltes[x].setAttribute("class",`${trueAndFalseArray[x]}`);
    }
  }
}

// 3- Function To Show Questions

function showQuesAndAnswers (){

  if (countAnswerQues < countOfQues){
    titleQuestion.innerHTML= myRequestData[randomNumber].title;
    answerOne.innerHTML= myRequestData[randomNumber].answer1;
    answerTwo.innerHTML= myRequestData[randomNumber].answer2;
    answerThree.innerHTML= myRequestData[randomNumber].answer3;
    answerFour.innerHTML= myRequestData[randomNumber].answer4;
    correctAnswer= myRequestData[randomNumber].rightanswer;
  }
  countAnswerQues+=1;
}

// 4- Function Answer Onclick

function answerOnclick() {
  
  allAnswer.forEach((ele) => {
    ele.addEventListener("click", (eve) => {
      allAnswer.forEach((ele) => {
        ele.classList.remove("active");
      })
      eve.currentTarget.classList.add("active");
      userAnswer= eve.currentTarget.innerHTML;
    })
  })
}

// 5- Function To Set Time

function setTimer(){

  let dateNow= new Date().getTime();
  let dateTimer= dateNow + 90000; // 90000 Number Of Timer With Millisecond

  let counter= setInterval(function (){


    dateNow= new Date().getTime();
    let differe= dateTimer - dateNow;
    let minute= Math.trunc(differe / 1000 / 60);
    let second= Math.trunc((differe - (minute * 60 * 1000)) / 1000);
    
    minute < 10 && second >= 10 ? timer.innerHTML= `${second} : 0${minute}`: timer.innerHTML= `0${second} : 0${minute}`;

    if (differe <= 0 || countAnswerQues-1 === countOfQues){
      clearInterval(counter);

      challengeIsOver();
    }
  },1000)
  
}

// 6- Function To Over The Challenge

function challengeIsOver(){

  calcScore();

  let coverDiv= document.createElement("div");
  let boxTextAndBtn= document.createElement("div");
  let text= document.createElement("h1");
  let score= document.createElement("span");
  let btnAgain= document.createElement("button");


  coverDiv.style.cssText= "background-color: #ffffff7d ; position: fixed ; width: 100% ; height: 100% ; top: 0";
  boxTextAndBtn.style.cssText= "width: 50% ; background-color: #0075ff ; position: fixed ; top: 50% ; left: 50% ; transform: translate(-50%,-50%) ; padding: 10px ; border-radius: 15px ; display: flex ; flex-direction: column ; align-items: center ; justify-content: center";
  text.style.cssText= "margin: 0 0 15px ; color: white ; text-align: center";
  score.style.cssText= "margin: 5px 0 20px ; font-size: 20px ; font-weight: 400 ; width: fit-content ; padding: 5px 10px ; background-color: #ffffffb3 ; color: #0d69d5 ; text-align: center ; line-height: 1.6 ; box-shadow: inset 2px 2px 5px #525252, inset -1px 0 4px #525252";
  btnAgain.style.cssText= "border: none ; border-radius: 10px ; width: 40% ; background-color: #eee ; width: fit-content ; padding: 10px 15px ; color: #0075ff ; font-size: 29px ; font-weight: 600 ; font-family: Ribuk ; cursor: pointer ; box-shadow: inset 3px 3px 5px #919191";


  text.appendChild(document.createTextNode("إنتهي التحدي"));
  score.appendChild(document.createTextNode(`لقد قمت بالإجابة علي ${allQues} سؤال منهم ${trueAnswer} صح و ${falseAnswer} خطأ`));
  btnAgain.appendChild(document.createTextNode("تحدي آخر"));
  boxTextAndBtn.appendChild(text);
  boxTextAndBtn.appendChild(score);
  boxTextAndBtn.appendChild(btnAgain);
  coverDiv.appendChild(boxTextAndBtn);
  myGame.appendChild(coverDiv);

  btnAgain.onclick= function (){
    window.location.reload();
  }

}

// Function To Calc Score After The User Finish

function calcScore(){
  let bulltesFinish= Array.from(document.querySelectorAll(".bulltes span"));
  bulltesFinish.forEach((ele) => {
    if (ele.hasAttribute("class")){
      allQues+=1;
      if (ele.classList.contains("true")){
        trueAnswer+=1;
      }
      else {
        falseAnswer+=1;
      }
    }
  })
}