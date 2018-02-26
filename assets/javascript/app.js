//giant triviaGame var to hold everything so I can reset the game w/o refreshing the page
var triviaGame = {
    trivia:{
        question1:{
            question:"How fast can a sneeze travel?",
            c1:"Sneezes don't move",
            c2:"3 miles per hour, like a sloth",
            c3:"70 miles per hour, like a cheetah",
            c4:"100 miles per hour, like a sports car",
            answer:4,
            gif:"sneeze.gif"
            },
        question2:{
            question:"When you're in space, your body...",
            c1:"gets taller",
            c2:"gets shorter",
            c3:"stops growing",
            c4:"isn't sure what to do",
            answer:1,
            gif:"space.gif"
            },
        question3:{
            question:"Which of these is NOT true?",
            c1:"Lobsters pee out of their faces.",
            c2:"Turtles can breath from their butts.",
            c3:"Snakes eat grass if there's no meat.",
            c4:"If you lift a kangaroo's tail off the ground it can't hop.",
            answer:3,
            gif:"kangaroo.gif"
            }
    },

    // newQuestion();
    numCorrect:0,
    numIncorrect:0,
    numUnanswered:0,
    correctAnswerNumber:0,
    answerInWords:null,
    intervalId:0,
    valOfButtonPushed:0,
    answerButtonClicked:false,
    i:-1,//corresponds to the question the game is on
    objKeys:null,
    seconds:3, //change to 30 seconds

    //when page reloads or restart game button is pressed
    setUpGame:function(){
        objKeys = Object.keys(this.trivia); //indexOf questions in trivia object
        console.log(objKeys); //(3) ["question1", "question2", "question3"] 
                                //0:"question1"
                                //1:"question2"
                                //2:"question3"
        return objKeys; // need this?
    },

    //pick a question
    newQuestion:function(){      
        // console.log(triviaGame.trivia.objKeys); //Why undefined??
        $("#time, #question").removeClass("hide"); //buttons appear
        $("#time, #question").addClass("show");   
        $(".btn").removeClass("hide");
        $(".btn").addClass("show");  
        $("#gifPic").empty(); //removes previous gif
        triviaGame.i++;

        //change below to 8
        if (triviaGame.i === 3) {
            triviaGame.endGame();
            return;
        }; //if the questions are done, stop this and go to endGame
        console.log("new question function");
        $("#time-left").html(" " + triviaGame.seconds);
        intervalId = setInterval(triviaGame.run30SecondTimer, 1000);
        $("#answerMsg").html("");
        triviaGame.answerButtonClicked=false;
        triviaGame.seconds=3; //change to 30
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
            // clearInterval(intervalId);
            triviaGame.translateAnswerToWords();
            $("#answerMsg").html("Out of time!<br>The correct answer was:<br>"+ triviaGame.answerInWords);
            triviaGame.showGif();
            triviaGame.numUnanswered++;
        }
    },

    showGif: function(){
        $("#time, #question").removeClass("show"); //answer choices disappear
        $("#time, #question").addClass("hide");  
        $(".btn").removeClass("show");
        $(".btn").addClass("hide");

        clearInterval(intervalId);

        // document.querySelector("#bandDiv").innerHTML =
        // "<img class='band-image' src='images/" + this.wordsToPick[this.wordInPlay].picture + "' alt='" +
        // this.wordsToPick[this.wordInPlay].song + "'>";

        $("#gifPic").html("<img class='questionPic' src='assets/giphies/" + triviaGame.trivia[objKeys[triviaGame.i]].gif 
        + "' alt='" + triviaGame.trivia[objKeys[triviaGame.i]].gif + "'>");
        triviaGame.answerButtonClicked=true;
        setTimeout(triviaGame.newQuestion, 2000); //wait 5 sec and move to next question
    },

    checkAnswer:function(){
        // console.log("check answer function");
        // console.log("val of button="+triviaGame.valOfButtonPushed);
        // console.log("correct ans num="+triviaGame.correctAnswerNumber);

        if (triviaGame.valOfButtonPushed == triviaGame.correctAnswerNumber) {
            // clearInterval(intervalId);
            $("#answerMsg").html("Correct!");         
            triviaGame.showGif();
            triviaGame.numCorrect++;
            }
        else {
            // clearInterval(intervalId);
            triviaGame.translateAnswerToWords();
            $("#answerMsg").html("Nope!<br>The correct answer was:<br>"+ triviaGame.answerInWords);
            triviaGame.showGif();
            triviaGame.numIncorrect++;
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
        $("#time, #question").removeClass("show"); //buttons disappear
        $("#time, #question").addClass("hide");      
        $(".btn").removeClass("show");
        $(".btn").addClass("hide");
        $("#answerMsg").html("Finished!<br><br>Here's how you did:<br>Correct answers: " + this.numCorrect +
        "<br>Incorrect answers: " + this.numIncorrect + "<br>Unanswered questions: "+ this.numUnanswered);
        $(".restartBtn").removeClass("hide");
        $(".restartBtn").addClass("show");
    }//end of endGame function
}; //end of var triviaGame

//press start to start game
$(".startBtn").on("click", function(){
    $(".startBtn").addClass("hide"); //start button disappears
    triviaGame.setUpGame();
    triviaGame.newQuestion();
});

//click on one of the four answers
$(".btn").on("click", function (){
    if (triviaGame.answerButtonClicked) return;
    triviaGame.valOfButtonPushed=$(this).val(); //value of button pushed
    triviaGame.checkAnswer();
});

$(".restartBtn").on("click", function(){
    triviaGame.numCorrect=0;
    triviaGame.numIncorrect=0;
    triviaGame.numUnanswered=0;
    triviaGame.correctAnswerNumber=0;
    triviaGame.answerInWords=null;
    triviaGame.intervalId=0;
    triviaGame.valOfButtonPushed=0;
    triviaGame.answerButtonClicked=false;
    triviaGame.i=-1;  
    triviaGame.objKeys=null; 

    $(".restartBtn").addClass("hide"); //start button disappears
    triviaGame.setUpGame();
    triviaGame.newQuestion();
})


//change timer from 2000 to 30*1000 seconds
//add questions
//readMe
//beautify page
//add to portfolio
//alt image - how to check if it's being added?
//change two timers to 5 and 30 sec