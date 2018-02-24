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

    //press start to start game
    // newQuestion();
    numCorrect:0,
    numIncorrect:0,
    numUnanswered:0,
    correctAnswer:0,

    //pick a question
    newQuestion:function(){
        // console.log(trivia);
        var i = 1;
        console.log(this.trivia);
        console.log(this.trivia[i].answer);
        correctAnswer=trivia[i].answer;
        $("#question").html(trivia[i].question);
        $("#choice1").html(trivia[i].c1);
        $("#choice2").html(trivia[i].c2);
        $("#choice3").html(trivia[i].c3);
        $("#choice4").html(trivia[i].c4);
    },

    checkAnswer:function(){
        console.log($(this).val());
        console.log(correctAnswer);
        if (($(this).val()) == correctAnswer) {
            $("#answer").html("Correct!");
            showPic(); //need to write this function
            console.log("#choiceButton");
            numCorrect++;
            };
    },

        // ($(".btn") === this.val){
        //if button is correct answer, correct++ and message
        //if wrong, incorrect++ and message
}; //end var triviaGame
//i++;

triviaGame.newQuestion();
console.log("starting");

$(".btn").on("click", function (){
    triviaGame.checkAnswer();
});

//show: time remaining 30seconds for one question
//show: question
//show: four choices
//hover affect
//if right - "Correct!" and a pic
//if wrong - change questions to "Nope!" The correct answer was: ... and a pic
//if run out of time - change to "Out of time!" The correct answer was:... and a pic
//and move to next question without user imput after three seconds
//at end - "Finished! Here's how you did: Correct Answers: ? Incorrect answers: ? Unanswered: ?" Start over?
//start over does not reload page, it resets the game
