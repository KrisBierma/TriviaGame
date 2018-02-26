//giant triviaGame var to hold everything so I can reset the game w/o refreshing the page
var triviaGame = {
    trivia:{
        question1:{
            question:"How fast can a sneeze travel?",
            c1:"Sneezes don't move",
            c2:"3 miles per hour, like a sloth",
            c3:"70 miles per hour, like a cheetah",
            c4:"100 miles per hour, like a sports car",
            answer:4
            },
        question2:{
            question:"When you're in space, your body...",
            c1:"gets taller",
            c2:"gets shorter",
            c3:"stops growing",
            c4:"isn't sure what to do",
            answer:1
            },
        question3:{
            question:"Which of these is NOT true?",
            c1:"Lobsters pee out of their faces.",
            c2:"Turtles can breath from their butts.",
            c3:"Snakes eat grass if there's no meat.",
            c4:"If you lift a kangaroo's tail off the ground it can't hop.",
            answer:3
            }
    },

    // newQuestion();
    numCorrect:0,
    numIncorrect:0,
    numUnanswered:0,
    correctAnswerNumber:0,
    answerInWords:undefined,
    intervalId:0,
    valOfButtonPushed:0,
    answerButtonClicked:false,
    i:-1,//corresponds to the question the game is on
    objKeys:undefined,
    seconds:5, //change to 30 seconds

    //when page reloads or restart game button is pressed
    setUpGame:function(){
        $("#time, #question").removeClass("hide"); //buttons appear below
        $("#time, #question").addClass("show");      
        $(".btn").removeClass("hide");
        $(".btn").addClass("show");
        objKeys = Object.keys(this.trivia);
        console.log(objKeys);
    },

    //pick a question
    newQuestion:function(){      
        console.log("new question function");
        $("#time-left").html(" " + triviaGame.seconds);
        intervalId = setInterval(triviaGame.run30SecondTimer, 1000);
        $("#answerMsg").html("");
        triviaGame.answerButtonClicked=false;
        triviaGame.seconds=5; //change to 30
        triviaGame.i++;
        triviaGame.correctAnswerNumber=triviaGame.trivia[objKeys[triviaGame.i]].answer;
        $("#question").html(triviaGame.trivia[objKeys[triviaGame.i]].question);
        $("#choice1").html(triviaGame.trivia[objKeys[triviaGame.i]].c1);
        $("#choice2").html(triviaGame.trivia[objKeys[triviaGame.i]].c2);
        $("#choice3").html(triviaGame.trivia[objKeys[triviaGame.i]].c3);
        $("#choice4").html(triviaGame.trivia[objKeys[triviaGame.i]].c4);
    },
    
    run30SecondTimer: function(){
        $("#time-left").html(" " + triviaGame.seconds);
        triviaGame.seconds--;
        if (triviaGame.seconds===-1){
            clearInterval(intervalId);
            triviaGame.translateAnswerToWords();
            $("#answerMsg").html("Out of time! The correct answer was: "+ triviaGame.answerInWords);
            setTimeout(triviaGame.newQuestion, 2000); //wait 5 sec and move to next question
            triviaGame.answerButtonClicked=true;
        }
    },

    checkAnswer:function(){
        console.log("check answer function");
        console.log("val of button="+triviaGame.valOfButtonPushed);
        console.log("correct ans num="+triviaGame.correctAnswerNumber);

        if (triviaGame.valOfButtonPushed == triviaGame.correctAnswerNumber) {
            $("#answerMsg").html("Correct!");
            // showPic(); //need to write this function
            triviaGame.numCorrect++;
            clearInterval(intervalId);
            setTimeout(triviaGame.newQuestion, 2000); //wait 5 sec and move to next question
            triviaGame.answerButtonClicked=true;
            }
        else {
            triviaGame.translateAnswerToWords();
            console.log(triviaGame.answerInWords);
            $("#answerMsg").html("Nope! The correct answer was: "+ triviaGame.answerInWords);
            // showPic(); //need to write triviaGame function
            triviaGame.numIncorrect++;
            clearInterval(intervalId);
            triviaGame.answerButtonClicked=true;
            setTimeout(triviaGame.newQuestion, 2000); //wait 5 sec and move to next question
            }
    },

    translateAnswerToWords:function(){
        var expr = triviaGame.trivia[objKeys[triviaGame.i]].answer;
        switch(expr) {
            case 1:
                triviaGame.answerInWords = triviaGame.trivia[objKeys[triviaGame.i]].c1;
                console.log("case1="+triviaGame.trivia[objKeys[triviaGame.i]].c1);
                break;
            case 2:
                triviaGame.answerInWords = triviaGame.trivia[objKeys[triviaGame.i]].c2;
                break;
            case 3:
                triviaGame.answerInWords = triviaGame.trivia[objKeys[triviaGame.i]].c3;
                break;
            default:
                triviaGame.answerInWords = triviaGame.trivia[objKeys[triviaGame.i]].c4;
        }
        return triviaGame.answerInWords;
    },

    endGame: function(){
        //at end - "Finished! Here's how you did: Correct Answers: ? Incorrect answers: ? Unanswered: ?" Start over?
        //start over button appears
        //button resets the game, not reloads page
    }//end endGame function
}; //end var triviaGame

//press start to start game
$(".startBtn").on("click", function(){
    triviaGame.setUpGame();
    triviaGame.newQuestion();
    $(".startBtn").addClass("hide"); //start button disappears
})

//click on one of the four answers
$(".btn").on("click", function (){
    if (triviaGame.answerButtonClicked) return;
    triviaGame.valOfButtonPushed=$(this).val(); //value of button pushed
    triviaGame.checkAnswer();
});

//change timer from 2000 to 30*1000 seconds
//add questions
//endGame function
//readMe
//beautify page
//add pictures