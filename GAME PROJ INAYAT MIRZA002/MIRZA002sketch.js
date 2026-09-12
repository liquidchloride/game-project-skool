/*

//ZA GAME JOJECT
*/
//==========================GLOBAL VAR==========================================================
var gameChar; //no assistance used for declaring global variables
var cloud;
var worldWidth;
var worldHeight;
var mountainArray;
var mountain;
var stumpArrayX;
var stumpScaleArray;
var ground;
var isLeft;
var isRight;
var isPlummeting;
var gravity;
var jumpStrength;
var isJumping = false;
var waterBottleArray;
var waterBottle;
var waterBottlesFound;
var gameState;
var pitsArray;
var pits;
var cloudArray;
var overPit;
var cameraPosX;
var deathAlpha;
var winAlpha;
var lives;
var heartLoss;
var outpost;
var tank;
var scorpionArray;
var flagpole;

//=======================SETUP=========================================================
function setup() {
  createCanvas(windowWidth, windowHeight);
  //create array for  10 clouds with randomised y and scale and diffrent starting x
  cloudArray = [];
  for (let i = 0; i < 10; i++) {
    cloud = {
      pos: {
        x: -200 - random(0, 600),
        y: random(10, 250),
        scale: random(0.5, 1),
      },
      speed: random(0.1, 2),
      colour: random(150, 255),
    };
    cloudArray.push(cloud);
  }
  //create array for 7 mountian ranges with random offset and scale
  mountainArray = [];
  for (let i = 0; i < 8; i++) {
    mountain = {
      x: i * 1200 + random(100, 200), //spaced out but still random jitter
      scale: random(2, 3), //random scale
    };
    mountainArray.push(mountain);
  }
  //create array for base of 26 cacti with random offset and sclae
  stumpArrayX = [];
  for (let i = 0; i < 28; i++) {
    stumpArrayX.push(i * 400 + random(100, 250));
  }
  stumpScaleArray = [];
  for (let i = 0; i < stumpArrayX.length; i++) {
    stumpScaleArray.push(random(1, 1.5));
  }
  //create ground object to make code cleaner
  ground = {
    y: (windowHeight * 6) / 8, //ground always 6/8 of window height
    centre: windowWidth / 2, //declared for use for sun refrence
  };
  //create array for 7 pits
  pitsArray = [];
  for (let i = 1; i < 8; i++) {
    pits = {
      x: random(100, 400) + 1000 * i, //spaced far and scaled with i to prevent overlap
      y: ground.y, //set y position for pits
      width: random(180, 220), //randomise width for pits
    };
    pitsArray.push(pits);
  }
  gameChar = {
    x: 100, //spawn game character at x=100
    y: ground.y, //spawn game character at y=ground level
    velocity: 0, //set velocity as 0 when spawn in
    speed: 5, //set game character speed
  };

  gravity = 0.15; //push character down each frame to replicate gravity
  jumpStrength = -6; //how high game character can jump
  waterBottleArray = [];
  waterBottlesFound = 0;
  for (let i = 1; i < 16; i++) {
    waterBottle = {
      x: 550 * i + random(1, 100), //waterBottle x pos every 600px w random offset
      y: ground.y - 50 - random(1, 50), //waterBottle abit higher than ground and offset
      isFound: false,
    };
    waterBottleArray.push(waterBottle);
  }
  worldHeight = 1000;
  worldWidth = 9000;
  outpost = {
    x: worldWidth - 300,
    y: ground.y,
  };
  gameState = "START"; //make game state START by default
  lives = 3;
  heartLoss = {
    timer: 0,
    red: 220,
    alpha: 255,
    x: windowWidth / 2,
    y: windowHeight / 2,
    size: 200,
  };
  tank = {
    x: windowWidth / 2,
    y: windowHeight * 0.78,
    width: 200,
    height: 280,
    waterHeight: 0,
  };
  flagpole = {
    x: outpost.x + 180,
    y: ground.y,
    flagY: ground.y - 40,
    topY: ground.y - 170,
    raising: false,
    isUP: false,
    delay: 0,
  };
  scorpionArray = [];
  scorpionArray.push(new Scorpion(1700, ground.y, 200));
  scorpionArray.push(new Scorpion(2700, ground.y, 200));
  scorpionArray.push(new Scorpion(3700, ground.y, 200));
  scorpionArray.push(new Scorpion(4700, ground.y, 200));
  scorpionArray.push(new Scorpion(5700, ground.y, 200));
  scorpionArray.push(new Scorpion(6700, ground.y, 200));
  scorpionArray.push(new Scorpion(7900, ground.y, 200));
}
//====================================================DRAW===========================================================
function draw() {
  //for gamestate logic, I did it myself after running into issues with using diffrent variables to indicate each gamestates.Knowledge of states from other module came in handy here
  if (gameState == "START") {
    //=====================================START SCREEN===================================================
    noStroke();
    background(90, 55, 35);
    //SUN
    //drawing of scenery was done without assistance or minimal.Refrence for ideas and inspiration taken from internet and online art
    fill(255, 60, 0, 80);
    ellipse(ground.centre, ground.y, ground.centre + 200, ground.centre + 200);
    fill(255, 60, 0, 120);
    ellipse(ground.centre, ground.y, ground.centre + 100, ground.centre + 100);
    fill(220, 90, 30);
    ellipse(ground.centre, ground.y, ground.centre, ground.centre);
    //ground
    fill(180, 130, 85);
    rect(
      0,
      ground.y - 20,
      windowWidth,
      (windowHeight * 2) / 8 + 20,
      40,
      40,
      0,
      0,
    );
    //idea for font came from p5.js examples when looking through text
    textSize(150); //draw game name
    fill(255);
    textFont("Papyrus");
    textAlign(CENTER, CENTER);
    text("Dune Rider", windowWidth / 2, windowHeight / 2);
    textSize(20); //draw game controls
    text("Press spacebar to START", windowWidth / 2, windowHeight * 0.7);
    text(
      "A to move left, D to move right, W to jump up",
      windowWidth / 2,
      windowHeight * 0.85,
    );
  } else if (gameState == "PLAY") {
    //=====================================MAIN GAMEPLAY=======================
    background(135, 175, 195); //draw world

    noStroke();
    //set camera POV on game char with limits of left and right of world
    cameraPosX = constrain(
      gameChar.x - windowWidth / 2,
      0,
      worldWidth - windowWidth,
    );

    //SUN(fixed to screen, does not move)
    //idea for fixing sun to screen was original, but execution through the use of push pop was aided by AI as unfamiliar
    push();
    fill(255, 60, 0);
    ellipse(ground.centre, ground.y, ground.centre, ground.centre);
    fill(255, 60, 0, 100);
    ellipse(ground.centre, ground.y, ground.centre + 100, ground.centre + 100);
    fill(255, 60, 0, 50);
    ellipse(ground.centre, ground.y, ground.centre + 200, ground.centre + 200);
    pop();
    //=============================draw CLOUDS==============================================================
    drawClouds();
    //sidescrolling element where everything out of push pop is stays  fixed
    //side scrolling implemented after reading online on sidescrolling and watching videos as coursera was vague on this part
    push();
    translate(-cameraPosX, 0);
    //Desert Ground
    fill(237, 201, 138);
    rect(0, ground.y, worldWidth, (windowHeight * 2) / 8); //draw some green ground

    //=========================================draw PYRAMIDS======================================================
    drawPyramids();
    //=========================================draw CACTI==========================================================
    drawCacti();
    //=========================================draw PITS===========================================================
    drawPits();
    //=========================================draw COLLECTABLE====================================================
    drawCollectables();
    //=========================================draw END GOAL=======================================================
    drawEndGoal();
    //=========================================draw,check,update FLAGPOLE==========================================
    checkFlagpole();
    updateFlagpole();
    drawFlagpole();
    //=========================================draw GAME CHARACTER=================================================
    drawGameCharacter();
    //=========================================draw SCORPIONS======================================================
    drawScorpions();
    //=========================================JUMPING MECHANISM===================================================
    //while jumping, apply gravity to pull down to ground if overPit false, if else overPit true, continue falling
    //gravity and velocity mechanics were done after watching videos of gravity and velocity implementation on 2d side scrolling games, where the concept is the same
    //the troubleshooting for this was done with the help of AI where it simplified and explained it to me
    //the falling into pits and flow into game over state was done with minimal help.
    if (isJumping || isPlummeting) {
      gameChar.y += gameChar.velocity;
      gameChar.velocity += gravity;

      if (gameChar.y >= ground.y) {
        if (overPit) {
          if (gameChar.y > ground.y + 40) {
            isPlummeting = true;
            isJumping = false;
          }
        } else {
          gameChar.y = ground.y;
          isJumping = false;
          isPlummeting = false;
          gameChar.velocity = 0;
        }
      } //game character walk over pit
    } else if (overPit) {
      gameChar.y += 2;

      if (gameChar.y > ground.y + 40) {
        isPlummeting = true;
        gameChar.velocity = 0;
      }
    } else if (!overPit && gameChar.y > ground.y) {
      gameChar.y = ground.y;
    } //game character falling enough=game over
    if (isPlummeting && gameChar.y > windowHeight + 100) {
      lives--;
      if (lives > 0) {
        heartLoss.timer = 0;
        gameState = "LIFE LOST";
      } else {
        gameState = "GAME OVER";
        deathAlpha = 0;
      }
    }
    pop(); //sidescrolling element end
    //============================================================HUD===========================================
    //drawn after world creation to be visible always
    //HUD idea was inspired by other games to make the game more game like with a HUD of info and pausing instructions
    //idea of showing objectives and progress is very common throughout games, so idea was inspired
    push();
    textSize(20);
    fill(0);
    textFont("Papyrus");
    textAlign(LEFT, TOP);
    text("Press ESC key to pause game", 20, 20);
    drawLives();
    pop();

    push();
    fill(0);
    textSize(30);
    textFont("Papyrus");
    textAlign(RIGHT, TOP);
    text(
      waterBottlesFound +
        "/" +
        waterBottleArray.length +
        " water bottles found!",
      windowWidth - 20,
      20,
    );
    pop();

    if (!isPlummeting) {
      if (isRight == true) {
        gameChar.x += gameChar.speed;
      } else if (isLeft == true) {
        gameChar.x -= gameChar.speed;
      }
    }
    //restrict game character to world limits
    gameChar.x = constrain(gameChar.x, 0, worldWidth);
    //====================LIFE LOST==========================================
  } else if (gameState == "LIFE LOST") {
    drawLifeLost();

    //====================PAUSE SCREEN=======================================
    //design of pause screen and idea of it also common in many games, but drawing and implemantation of it was done without help
  } else if (gameState == "PAUSE") {
    background(100);
    textSize(150);
    fill(255);
    textFont("Papyrus");
    textAlign(CENTER, CENTER);
    text("Riding Paused", windowWidth / 2, windowHeight / 2);
    textSize(20);
    text("Press ESC key to continue", windowWidth / 2, windowHeight / 2 + 200);
    text(
      "Press R key to return to main menu",
      windowWidth / 2,
      windowHeight / 2 + 300,
    );
    //====================GAME OVER SCREEN======================================
    //end conditions and screen was done without any help
    //death screen inspired from popular game Dark Souls
  } else if (gameState == "GAME OVER") {
    background(20);
    deathAlpha += 1;
    if (deathAlpha > 255) {
      deathAlpha = 255;
    }
    fill(255, 50, 50, deathAlpha);
    textSize(windowHeight * 0.18);
    textFont("Papyrus");
    textAlign(CENTER, CENTER);
    text("YOU DIED", windowWidth / 2, windowHeight * 0.4);
    textSize(20);
    text("git gud", windowWidth / 2, windowHeight * 0.55);
    text(
      "Score:" + waterBottlesFound + "/" + waterBottleArray.length,
      windowWidth / 2,
      windowHeight * 0.68,
    );

    text("Press spacebar to try again", windowWidth / 2, windowHeight * 0.82);
    //=========================win screen====================================================
  } else if (gameState == "WIN") {
    background(0);
    winAlpha += 1;
    if (winAlpha > 255) {
      winAlpha = 255;
    }
    textSize(windowHeight * 0.18);
    fill(50, 255, 50, winAlpha);
    textFont("Papyrus");
    textAlign(CENTER, CENTER);
    text("YOU WIN", windowWidth / 2, windowHeight * 0.25);
    textSize(20);
    text(
      "Water delivered: " + waterBottlesFound + "/" + waterBottleArray.length,
      windowWidth / 2,
      windowHeight * 0.42,
    );
    text("Press spacebar to try again!", windowWidth / 2, windowHeight * 0.9);
    text(
      "Press ESC key to return to main menu screen",
      windowWidth / 2,
      windowHeight * 0.95,
    );
    drawWinTank();
  }
}
//=====================================CLOUDS(fixed to screen,move independently of camera moving)================================================
//array for clouds was already previously done up, design for scenery including clouds was from earlier templates that guided me.
//looping logic was done by me with help from friends for the conditions for loop to work
//animation was done by me alone
function drawClouds() {
  for (let i = 0; i < cloudArray.length; i++) {
    fill(cloudArray[i].colour);
    rect(
      cloudArray[i].pos.x - 90 * cloudArray[i].pos.scale,
      cloudArray[i].pos.y,
      180 * cloudArray[i].pos.scale,
      50 * cloudArray[i].pos.scale,
    );
    ellipse(
      cloudArray[i].pos.x - 90 * cloudArray[i].pos.scale,
      cloudArray[i].pos.y,
      100 * cloudArray[i].pos.scale,
      100 * cloudArray[i].pos.scale,
    );
    ellipse(
      cloudArray[i].pos.x,
      cloudArray[i].pos.y,
      100 * cloudArray[i].pos.scale,
      100 * cloudArray[i].pos.scale,
    );
    ellipse(
      cloudArray[i].pos.x + 90 * cloudArray[i].pos.scale,
      cloudArray[i].pos.y,
      100 * cloudArray[i].pos.scale,
      100 * cloudArray[i].pos.scale,
    );
    if (cloudArray[i].pos.x < windowWidth + 150) {
      cloudArray[i].pos.x += cloudArray[i].speed;
    } else {
      cloudArray[i].pos.y = random(50, 250);
      cloudArray[i].pos.scale = random(0.5, 1);
      cloudArray[i].pos.x = -149;
    }
  }
}
//========================PYRAMIDS========================================================================================
//3 triangles to replicate a mountain range
//same as clouds, where previously already done up.
function drawPyramids() {
  for (let i = 0; i < mountainArray.length; i++) {
    var x = mountainArray[i].x;
    var s = mountainArray[i].scale;
    //====================MAIN PYRAMID====================
    //light side
    fill(210, 170, 105);
    triangle(x - 180 * s, ground.y, x, ground.y - 220 * s, x, ground.y);
    //dark side
    fill(165, 120, 75);
    triangle(x, ground.y - 220 * s, x, ground.y, x + 180 * s, ground.y);
    //====================SMALL PYRAMID====================
    fill(195, 150, 90);
    triangle(
      x + 160 * s,
      ground.y,
      x + 260 * s,
      ground.y - 130 * s,
      x + 260 * s,
      ground.y,
    );
    fill(145, 100, 65);
    triangle(
      x + 260 * s,
      ground.y - 130 * s,
      x + 260 * s,
      ground.y,
      x + 360 * s,
      ground.y,
    );
    //====================PYRAMID DETAIL LINES====================
    stroke(120, 85, 55);
    strokeWeight(2);
    // Main pyramid - horizontal lines
    line(x - 135 * s, ground.y - 55 * s, x + 135 * s, ground.y - 55 * s);
    line(x - 90 * s, ground.y - 110 * s, x + 90 * s, ground.y - 110 * s);
    line(x - 45 * s, ground.y - 165 * s, x + 45 * s, ground.y - 165 * s);
    // Main pyramid - vertical/slanted section lines
    line(x - 90 * s, ground.y, x - 45 * s, ground.y - 110 * s);
    line(x + 90 * s, ground.y, x + 45 * s, ground.y - 110 * s);
    // Small pyramid - horizontal lines
    line(x + 188 * s, ground.y - 35 * s, x + 332 * s, ground.y - 35 * s);
    line(x + 213 * s, ground.y - 70 * s, x + 307 * s, ground.y - 70 * s);
    line(x + 238 * s, ground.y - 100 * s, x + 282 * s, ground.y - 100 * s);
    noStroke();
  }
}
function drawCacti() {
  //collection of rectangles that make up a cactus
  //initially was an array as I had gotten confident in use of arrays, but marking scheme asked for hardcoded values, so I adapted it.
  //same as mountains,previously done in scenery template and transfered over
  for (let i = 0; i < stumpArrayX.length; i++) {
    fill(67, 124, 79);
    rect(
      stumpArrayX[i] - 10 * stumpScaleArray[i],
      ground.y - 80 * stumpScaleArray[i],
      20 * stumpScaleArray[i],
      80 * stumpScaleArray[i],
      90,
      90,
      0,
      0,
    );
    rect(
      stumpArrayX[i] - 35 * stumpScaleArray[i],
      ground.y - 45 * stumpScaleArray[i],
      25 * stumpScaleArray[i],
      15 * stumpScaleArray[i],
      0,
      0,
      0,
      90,
    );
    rect(
      stumpArrayX[i] - 35 * stumpScaleArray[i],
      ground.y - 90 * stumpScaleArray[i],
      15 * stumpScaleArray[i],
      45 * stumpScaleArray[i],
      90,
      90,
      0,
      0,
    );
    rect(
      stumpArrayX[i] + 10 * stumpScaleArray[i],
      ground.y - 60 * stumpScaleArray[i],
      20 * stumpScaleArray[i],
      15 * stumpScaleArray[i],
      0,
      0,
      90,
      0,
    );
    rect(
      stumpArrayX[i] + 15 * stumpScaleArray[i],
      ground.y - 100 * stumpScaleArray[i],
      15 * stumpScaleArray[i],
      50 * stumpScaleArray[i],
      90,
      90,
      0,
      0,
    );
    fill(45, 95, 60);
    rect(
      stumpArrayX[i] + 3 * stumpScaleArray[i],
      ground.y - 80 * stumpScaleArray[i],
      7 * stumpScaleArray[i],
      80 * stumpScaleArray[i],
      0,
      90,
      0,
      0,
    );
    stroke(230, 220, 180);
    strokeWeight(1);
    line(
      stumpArrayX[i] - 10 * stumpScaleArray[i],
      ground.y - 25 * stumpScaleArray[i],
      stumpArrayX[i] - 17 * stumpScaleArray[i],
      ground.y - 28 * stumpScaleArray[i],
    );
    line(
      stumpArrayX[i] - 10 * stumpScaleArray[i],
      ground.y - 50 * stumpScaleArray[i],
      stumpArrayX[i] - 17 * stumpScaleArray[i],
      ground.y - 53 * stumpScaleArray[i],
    );
    line(
      stumpArrayX[i] - 10 * stumpScaleArray[i],
      ground.y - 70 * stumpScaleArray[i],
      stumpArrayX[i] - 17 * stumpScaleArray[i],
      ground.y - 73 * stumpScaleArray[i],
    );
    line(
      stumpArrayX[i] + 10 * stumpScaleArray[i],
      ground.y - 35 * stumpScaleArray[i],
      stumpArrayX[i] + 17 * stumpScaleArray[i],
      ground.y - 38 * stumpScaleArray[i],
    );
    line(
      stumpArrayX[i] + 10 * stumpScaleArray[i],
      ground.y - 60 * stumpScaleArray[i],
      stumpArrayX[i] + 17 * stumpScaleArray[i],
      ground.y - 63 * stumpScaleArray[i],
    );
    noStroke();
  }
}
function drawPits() {
  //each pit is drawn from bottom of screen to ground level
  //overPit is true if game char x is within pit x values
  //drawing of pits was done without assistance
  //idea for use of overPit logic was helped by AI in shortening my code as I initialy used another longer roundabout method, but implementation was still done by me.
  overPit = false;
  for (let i = 0; i < pitsArray.length; i++) {
    //main pit
    fill(92, 58, 38);
    rect(
      pitsArray[i].x,
      pitsArray[i].y,
      pitsArray[i].width,
      windowHeight - ground.y,
    );
    fill(45, 30, 25);
    rect(
      pitsArray[i].x + 12,
      pitsArray[i].y + 8,
      pitsArray[i].width - 24,
      windowHeight - ground.y,
    );
    fill(125, 80, 50);
    triangle(
      pitsArray[i].x,
      pitsArray[i].y,
      pitsArray[i].x + 25,
      pitsArray[i].y,
      pitsArray[i].x + 12,
      pitsArray[i].y + 18,
    );
    triangle(
      pitsArray[i].x + 20,
      pitsArray[i].y,
      pitsArray[i].x + 45,
      pitsArray[i].y,
      pitsArray[i].x + 32,
      pitsArray[i].y + 14,
    );
    triangle(
      pitsArray[i].x + pitsArray[i].width - 25,
      pitsArray[i].y,
      pitsArray[i].x + pitsArray[i].width,
      pitsArray[i].y,
      pitsArray[i].x + pitsArray[i].width - 12,
      pitsArray[i].y + 18,
    );
    triangle(
      pitsArray[i].x + pitsArray[i].width - 45,
      pitsArray[i].y,
      pitsArray[i].x + pitsArray[i].width - 20,
      pitsArray[i].y,
      pitsArray[i].x + pitsArray[i].width - 32,
      pitsArray[i].y + 14,
    );
    fill(255, 80, 0);
    rect(pitsArray[i].x, windowHeight - 35, pitsArray[i].width, 35);
    fill(255, 180, 0);
    rect(pitsArray[i].x, windowHeight - 35, pitsArray[i].width, 8);
    fill(255, 220, 50);
    ellipse(pitsArray[i].x + 30, windowHeight - 32, 12, 6);
    ellipse(pitsArray[i].x + pitsArray[i].width / 2, windowHeight - 30, 16, 7);
    ellipse(pitsArray[i].x + pitsArray[i].width - 25, windowHeight - 33, 10, 5);
    if (
      gameChar.x > pitsArray[i].x + 15 &&
      gameChar.x < pitsArray[i].x + pitsArray[i].width - 15
    ) {
      overPit = true;
    }
  }
}
function drawCollectables() {
  //drawing of token and idea of it being a water bottle was from me
  //use of if and dist was from Sleuth practices where i applied the same concepts
  for (let i = 0; i < waterBottleArray.length; i++) {
    if (waterBottleArray[i].isFound == false) {
      fill(255, 255, 255, 50);
      ellipse(waterBottleArray[i].x, waterBottleArray[i].y, 30, 30);
      fill(255, 255, 255, 40);
      ellipse(waterBottleArray[i].x, waterBottleArray[i].y, 40, 40);
      fill(255, 255, 255, 30);
      ellipse(waterBottleArray[i].x, waterBottleArray[i].y, 50, 50);
      // Bottle body
      fill(0, 200, 255);
      rect(
        waterBottleArray[i].x - 5,
        waterBottleArray[i].y - 7.5,
        10,
        20,
        90,
        90,
        10,
        10,
      );
      // Cap
      fill(255);
      rect(
        waterBottleArray[i].x - 2.5,
        waterBottleArray[i].y - 12.5,
        5,
        5,
        0,
        0,
        50,
        50,
      );
      // Label
      rect(waterBottleArray[i].x - 5, waterBottleArray[i].y - 2.5, 10, 5);
      if (
        dist(
          gameChar.x,
          gameChar.y - 40,
          waterBottleArray[i].x,
          waterBottleArray[i].y,
        ) < 25
      ) {
        waterBottleArray[i].isFound = true;
        waterBottlesFound++;
      }
    }
  }
}
function drawGameCharacter() {
  //6 different states the character can be in depending on which condition is fulfiled
  //this template is from the game project template but the drawing of the character is completely from me without any assistance.
  //I also changed some of the character states to make it easier for me to understand
  //design of character is purely original with minimal inspiration
  if (isLeft && isJumping) {
    //-------------------JUMPING FACING LEFT----------------------------------------------------
    //head
    fill(237, 201, 175);
    ellipse(gameChar.x, gameChar.y - 60, 20, 20);
    //legs
    fill(140, 120, 90);
    quad(
      gameChar.x - 8,
      gameChar.y - 25,
      gameChar.x - 3,
      gameChar.y - 25,
      gameChar.x - 8,
      gameChar.y,
      gameChar.x - 13,
      gameChar.y,
    );
    quad(
      gameChar.x + 2,
      gameChar.y - 25,
      gameChar.x + 7,
      gameChar.y - 25,
      gameChar.x + 12,
      gameChar.y,
      gameChar.x + 7,
      gameChar.y,
    );
    //arms left
    fill(210, 170, 120);
    quad(
      gameChar.x - 12,
      gameChar.y - 42,
      gameChar.x - 7,
      gameChar.y - 42,
      gameChar.x - 17,
      gameChar.y - 57,
      gameChar.x - 22,
      gameChar.y - 57,
    );
    //shoulders left
    fill(193, 154, 107);
    ellipse(gameChar.x - 9, gameChar.y - 42, 7, 7);
    //torso
    fill(180, 120, 60);
    rect(gameChar.x - 10, gameChar.y - 50, 20, 30, 10, 10, 90, 90);
    //arms right
    fill(210, 170, 120);
    quad(
      gameChar.x + 3,
      gameChar.y - 45,
      gameChar.x + 8,
      gameChar.y - 45,
      gameChar.x + 18,
      gameChar.y - 63,
      gameChar.x + 13,
      gameChar.y - 63,
    );
    //shoulder right
    fill(193, 154, 107);
    ellipse(gameChar.x + 5, gameChar.y - 45, 7, 7);
    //glasses
    stroke(100);
    line(gameChar.x + 9, gameChar.y - 61, gameChar.x - 10, gameChar.y - 61);
    fill(255, 0, 10);
    ellipse(gameChar.x - 8, gameChar.y - 59, 4, 5);
    ellipse(gameChar.x - 2, gameChar.y - 59, 7, 6);
    //hoverboard
    noStroke();
    fill(60);
    rect(gameChar.x - 18, gameChar.y - 2, 36, 6, 5);
    fill(0);
    ellipse(gameChar.x - 10, gameChar.y + 4, 6, 6);
    ellipse(gameChar.x + 10, gameChar.y + 4, 6, 6);
  } else if (isRight && isJumping) {
    //------------------------------JUMPING FACING RIGHT-------------------------------------------
    // head
    //
    fill(237, 201, 175);
    ellipse(gameChar.x, gameChar.y - 60, 20, 20);
    // legs
    fill(140, 120, 90);
    quad(
      gameChar.x + 8,
      gameChar.y - 25,
      gameChar.x + 3,
      gameChar.y - 25,
      gameChar.x + 8,
      gameChar.y,
      gameChar.x + 13,
      gameChar.y,
    );
    quad(
      gameChar.x - 2,
      gameChar.y - 25,
      gameChar.x - 7,
      gameChar.y - 25,
      gameChar.x - 12,
      gameChar.y,
      gameChar.x - 7,
      gameChar.y,
    );
    // arm right
    fill(210, 170, 120);
    quad(
      gameChar.x + 12,
      gameChar.y - 42,
      gameChar.x + 7,
      gameChar.y - 42,
      gameChar.x + 17,
      gameChar.y - 57,
      gameChar.x + 22,
      gameChar.y - 57,
    );
    // shoulder right
    fill(193, 154, 107);
    ellipse(gameChar.x + 9, gameChar.y - 42, 7, 7);
    // torso
    fill(180, 120, 60);
    rect(gameChar.x - 10, gameChar.y - 50, 20, 30, 10, 10, 90, 90);
    // arm left
    fill(210, 170, 120);
    quad(
      gameChar.x - 3,
      gameChar.y - 45,
      gameChar.x - 8,
      gameChar.y - 45,
      gameChar.x - 18,
      gameChar.y - 63,
      gameChar.x - 13,
      gameChar.y - 63,
    );
    // shoulder left
    fill(193, 154, 107);
    ellipse(gameChar.x - 5, gameChar.y - 45, 7, 7);
    // glasses
    stroke(100);
    line(gameChar.x - 9, gameChar.y - 61, gameChar.x + 10, gameChar.y - 61);
    fill(255, 0, 10);
    ellipse(gameChar.x + 8, gameChar.y - 59, 4, 5);
    ellipse(gameChar.x + 2, gameChar.y - 59, 7, 6);
    //hoverboard
    noStroke();
    fill(60);
    rect(gameChar.x - 18, gameChar.y - 2, 36, 6, 5);
    fill(0);
    ellipse(gameChar.x - 10, gameChar.y + 4, 6, 6);
    ellipse(gameChar.x + 10, gameChar.y + 4, 6, 6);
  } else if (isLeft && !isPlummeting) {
    //-------------------------FACING LEFT--------------------------------------
    //head
    fill(237, 201, 175);
    ellipse(gameChar.x, gameChar.y - 60, 20, 20);
    //legs
    fill(140, 120, 90);
    quad(
      gameChar.x - 8,
      gameChar.y - 25,
      gameChar.x - 3,
      gameChar.y - 25,
      gameChar.x - 8,
      gameChar.y,
      gameChar.x - 13,
      gameChar.y,
    );
    quad(
      gameChar.x + 2,
      gameChar.y - 25,
      gameChar.x + 7,
      gameChar.y - 25,
      gameChar.x + 12,
      gameChar.y,
      gameChar.x + 7,
      gameChar.y,
    );
    //arms left
    fill(210, 170, 120);
    quad(
      gameChar.x - 12,
      gameChar.y - 42,
      gameChar.x - 7,
      gameChar.y - 42,
      gameChar.x - 17,
      gameChar.y - 27,
      gameChar.x - 22,
      gameChar.y - 27,
    );
    //shoulders left
    fill(193, 154, 107);
    ellipse(gameChar.x - 9, gameChar.y - 42, 7, 7);
    //torso
    fill(180, 120, 60);
    rect(gameChar.x - 10, gameChar.y - 50, 20, 30, 10, 10, 90, 90);
    //arms right
    fill(210, 170, 120);
    quad(
      gameChar.x + 3,
      gameChar.y - 45,
      gameChar.x + 8,
      gameChar.y - 45,
      gameChar.x + 18,
      gameChar.y - 27,
      gameChar.x + 13,
      gameChar.y - 27,
    );
    //shoulder right
    fill(193, 154, 107);
    ellipse(gameChar.x + 5, gameChar.y - 45, 7, 7);
    //glasses
    stroke(100);
    line(gameChar.x + 9, gameChar.y - 61, gameChar.x - 10, gameChar.y - 61);
    fill(255, 0, 10);
    ellipse(gameChar.x - 8, gameChar.y - 59, 4, 5);
    ellipse(gameChar.x - 2, gameChar.y - 59, 7, 6);
    //hoverboard
    noStroke();
    fill(60);
    rect(gameChar.x - 18, gameChar.y - 2, 36, 6, 5);
    fill(0);
    ellipse(gameChar.x - 10, gameChar.y + 4, 6, 6);
    ellipse(gameChar.x + 10, gameChar.y + 4, 6, 6);
  } else if (isRight && !isPlummeting) {
    //----------------FACING RIGHT----------------------------------------------------------------
    fill(237, 201, 175);
    ellipse(gameChar.x, gameChar.y - 60, 20, 20);
    // legs
    fill(140, 120, 90);
    quad(
      gameChar.x + 8,
      gameChar.y - 25,
      gameChar.x + 3,
      gameChar.y - 25,
      gameChar.x + 8,
      gameChar.y,
      gameChar.x + 13,
      gameChar.y,
    );
    quad(
      gameChar.x - 2,
      gameChar.y - 25,
      gameChar.x - 7,
      gameChar.y - 25,
      gameChar.x - 12,
      gameChar.y,
      gameChar.x - 7,
      gameChar.y,
    );
    // arm right
    fill(210, 170, 120);
    quad(
      gameChar.x + 12,
      gameChar.y - 42,
      gameChar.x + 7,
      gameChar.y - 42,
      gameChar.x + 17,
      gameChar.y - 27,
      gameChar.x + 22,
      gameChar.y - 27,
    );
    // shoulder right
    fill(193, 154, 107);
    ellipse(gameChar.x + 9, gameChar.y - 42, 7, 7);
    // torso
    fill(180, 120, 60);
    rect(gameChar.x - 10, gameChar.y - 50, 20, 30, 10, 10, 90, 90);
    // arm left
    fill(210, 170, 120);
    quad(
      gameChar.x - 3,
      gameChar.y - 45,
      gameChar.x - 8,
      gameChar.y - 45,
      gameChar.x - 18,
      gameChar.y - 27,
      gameChar.x - 13,
      gameChar.y - 27,
    );
    // shoulder left
    fill(193, 154, 107);
    ellipse(gameChar.x - 5, gameChar.y - 45, 7, 7);
    // glasses
    stroke(100);
    line(gameChar.x - 9, gameChar.y - 61, gameChar.x + 10, gameChar.y - 61);
    fill(255, 0, 10);
    ellipse(gameChar.x + 8, gameChar.y - 59, 4, 5);
    ellipse(gameChar.x + 2, gameChar.y - 59, 7, 6);
    //hoverboard
    noStroke();
    fill(60);
    rect(gameChar.x - 18, gameChar.y - 2, 36, 6, 5);
    fill(0);
    ellipse(gameChar.x - 10, gameChar.y + 4, 6, 6);
    ellipse(gameChar.x + 10, gameChar.y + 4, 6, 6);
  } else if (isJumping || isPlummeting) {
    //---------------------FALLING LOOKING STRAIGHT-------------------------------------
    fill(237, 201, 175);
    ellipse(gameChar.x, gameChar.y - 60, 20, 20);
    //legs
    fill(140, 120, 90);
    rect(gameChar.x - 8, gameChar.y - 25, 7, 25, 10, 10, 10, 10);
    rect(gameChar.x, gameChar.y - 25, 7, 25, 10);
    //torso
    fill(180, 120, 60);
    rect(gameChar.x - 10, gameChar.y - 50, 20, 30, 10, 10, 90, 90);
    //arms
    fill(210, 170, 120);
    rect(gameChar.x - 15, gameChar.y - 62, 5, 20, 90);
    rect(gameChar.x + 10, gameChar.y - 62, 5, 20, 90);
    //shoulders
    fill(193, 154, 107);
    ellipse(gameChar.x - 12, gameChar.y - 42, 7, 7);
    ellipse(gameChar.x + 12, gameChar.y - 42, 7, 7);
    //glasses
    stroke(100);
    line(gameChar.x + 9, gameChar.y - 61, gameChar.x - 10, gameChar.y - 61);
    fill(255, 0, 10);
    ellipse(gameChar.x - 4, gameChar.y - 59, 7, 5);
    ellipse(gameChar.x + 4, gameChar.y - 59, 7, 5);
    //hoverboard
    noStroke();
    fill(60);
    rect(gameChar.x - 18, gameChar.y - 2, 36, 6, 5);
    fill(0);
    ellipse(gameChar.x - 10, gameChar.y + 4, 6, 6);
    ellipse(gameChar.x + 10, gameChar.y + 4, 6, 6);
  } else {
    //-----------------------STANDING-----------------------------------------------------
    //head
    fill(237, 201, 175);
    ellipse(gameChar.x, gameChar.y - 60, 20, 20);
    //legs
    fill(140, 120, 90);
    rect(gameChar.x - 8, gameChar.y - 25, 7, 25, 10, 10, 10, 10);
    rect(gameChar.x, gameChar.y - 25, 7, 25, 10);
    //torso
    fill(180, 120, 60);
    rect(gameChar.x - 10, gameChar.y - 50, 20, 30, 10, 10, 90, 90);
    //arms
    fill(210, 170, 120);
    rect(gameChar.x - 15, gameChar.y - 42, 5, 20, 0, 0, 90, 90);
    rect(gameChar.x + 10, gameChar.y - 42, 5, 20, 0, 0, 90, 90);
    //shoulders
    fill(193, 154, 107);
    ellipse(gameChar.x - 12, gameChar.y - 42, 7, 7);
    ellipse(gameChar.x + 12, gameChar.y - 42, 7, 7);
    //glasses
    stroke(100);
    line(gameChar.x + 9, gameChar.y - 61, gameChar.x - 10, gameChar.y - 61);
    fill(255, 0, 10);
    ellipse(gameChar.x - 4, gameChar.y - 59, 7, 5);
    ellipse(gameChar.x + 4, gameChar.y - 59, 7, 5);
    //hoverboard
    noStroke();
    fill(60);
    rect(gameChar.x - 18, gameChar.y - 2, 36, 6, 5);

    fill(0);
    ellipse(gameChar.x - 10, gameChar.y + 4, 6, 6);
    ellipse(gameChar.x + 10, gameChar.y + 4, 6, 6);
  }
}
function resetGame() {
  gameChar.x = 100;
  gameChar.y = ground.y;
  gameChar.velocity = 0;

  isJumping = false;
  isPlummeting = false;
  isLeft = false;
  isRight = false;

  waterBottlesFound = 0;
  flagpole.flagY = ground.y - 40;
  flagpole.raising = false;
  flagpole.isUP = false;
  flagpole.delay = 0;
  for (let i = 0; i < waterBottleArray.length; i++) {
    waterBottleArray[i].isFound = false;
  }
}
function drawLives() {
  for (let i = 0; i < 3; i++) {
    if (i < lives) {
      drawHeart(50 + i * 40, 90, 25, true);
    } else {
      drawHeart(50 + i * 40, 90, 25, false);
    }
  }
}
function drawHeart(x, y, size, isFilled) {
  if (isFilled) {
    fill(220, 0, 0);
  } else {
    fill(30);
  }
  noStroke();
  ellipse(x - size / 4, y, size / 2, size / 2);
  ellipse(x + size / 4, y, size / 2, size / 2);
  triangle(x - size / 2, y, x + size / 2, y, x, y + size / 1.2);
}
function drawLifeLost() {
  heartLoss.timer++;
  if (heartLoss.timer <= 60) {
    heartLoss.red = 255 - heartLoss.timer * (255 / 60);
    heartLoss.alpha = 255;
  } else {
    heartLoss.red = 0;
    heartLoss.alpha = 255;
  }
  background(
    255 - heartLoss.red,
    50 - heartLoss.red * (50 / 255),
    50 - heartLoss.red * (50 / 255),
  );
  fill(
    heartLoss.red,
    heartLoss.red * (50 / 255),
    heartLoss.red * (50 / 255),
    heartLoss.alpha,
  );
  noStroke();
  ellipse(
    heartLoss.x - heartLoss.size / 4,
    heartLoss.y - heartLoss.size / 8,
    heartLoss.size / 1.8,
    heartLoss.size / 1.8,
  );
  ellipse(
    heartLoss.x + heartLoss.size / 4,
    heartLoss.y - heartLoss.size / 8,
    heartLoss.size / 1.8,
    heartLoss.size / 1.8,
  );
  triangle(
    heartLoss.x - heartLoss.size / 2,
    heartLoss.y,
    heartLoss.x + heartLoss.size / 2,
    heartLoss.y,
    heartLoss.x,
    heartLoss.y + heartLoss.size / 1.7,
  );
  if (heartLoss.timer >= 120) {
    resetGame();
    gameState = "PLAY";
  }
}
function drawEndGoal() {
  push();
  //tent body
  noStroke();
  fill(190, 150, 95);
  triangle(
    outpost.x - 70,
    outpost.y,
    outpost.x,
    outpost.y - 90,
    outpost.x + 70,
    outpost.y,
  );
  //tent opening
  fill(90, 60, 35);
  triangle(
    outpost.x - 25,
    outpost.y,
    outpost.x,
    outpost.y - 75,
    outpost.x + 25,
    outpost.y,
  );
  //tent centre line
  stroke(140, 100, 65);
  line(outpost.x, outpost.y - 90, outpost.x, outpost.y - 75);
  //bottom box
  fill(145, 100, 55);
  stroke(95, 65, 35);
  strokeWeight(2);
  rect(outpost.x - 125, outpost.y - 30, 45, 30);
  //X on bottom box
  line(outpost.x - 125, outpost.y - 30, outpost.x - 80, outpost.y);
  line(outpost.x - 80, outpost.y - 30, outpost.x - 125, outpost.y);
  //top box
  fill(155, 110, 60);
  rect(outpost.x - 120, outpost.y - 58, 40, 28);
  //X on top box
  line(outpost.x - 120, outpost.y - 58, outpost.x - 80, outpost.y - 30);
  line(outpost.x - 80, outpost.y - 58, outpost.x - 120, outpost.y - 30);
  noStroke();
  fill(115, 75, 40);
  //table top
  rect(outpost.x + 40, outpost.y - 38, 45, 6);
  //table legs
  rect(outpost.x + 45, outpost.y - 32, 5, 32);
  rect(outpost.x + 75, outpost.y - 32, 5, 32);
  fill(65);
  rect(outpost.x + 51, outpost.y - 55, 25, 17, 2);
  //speaker
  fill(35);
  ellipse(outpost.x + 58, outpost.y - 46, 9, 9);
  //dial
  fill(180);
  ellipse(outpost.x + 70, outpost.y - 46, 4, 4);
  //antenna
  stroke(50);
  strokeWeight(2);
  line(outpost.x + 73, outpost.y - 55, outpost.x + 79, outpost.y - 70);
  noStroke();
  fill(110, 75, 40);
  //support
  rect(outpost.x + 102, outpost.y - 30, 41, 6);
  //legs
  rect(outpost.x + 106, outpost.y - 24, 5, 24);
  rect(outpost.x + 134, outpost.y - 24, 5, 24);
  fill(120, 145, 150);
  rect(outpost.x + 105, outpost.y - 80, 35, 50, 5);
  //tank top
  fill(100, 125, 130);
  ellipse(outpost.x + 122.5, outpost.y - 80, 35, 10);
  //empty label
  fill(50);
  textSize(9);
  textAlign(CENTER, CENTER);
  text("EMPTY", outpost.x + 122.5, outpost.y - 55);
  pop();
}
function drawFlagpole() {
  push();
  //pole
  stroke(70);
  strokeWeight(5);
  line(flagpole.x, flagpole.y, flagpole.x, flagpole.y - 190);
  //ball at top
  noStroke();
  fill(200);
  ellipse(flagpole.x, flagpole.y - 190, 10, 10);
  //flag
  fill(180, 30, 30);
  triangle(
    flagpole.x,
    flagpole.flagY,
    flagpole.x + 50,
    flagpole.flagY + 15,
    flagpole.x,
    flagpole.flagY + 30,
  );
  pop();
}
function checkFlagpole() {
  if (
    gameChar.x > outpost.x - 60 &&
    gameChar.x < outpost.x + 60 &&
    flagpole.isUP == false
  ) {
    flagpole.raising = true;
  }
}
function updateFlagpole() {
  if (flagpole.raising == true) {
    flagpole.flagY -= 2;
    if (flagpole.flagY <= flagpole.topY) {
      flagpole.flagY = flagpole.topY;
      flagpole.raising = false;
      flagpole.isUP = true;
    }
  }
  if (flagpole.isUP == true) {
    flagpole.delay++;
  }
  if (flagpole.delay >= 60) {
    gameState = "WIN";
    winAlpha = 0;
  }
}
function drawWinTank() {
  push();
  tank.waterHeight =
    ((tank.height - 10) * waterBottlesFound) / waterBottleArray.length;
  noStroke();
  fill(110, 75, 40);
  //support
  rect(tank.x - 55, tank.y, 110, 10);
  //legs
  rect(tank.x - 45, tank.y + 10, 10, 35);
  rect(tank.x + 35, tank.y + 10, 10, 35);
  fill(0, 150, 220);
  rect(
    tank.x - tank.width / 2 + 5,
    tank.y - 5 - tank.waterHeight,
    tank.width - 10,
    tank.waterHeight,
  );
  noFill();
  stroke(150);
  strokeWeight(5);
  rect(
    tank.x - tank.width / 2,
    tank.y - tank.height,
    tank.width,
    tank.height,
    10,
  );
  ellipse(tank.x, tank.y - tank.height, tank.width, 20);
  pop();
}
function Scorpion(x, y, range) {
  this.x = x;
  this.y = y;
  this.range = range;
  this.currentX = x;
  this.speed = 1;
  this.update = function () {
    this.currentX += this.speed;
    if (this.currentX > this.x + this.range || this.currentX < this.x) {
      this.speed = this.speed * -1;
    }
  };
  this.draw = function () {
    push();
    //flip scorpion when moving left
    if (this.speed < 0) {
      translate(this.currentX * 2, 0);
      scale(-1, 1);
    }
    //====================LEGS====================
    stroke(25);
    strokeWeight(2);
    //left legs
    line(this.currentX - 10, this.y - 10, this.currentX - 22, this.y - 2);
    line(this.currentX - 4, this.y - 11, this.currentX - 16, this.y + 2);
    line(this.currentX + 2, this.y - 11, this.currentX - 8, this.y + 4);
    //right legs
    line(this.currentX + 10, this.y - 10, this.currentX + 22, this.y - 2);
    line(this.currentX + 4, this.y - 11, this.currentX + 16, this.y + 2);
    line(this.currentX - 2, this.y - 11, this.currentX + 8, this.y + 4);
    //====================TAIL====================
    stroke(20);
    strokeWeight(6);
    line(this.currentX - 14, this.y - 14, this.currentX - 24, this.y - 24);
    line(this.currentX - 24, this.y - 24, this.currentX - 18, this.y - 36);
    line(this.currentX - 18, this.y - 36, this.currentX - 4, this.y - 40);
    //stinger
    noStroke();
    fill(10);
    ellipse(this.currentX, this.y - 40, 10, 10);
    triangle(
      this.currentX,
      this.y - 35,
      this.currentX,
      this.y - 45,
      this.currentX + 20,
      this.y - 30,
    );
    //====================CLAWS====================
    stroke(25);
    strokeWeight(4);
    //top claw
    line(this.currentX + 18, this.y - 14, this.currentX + 30, this.y - 20);
    line(this.currentX + 30, this.y - 20, this.currentX + 36, this.y - 26);
    line(this.currentX + 30, this.y - 20, this.currentX + 39, this.y - 18);
    //bottom claw
    line(this.currentX + 18, this.y - 10, this.currentX + 30, this.y - 5);
    line(this.currentX + 30, this.y - 5, this.currentX + 38, this.y - 1);
    line(this.currentX + 30, this.y - 5, this.currentX + 37, this.y - 10);
    //====================BODY====================
    noStroke();
    //main body
    fill(35);
    ellipse(this.currentX, this.y - 12, 30, 18);
    //back segment
    fill(25);
    ellipse(this.currentX - 10, this.y - 13, 16, 14);
    //head/front segment
    fill(45);
    ellipse(this.currentX + 14, this.y - 12, 14, 12);
    //eyes
    fill(180, 30, 30);
    ellipse(this.currentX + 16, this.y - 14, 2, 2);
    ellipse(this.currentX + 20, this.y - 14, 2, 2);
    pop();
  };
  this.checkContact = function (gameCharX, gameCharY) {
    var distance = dist(gameCharX, gameCharY - 25, this.currentX, this.y - 12);
    if (distance < 45) {
      return true;
    } else {
      return false;
    }
  };
}
function drawScorpions() {
  for (let i = 0; i < scorpionArray.length; i++) {
    scorpionArray[i].update();
    scorpionArray[i].draw();
    if (scorpionArray[i].checkContact(gameChar.x, gameChar.y)) {
      lives--;
      if (lives > 0) {
        heartLoss.timer = 0;
        gameState = "LIFE LOST";
      } else {
        gameState = "GAME OVER";
        deathAlpha = 0;
      }
    }
  }
}
function keyPressed() {
  //for both functions keyPressed and KeyReleased, the progress on sleuth really helped me as it had quite a few cases utilising these two functions
  //aid also taken from game project template where the functions were already done up for me
  //START screen and spacebar begins the game
  if (gameState == "START" && keyCode == 32) {
    //spacebar
    gameState = "PLAY";
  }

  if (gameState == "PLAY") {
    if (keyCode == 68) {
      //D key=move right
      isRight = true;
    } else if (keyCode == 65) {
      //A key=move left
      isLeft = true;
    } else if (keyCode == 87) {
      //W key=jump up but only if not already jumping or falling
      if (!isJumping && !isPlummeting) {
        isJumping = true;
        gameChar.velocity = jumpStrength;
        jumpSound.play();
      }
    } else if (keyCode == 27) {
      //ESCAPE key=pause the game
      gameState = "PAUSE";
    }
  } else if (gameState == "PAUSE") {
    if (keyCode == 27) {
      //ESCAPE key=continue playing the game again
      gameState = "PLAY";
    } else if (keyCode == 82) {
      lives = 3;
      resetGame();
      gameState = "START";
    }
  } else if (gameState == "WIN") {
    if (keyCode == 32) {
      lives = 3;
      resetGame();
      gameState = "PLAY";
    } else if (keyCode == 27) {
      lives = 3;
      resetGame();
      gameState = "START";
    }
  } else if (gameState == "GAME OVER" && keyCode == 32) {
    //spacebar on GAME OVER=reset everything and back to PLAY state
    //the execution for resetting the game was done with help from AI as i kept running into issues where it would break after resetting
    lives = 3;
    resetGame();
    gameState = "PLAY";
  }
  return false; //prevent browser from scrolling
}

function keyReleased() {
  if (keyCode == 68) {
    //RELEASE D key=stop walking right
    isRight = false;
  } else if (keyCode == 65) {
    //RELEASE A key=stop walking left
    isLeft = false;
  }
}
