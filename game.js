
var userClickedPattern = [] //tracks what the user clicks in order

var gamePattern = []; //this is the simon says game order

var level = 0;

var gameOn = false;

var buttonColors = ["red", "blue", "green", "yellow"];

//add click listeners to buttons and save id of button clicked

$(".btn").on("click", function () {

    if(!gameOn) return;
    
    var userChosenColor = $(this).attr("id");

    animateButton(userChosenColor)

    userClickedPattern.push(userChosenColor)

    checkAnswer(userClickedPattern.length-1)
})

$(document).on("keypress", () => {
    if(!gameOn) {
        $("h1").text("Level " + level)
        nextSequence();
        gameOn = true;
    }
})



function nextSequence(){

    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor)

    level++;
    $("h1").text("Level " + level);

    animateButton(randomChosenColor);

}


function animateButton(buttonColorId){

    $("#" + buttonColorId).addClass("pressed");
    setTimeout(() => {
        $("#" + buttonColorId).removeClass("pressed");
    }, 200);
}

function checkAnswer(currentLevel){
    console.log("user selects " + userClickedPattern[currentLevel]);
    console.log("game picked " + gamePattern[currentLevel]);

    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        restartGame();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        
        $("h1").text("Press any key to restart");
    }

}

function restartGame() {
    gameOn = false;
    userClickedPattern = [];
    gamePattern = [];
    level = 0;
}