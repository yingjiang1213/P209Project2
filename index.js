//create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 1000;
document.body.appendChild(canvas);
let gameover=false;
let won=false;
let counter = 0;


let chessBoard=[
    ['x','x','x','x','x','x','x','x','x'],
    ['x','x','x','x','x','x','x','x','x'],
    ['x','x','x','x','x','x','x','x','x'],
    ['x','x','x','x','x','x','x','x','x'],
    ['x','x','x','x','x','x','x','x','x'],
    ['x','x','x','x','x','x','x','x','x'],
    ['x','x','x','x','x','x','x','x','x'],
    ['x','x','x','x','x','x','x','x','x'],
    ['x','x','x','x','x','x','x','x','x'],
];


//load images=====================================================================
// Make sure the image is loaded first otherwise nothing will draw.
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/background.jpg";

// Side image
var sideReady = false;
var sideImage = new Image();
sideImage.onload = function () {
    sideReady = true;
};
sideImage.src = "images/borderL.png";

// Top image
var topReady = false;
var topImage = new Image();
topImage.onload = function () {
    topReady = true;
};
topImage.src = "images/borderT.png";

// dog image
var dogReady = false;
var dogImage = new Image();
dogImage.onload = function () {
    dogReady = true;
};
dogImage.src = "images/dogSpriteSheet.png";


// rooster image
var roosterReady = false;
var roosterImage = new Image();
roosterImage.onload = function () {
    roosterReady = true;
};
roosterImage.src = "images/rooster.png";

//bone image
var boneReady = false;
var boneImage = new Image();
boneImage.onload = function () {
    boneReady = true;
};
boneImage.src = "images/bone.png";
//end images=======================================================================

//load sounds======================================================================

var soundGameOver = "sounds/distract.wav";
var soundCaught="sounds/caught.wav";
var soundWin="sounds/win.wav";
var soundBG="sounds/BGM.mp3";
var soundEfx= document.getElementById("soundEfx");

//end of load sounds===============================================================

//define objects and variables=====================================================

// Game objects
var dog = {
    speed: 350, // movement in pixels per second
    x: 0,  // where on the canvas are they?
    y: 0  // where on the canvas are they?
};

var rooster = {
// for this version, the rooster does not move, so just and x and y
    x: 0,
    y: 0
};

var bone1 = {
        x: 0,
        y: 0
    };

var bone2 = {
        x: 0,
        y: 0
    };

var bone3 = {
        x: 0,
        y: 0
    };





var roostersCaught = 0;
//let died=false;

//4 rows and 3 cols================================================================
var rows = 4;
var cols = 3;

var trackRight = 2;
var trackLeft = 1;
var trackUp = 3;
var trackDown = 0;

var spriteWidth = 288; // also  spriteWidth/cols; 
var spriteHeight = 380;  // also spriteHeight/rows; 
var width = spriteWidth / cols; 
var height = spriteHeight / rows; 

var curXFrame = 0; // start on left side
var frameCount = 3;  // 3 frames per row
//x and y coordinates of the overall sprite image to get the single frame  we want
var srcX = 0;  // our image has no borders or other stuff
var srcY = 0;

//Assuming that at start the character will move right side 
var left = false;
var right = true;
//end of define objects and variables==============================================



//keyboard=========================================================================
// Handle keyboard controls
var keysDown = {}; //object were we properties when keys go down
                // and then delete them when the key goes up
// so the object tells us if any key is down when that keycode
// is down.  In our game loop, we will move the dog image if when
// we go thru render, a key is down

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

//end of keyboard==================================================================



//define functions=================================================================

// Update game objects
let placeItem= function(character){
    let X = 5;
    let Y = 6;
    let success= false;
    while(!success){
        X = Math.floor ( Math.random ( ) * 9 );
        Y = Math.floor ( Math.random ( ) * 9 );

        if(chessBoard[X][Y] === 'x'){
            success = true;
        }
    }
    chessBoard[X][Y] = 'O';  //mark as tacken
    character.x= (X*100) + 32;
    character.y= (Y*100) + 32;
}

//Update game objects
var update = function (modifier) {

    //ctx.clearRect(hero.x, hero.y, width, height);
    left = false;
    right = false;
    up = false;
    down = false;

    //adjust on keys
    if (38 in keysDown && dog.y > 10 ) { //  holding up key
        dog.y -= dog.speed * modifier;
        up = true;
    }
    if (40 in keysDown && dog.y < canvas.height - (32+ 95)) { //  holding down key
        dog.y += dog.speed * modifier;
        down = true;
    }
    if (37 in keysDown && dog.x > (36 + 0)) { // holding left key
        dog.x -= dog.speed * modifier;
        left = true;
    }
    if (39 in keysDown && dog.x < canvas.width - (32 + 98)) { // holding right key
        dog.x += dog.speed * modifier;
        right = true;
    }
    

    // Are they touching?
    if (
        dog.x <= (bone1.x + 85) // top
        && bone1.x <= (dog.x + 85)//left
        && dog.y <= (bone1.y + 65) //buttom
        && bone1.y <= (dog.y + 85) //right
    ) {
        soundEfx.src=soundGameOver;
        soundEfx.play();
        soundEfx.addEventListener("ended",function(){
            alert("Game Over!");
            location.reload();
        });
        gameover=true;
    }
    if (
        dog.x <= (bone2.x + 85) // top
        && bone2.x <= (dog.x + 85)//left
        && dog.y <= (bone2.y + 65) // buttom
        && bone2.y <= (dog.y + 85) //right
    ) {
        soundEfx.src=soundGameOver;
        soundEfx.play();
        soundEfx.addEventListener("ended",function(){
            alert("Game Over!");
            location.reload();
        });
        gameover=true;
    }
    if (
        dog.x <= (bone3.x + 85) //top
        && bone3.x <= (dog.x + 85)//left
        && dog.y <= (bone3.y + 65) //buttom
        && bone3.y <= (dog.y + 85) //right
    ) {
        soundEfx.src=soundGameOver;
        soundEfx.play();
        soundEfx.addEventListener("ended",function(){
            alert("Game Over!");
            location.reload();
        });
        gameover=true;
        
    }

    if (
        dog.x <= (rooster.x + 82) //rooster top
        && rooster.x <= (dog.x + 82)//left
        && dog.y <= (rooster.y + 60) //rooster buttom
        && rooster.y <= (dog.y + 72) //right
    ) {
        ++roostersCaught;       // keep track of our “score”
        soundEfx.src=soundCaught;
        soundEfx.play();
        if(roostersCaught==5){
            gameover=true;
            won=true;
            soundEfx.src=soundWin;
            soundEfx.play();
            soundEfx.addEventListener("ended",function(){
                alert("You Won!");
                location.reload();
            });
        }
        reset();       // start a new cycle
    }

    if (counter == 5) {  // adjust this to change "walking speed" of animation
        curXFrame = ++curXFrame % frameCount; 	//Updating the sprite frame index 
        // it will count 0,1,2,0,1,2,0, etc
        counter = 0;
    } else {
        counter++;
    }

    srcX = curXFrame * width;   	//Calculating the x coordinate for spritesheet 
    //if left is true,  pick Y dim of the correct row
    if (left) {
        //calculate srcY 
        srcY = trackLeft * height;
    }

    //if the right is true,   pick Y dim of the correct row
    if (right) {
        //calculating y coordinate for spritesheet
        srcY = trackRight * height;
    }

    if (up) {
        //calculating y coordinate for spritesheet
        srcY = trackUp * height;
    }
    if (down) {
        //calculating y coordinate for spritesheet
        srcY = trackDown * height;
    }

    if (left == false && right == false && up == false && down == false ) {
        srcX = 1 * width;
        srcY = 2 * height;
    }



};


// Draw everything in the main render function
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    if (sideReady) {
        ctx.drawImage(sideImage, 968, 0);
        ctx.drawImage(sideImage, 0, 0);
    }
    if (topReady) {
        ctx.drawImage(topImage, 0, 968);
        ctx.drawImage(topImage, 0, 0);
    }
    if (dogReady) {
        //ctx.drawImage(heroImage, hero.x, hero.y);
        ctx.drawImage(dogImage, srcX, srcY, width, height, dog.x, dog.y, width, height);
    }

    if (roosterReady) {
        ctx.drawImage(roosterImage, rooster.x, rooster.y);
    }
    
    if (boneReady){
        ctx.drawImage(boneImage, bone1.x, bone1.y);
        ctx.drawImage(boneImage, bone2.x, bone2.y);
        ctx.drawImage(boneImage, bone3.x, bone3.y);
    }

    // Score
    ctx.fillStyle = "rgb(210,105,30)";
    ctx.font = "30px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Roosters caught: " + roostersCaught, 32, 32);


}
// The main game loop
var main = function () {
    if(gameover==false){
    var now = Date.now();
    var delta = now - then;
    update(delta / 1000);
    render();
    then = now;
    //  Request to do this again ASAP
    requestAnimationFrame(main);
    }
    //else{
    //    if(won == true){
    //        alert("You Won!");
    //    }
    //}

};


// Reset the game when the player catches a rooster
var reset = function () {
    placeItem(dog);
    placeItem(rooster);
    placeItem(bone1);
    placeItem(bone2);
    placeItem(bone3);

};

var startGame = function (){
    soundEfx.src=soundBG;
    soundEfx.play();
    var x =document.getElementsByClassName("container");
    x[0].style.display = "none";
};

var countdown=60;
var timer;
function gameTimer() {
    if(startGame){
  if(countdown < 60) { 
    document.getElementById("timer").innerHTML = "Time:" + countdown+"s";
  }
  if (countdown >0 ) { 
     countdown--;
  } else {
    soundEfx.src=soundGameOver;
    clearInterval(timer);
    soundEfx.play();
    soundEfx.addEventListener("ended",function(){
        alert("Game Over!");
        location.reload();
    });
    gameover=true;
  }
}
  if(!timer) {
    timer = window.setInterval(function() { 
        gameTimer();
    }, 1000); // every second
  }
}
document.getElementById("timer").innerHTML="Time: 60s"; 
//end of define functions================================================================
// Let's play this game!

var then = Date.now();
reset();
main();  // call the main game loop.

