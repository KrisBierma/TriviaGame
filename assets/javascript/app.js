$(document).ready(function() {

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
            gif:"snakes.gif"
            },
        question4:{
            question:"Not all colors go deep underwater. Which ones can?",
            c1:"Red and orange",
            c2:"Yellow and purple",
            c3:"Blue and green",
            c4:"Pink and silver",
            answer:3,
            gif:"underwater.gif"
            },
        question5:{
            question:"Which animal can see behind itself without turning its head?",
            c1:"turtles",
            c2:"rabbits",
            c3:"foxes",
            c4:"antelopes",
            answer:2,
            gif:"rabbits.gif"
            },
        question6:{
            question:"Which is TRUE?",
            c1:"The earth is mostly land.",
            c2:"Volcanoes can make lighting.",
            c3:"Fleas don't actually jump.",
            c4:"Fish can't bite.",
            answer:2,
            gif:"lightning.gif"
            },
        question7:{
            question:"Who has the most bones?",
            c1:"a baby",
            c2:"a man",
            c3:"a woman",
            c4:"a man with a missing leg",
            answer:1,
            gif:"baby.gif"
            },
        question8:{
            question:"Which of these is not matter?",
            c1:"solid",
            c2:"liquid",
            c3:"gas",
            c4:"light",
            answer:4,
            gif:"light.gif"
            }
    },

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
    seconds:30,

    //when page first loads or restart game button is pressed
    setUpGame:function(){
        objKeys = Object.keys(this.trivia); //the array position of questions in trivia object
        $(triviaGame.answerInWords).addClass("h3");
    },

    newQuestion:function(){      
        $("#time, #question").removeClass("hide"); //buttons appear
        $("#time, #question").addClass("show");   
        $(".btn").removeClass("hide");
        $(".btn").addClass("show");  
        $("#gifPic").empty(); //removes previous gif
        triviaGame.i++;

        if (triviaGame.i === 8) {
            triviaGame.endGame();
            return;
        }; //if the questions are done, stop this and go to endGame
        
        triviaGame.seconds=30;
        $("#time-left").html(" " + triviaGame.seconds);
        intervalId = setInterval(triviaGame.run30SecondTimer, 1000);
        $("#answerMsg").html("");
        triviaGame.answerButtonClicked=false;
        triviaGame.correctAnswerNumber=triviaGame.trivia[objKeys[triviaGame.i]].answer;
        $("#question").html(triviaGame.trivia[objKeys[triviaGame.i]].question);
        $("#choice1").html(triviaGame.trivia[objKeys[triviaGame.i]].c1);
        $("#choice2").html(triviaGame.trivia[objKeys[triviaGame.i]].c2);
        $("#choice3").html(triviaGame.trivia[objKeys[triviaGame.i]].c3);
        $("#choice4").html(triviaGame.trivia[objKeys[triviaGame.i]].c4);
    },
    
    run30SecondTimer: function(){
        triviaGame.seconds--;
        $("#time-left").html(" " + triviaGame.seconds);
        if (triviaGame.seconds===-1){
            triviaGame.translateAnswerToWords();
            $("#answerMsg").html("<h2>Out of time!<h2>" + "<h4>The correct answer was:<br><h4>"+ "<h3>"+triviaGame.answerInWords+"<h3>");
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
        $("#gifPic").html("<img class='questionPic' src='assets/giphies/" + triviaGame.trivia[objKeys[triviaGame.i]].gif 
        + "' alt='" + triviaGame.trivia[objKeys[triviaGame.i]].gif + "'>");
        triviaGame.answerButtonClicked=true;
        setTimeout(triviaGame.newQuestion, 7*1000);
    },

    checkAnswer:function(){
        if (triviaGame.valOfButtonPushed == triviaGame.correctAnswerNumber) {
            $("#answerMsg").html("<h3>Correct!<h3>");         
            triviaGame.showGif();
            triviaGame.numCorrect++;
            }
        else {
            triviaGame.translateAnswerToWords();
            $("#answerMsg").html("<h2>Nope!<h2>" + "<h4>The correct answer was:<br><h4>"+ "<h3>"+triviaGame.answerInWords+"<h3>");
            triviaGame.showGif();
            triviaGame.numIncorrect++;
            }
    },

    translateAnswerToWords:function(){
        var expr = triviaGame.trivia[objKeys[triviaGame.i]].answer;
        switch(expr) {
            case 1:
                triviaGame.answerInWords = triviaGame.trivia[objKeys[triviaGame.i]].c1;
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
    }
}; //end of var triviaGame

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
    $(".restartBtn").removeClass("show");
    triviaGame.setUpGame();
    triviaGame.newQuestion();
});

});//end doc.ready