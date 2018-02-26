
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



    //pick a question
    newQuestion:function(){
        // console.log(trivia);
        
        //buttons appear
        $("#time, #question").removeClass("hide");
        $("#time, #question").addClass("show");      
        $(".btn").removeClass("hide");
        $(".btn").addClass("show");

        //start timer
        setTimeout(this.timesUp, 1000*3);//change to 30

        var i = -1; //corresponds to the question the game is on
        i++;
        var objKeys = Object.keys(this.trivia);
        console.log(objKeys); //0:question1, 1:question2..
        console.log(objKeys[i]); //question1
        console.log(this.trivia);//everything
        console.log(this.trivia[objKeys[i]]);//all info for question1
        console.log(this.trivia[objKeys[i]].question);//all info for question1
        console.log(this.trivia[objKeys[i]].answer);//answer# = 4
        correctAnswerNumber=this.trivia[objKeys[i]].answer;
        console.log(correctAnswerNumber);//answer = 4
        $("#question").html(this.trivia[objKeys[i]].question);
        $("#choice1").html(this.trivia[objKeys[i]].c1);
        $("#choice2").html(this.trivia[objKeys[i]].c2);
        $("#choice3").html(this.trivia[objKeys[i]].c3);
        $("#choice4").html(this.trivia[objKeys[i]].c4);
    },

    checkAnswer:function(){
        // var i = -1; //do I need this and next two lines???
        // i++;
        // var objKeys = Object.keys(this.trivia);
        // console.log(this);
        // console.log(this.trivia[objKeys[i]].answer);
        // console.log($(this).val());
        if (valOfButtonPushed == correctAnswerNumber) {
            $("#answerMsg").html("Correct!");
            // showPic(); //need to write this function
            this.numCorrect++;
            clearTimeout(this.timesUp);//stop timer //not working
            }
        else {
            this.translateAnswerToWords();
            // var expr = this.trivia[objKeys[i]].answer;
            // switch(expr) {
            //     case '1':
            //         answerInWords = this.trivia[objKeys[i]].c1;
            //         break;
            //     case '2':
            //         answerInWords = this.trivia[objKeys[i]].c2;
            //         break;
            //     case '3':
            //         answerInWords = this.trivia[objKeys[i]].c3;
            //         break;
            //     default:
            //         answerInWords = (this.trivia[objKeys[i]].c4);
            $("#answerMsg").html("Nope! The correct answer was: "+ answerInWords);
            // showPic(); //need to write this function
            this.numIncorrect++;
            clearTimeout(this.timesUp);//stop timer //not working
            }
        // }
        //wait 3 seconds and move to next question
        //i++ to move to next question OR leave it where it is
    },

    timesUp: function(){
        // console.log(answerInWords);
        this.translateAnswerToWords();
        $("#answerMsg").html("Out of time! The correct answer was: " + answerInWords);
        console.log(answerInWords);


        //if run out of time - change to "Out of time!" The correct answer was:... and a pic

    }, //end timesUp

    translateAnswerToWords:function(){
        var i = -1; //corresponds to the question the game is on
        i++;
        // console.log("working");
        var objKeys = Object.keys(this.trivia);
        var expr = this.trivia[objKeys[i]].answer;
        switch(expr) {
            case '1':
                answerInWords = this.trivia[objKeys[i]].c1;
                break;
            case '2':
                answerInWords = this.trivia[objKeys[i]].c2;
                break;
            case '3':
                answerInWords = this.trivia[objKeys[i]].c3;
                break;
            default:
                answerInWords = (this.trivia[objKeys[i]].c4);
        }
        // console.log(answerInWords); //working
    },

    endGame: function(){
        //at end - "Finished! Here's how you did: Correct Answers: ? Incorrect answers: ? Unanswered: ?" Start over?
        //start over button appears
        //button resets the game, not reloads page
    }//end endGame function
}; //end var triviaGame
//i++;


//press start to start game
$(".startBtn").on("click", function(){
    triviaGame.newQuestion();
    // triviaGame.say();

    $(".startBtn").addClass("hide");
    //start button disappears
})

//click on one of the four answers
$(".btn").on("click", function (){
    // if (!startButtonPressed) return;
    // console.log($(this).val());
    valOfButtonPushed=$(this).val(); //value of button pushed
    console.log(valOfButtonPushed);
    triviaGame.checkAnswer();
});

//show: time remaining 30seconds for one question
