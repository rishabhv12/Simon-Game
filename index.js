
let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = []
let userClickedPattern =[]
let level =0
let start = false
function nextSequence() {

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
//   console.log(randomNumber)
//   console.log(randomChosenColour)
  gamePattern.push(randomChosenColour);
  
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  level++;
  playSound(randomChosenColour)
     $("#level-title").text("Level  "+ level)
     
}

$(".btn").click(function(){
     let userChosenColour = $(this).attr("id")
     userClickedPattern.push(userChosenColour);
     // console.log(userClickedPattern)
     playSound(userChosenColour)
     animatePress(this)
     checkAns(userClickedPattern.length-1)
})

function playSound(name){
     
     let audio = new Audio("sounds/" + name+ ".mp3");
     audio.play();
}

function animatePress(currentColor){
     $(currentColor).addClass("pressed")
     setTimeout(function() {
          $(currentColor).removeClass('pressed');
     }, 100)
}


$(document).keypress(function(){
     if(start==false){
          nextSequence()
          start = true
     }
})
function checkAns(currentLevel){
     if (gamePattern[currentLevel] ==userClickedPattern[currentLevel]) {
          console.log("success");
          if (userClickedPattern.length ==gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
        }else {
          console.log("wrong")
          playSound("wrong")
          $("body").addClass("game-over")
          $("#level-title").text("Game Over, Press Any Key to Restart");
          setTimeout(function () {
               $("body").removeClass("game-over")
          }, 200);
          startOver();
     }
}
function startOver(){
     level=0
     start = false
     gamePattern = []
}