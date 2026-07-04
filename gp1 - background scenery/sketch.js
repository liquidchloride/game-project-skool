/*

//ZA GAME JOJECT
*/
var gameChar;
var cloud;
var worldWidth;
var worldHeight;
var mountainArray;
var stumpArray;
var ground;
var isLeft;
var isRight;
var isPlummeting;
var gravity;
var jumpStrength;
var isJumping = false;
var waterbottleArray;
var gameState;
var pitsArray;
var cloudArray;
var overPit;
var gameCharPOV;
var deathalpha;
function setup() {
  createCanvas(windowWidth, windowHeight);
  //create array for  10 clouds with randomised y and scale and diffrent starting x
  cloudArray = [];
  for (let i = 0; i < 10; i++) {
    cloud = {
      pos: {
        X: -200 - random(0, 600),
        Y: random(10, 250),
        scale: random(0.5, 1),
      },
      speed: random(0.1, 2),
      colour: random(150, 255),
    };
    cloudArray.push(cloud);
  }
  //create array for 7 mountian ranges with random offset and scale
  mountainArray = [];
  for (let i = 0; i < 7; i++) {
    mountain = {
      x: i * 1200 + random(100, 200), //spaced out but still random jitter
      scale: random(0.8, 1.5), //random scale
    };
    mountainArray.push(mountain);
  }
  //create array for base of 26 cacti with random offset and sclae
  stumpArray = [];
  for (let i = 0; i < 26; i++) {
    stump = {
      x: i * 300 + random(100, 300), //spaced out but still random jitter
      scale: random(0.5, 1.5), //random scale
    };
    stumpArray.push(stump);
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
      x: random(1000, 1500) * i, //spaced far and scaled with i to prevent overlap
      y: ground.y, //set y position for pits
      width: random(100, 130), //randomise width for pits
    };
    pitsArray.push(pits);
  }
  gameChar = {
    x: 0, //spawn game character at x=0
    y: ground.y, //spawn game character at y=ground level
    velocity: 0, //set velocity as 0 when spawn in
    speed: 5, //set game character speed
  };

  gravity = 0.2; //push character down each frame to replicate gravity
  jumpStrength = -5; //how high game character can jump
  // waterbottleArray = [];//WIP
  // for (let i = 1; i < 11; i++) {
  //   waterbottle = {
  //     x: 1000 * i + random(1, 100), //waterbottle x pos every 1000px+(1 to 100)
  //     y: ground.y - 30, //waterbottle abit higher than ground
  //     is_found: false,
  //   };
  //   waterbottleArray.push(waterbottle);
  // }

  gameState = "START"; //make game state START by default
}

function draw() {
  if (gameState == "START") {
    //=====================================START SCREEN===================================================
    noStroke();
    background(90, 55, 35);
    //SUN
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
    textSize(150); //draw game name
    fill(255);
    textFont("Papyrus");
    textAlign(CENTER, CENTER);
    text("Dune Rider", windowWidth / 2, windowHeight / 2);
    textSize(20); //draw game controls
    text("Press spacebar to START", windowWidth / 2, windowHeight / 2 + 200);
    text(
      "A to move left, D to move right, W to jump up",
      windowWidth / 2,
      windowHeight / 2 + 400,
    );
  } else if (gameState == "PLAY") {
    //=====================================MAIN GAMEPLAY=======================
    background(250, 206, 152); //draw world
    worldHeight = 1000;
    worldWidth = 8000;
    noStroke();
    //set camera POV on game char with limits of left and right of world
    gameCharPOV = constrain(
      gameChar.x - windowWidth / 2,
      0,
      worldWidth - windowWidth,
    );

    //SUN(fixed to screen, does not move)
    push();
    fill(255, 60, 0);
    ellipse(ground.centre, ground.y, ground.centre, ground.centre);
    fill(255, 60, 0, 100);
    ellipse(ground.centre, ground.y, ground.centre + 100, ground.centre + 100);
    fill(255, 60, 0, 50);
    ellipse(ground.centre, ground.y, ground.centre + 200, ground.centre + 200);
    pop();

    //CLOUDS(fixed to screen,move independently of camera moving)
    for (let i = 0; i < cloudArray.length; i++) {
      fill(cloudArray[i].colour);
      rect(
        cloudArray[i].pos.X + 10 * cloudArray[i].pos.scale,
        cloudArray[i].pos.Y,
        180 * cloudArray[i].pos.scale,
        50 * cloudArray[i].pos.scale,
      );
      ellipse(
        cloudArray[i].pos.X + 10 * cloudArray[i].pos.scale,
        cloudArray[i].pos.Y,
        100 * cloudArray[i].pos.scale,
        100 * cloudArray[i].pos.scale,
      );
      ellipse(
        cloudArray[i].pos.X + 100 * cloudArray[i].pos.scale,
        cloudArray[i].pos.Y,
        100 * cloudArray[i].pos.scale,
        100 * cloudArray[i].pos.scale,
      );
      ellipse(
        cloudArray[i].pos.X + 190 * cloudArray[i].pos.scale,
        cloudArray[i].pos.Y,
        100 * cloudArray[i].pos.scale,
        100 * cloudArray[i].pos.scale,
      );
      if (cloudArray[i].pos.X > -200 && cloudArray[i].pos.X < windowWidth) {
        //if cloud is within view,keep moving
        cloudArray[i].pos.X += cloudArray[i].speed;
      } else {
        //else rest it with random Y and scale
        cloudArray[i].pos.Y = random(10, 250);
        cloudArray[i].pos.scale = random(0.5, 1);
        cloudArray[i].pos.X = -199;
      }
    }
    //sidescrolling element where everything out of push pop is stays  fixed
    push();
    translate(-gameCharPOV, 0);
    //Desert Ground
    fill(237, 201, 138);
    rect(0, ground.y, worldWidth, (windowHeight * 2) / 8); //draw some green ground

    //================MOUNTAINS======================================================
    //3 triangles to replicate a mountain range
    for (let i = 0; i < 7; i++) {
      fill(196, 132, 90);
      triangle(
        mountainArray[i].x + 150 * mountainArray[i].scale,
        ground.y,
        mountainArray[i].x + 300 * mountainArray[i].scale,
        ground.y - ((windowHeight * 3) / 8) * mountainArray[i].scale,
        mountainArray[i].x + 450 * mountainArray[i].scale,
        ground.y,
      );
      fill(140, 76, 48);
      triangle(
        mountainArray[i].x,
        ground.y,
        mountainArray[i].x + 150 * mountainArray[i].scale,
        ground.y - ((windowHeight * 4) / 8) * mountainArray[i].scale,
        mountainArray[i].x + 300 * mountainArray[i].scale,
        ground.y,
      );
      fill(140, 76, 48);
      triangle(
        mountainArray[i].x + 300 * mountainArray[i].scale,
        ground.y,
        mountainArray[i].x + 450 * mountainArray[i].scale,
        ground.y - ((windowHeight * 4) / 8) * mountainArray[i].scale,
        mountainArray[i].x + 600 * mountainArray[i].scale,
        ground.y,
      );
    }
    //jo
    //==========================CACTI=====================================================
    //collection of rectangles that make up a cactus
    for (let i = 0; i < stumpArray.length; i++) {
      fill(67, 124, 79);
      rect(
        stumpArray[i].x,
        ground.y - 80 * stumpArray[i].scale,
        20 * stumpArray[i].scale,
        80 * stumpArray[i].scale,
        90,
        90,
        0,
        0,
      );
      rect(
        stumpArray[i].x - 25 * stumpArray[i].scale,
        ground.y - 45 * stumpArray[i].scale,
        25 * stumpArray[i].scale,
        15 * stumpArray[i].scale,
        0,
        0,
        0,
        90,
      );
      rect(
        stumpArray[i].x - 25 * stumpArray[i].scale,
        ground.y - 90 * stumpArray[i].scale,
        15 * stumpArray[i].scale,
        45 * stumpArray[i].scale,
        90,
        90,
        0,
        0,
      );
      rect(
        stumpArray[i].x + 20 * stumpArray[i].scale,
        ground.y - 60 * stumpArray[i].scale,
        20 * stumpArray[i].scale,
        15 * stumpArray[i].scale,
        0,
        0,
        90,
        0,
      );
      rect(
        stumpArray[i].x + 25 * stumpArray[i].scale,
        ground.y - 100 * stumpArray[i].scale,
        15 * stumpArray[i].scale,
        50 * stumpArray[i].scale,
        90,
        90,
        0,
        0,
      );
    }

    //=========================================PITS=======================================
    //each pit is drawn from bottom of screen to ground level
    //overPit is true if game char x is within pit x values
    overPit = false;
    for (let i = 0; i < pitsArray.length; i++) {
      fill(92, 58, 38);
      rect(
        pitsArray[i].x,
        pitsArray[i].y,
        pitsArray[i].width,
        windowHeight - ground.y,
      );
      if (
        gameChar.x > pitsArray[i].x &&
        gameChar.x < pitsArray[i].x + pitsArray[i].width
      ) {
        overPit = true;
      }
    }
    //WIP FOR TOKEN
    //   for (let i = 0; i < waterbottleArray.length; i++) {
    //     fill(0, 200, 255);
    //     rect(
    //       waterbottleArray[i].x,
    //       waterbottleArray[i].y,
    //       10,
    //       20,
    //       90,
    //       90,
    //       10,
    //       10,
    //     );
    //     fill(255);
    //     rect(
    //       waterbottleArray[i].x + 2.5,
    //       waterbottleArray[i].y - 5,
    //       5,
    //       5,
    //       0,
    //       0,
    //       50,
    //       50,
    //     );
    //     rect(waterbottleArray[i].x, waterbottleArray[i].y + 5, 10, 5);
    //   }
    //   if (dist(gameChar.x, gameChar.y - 40, waterbottle.x, waterbottle.y) < 20) {
    //     console.log("triggered");
    //     waterbottle.is_found = true;
    //   }
    //   if (waterbottle.is_found == false) {
    //     fill(0, 200, 255);
    //     rect(waterbottle.x, waterbottle.y, 10, 20, 90, 90, 10, 10);
    //     fill(255);
    //     rect(waterbottle.x + 2.5, waterbottle.y - 5, 5, 5, 0, 0, 50, 50);
    //     rect(waterbottle.x, waterbottle.y + 5, 10, 5);
    // }
    //====================GAME CHARACTER================================================
    //6 different states the character can be in depending on which condition is fulfiled
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
    //=============JUMPING MECHANISM=======================
    //while jumping, apply gravity to pull down to ground if overPit false, if else overPit true, continue falling
    if (isJumping || isPlummeting) {
      gameChar.y += gameChar.velocity;
      gameChar.velocity += gravity;

      if (gameChar.y >= ground.y) {
        if (overPit) {
          isPlummeting = true;
          isJumping = false;
        } else {
          gameChar.y = ground.y;
          isJumping = false;
          isPlummeting = false;
          gameChar.velocity = 0;
        }
      } //game character walk over pit
    } else if (overPit) {
      isPlummeting = true;
      gameChar.velocity = 0;
    } //game character falling enough=game over
    if (isPlummeting && gameChar.y > windowHeight + 100) {
      gameState = "GAME OVER";
      deathalpha = 0;
    }
    pop(); //sidescrolling element end
    //================HUD=======================
    //drawn after world creation to be visible always
    push();
    textSize(20);
    fill(0);
    textFont("Papyrus");
    textAlign(LEFT, LEFT);
    text("Press ESC key to pause game", 20, 20);
    fill(0);
    noStroke();
    text(mouseX + "," + mouseY, mouseX, mouseY);
    pop();
    //===================WIP=======================================
    // if (waterbottle.is_found == true) {
    //   push();
    //   fill(0);
    //   textSize(30);
    //   textFont("Papyrus");
    //   textAlign(RIGHT, TOP);
    //   text("1/10 waterbottles found!", windowWidth - 20, 20);
    //   pop();
    // }

    if (!isPlummeting) {
      if (isRight == true) {
        gameChar.x += gameChar.speed;
      } else if (isLeft == true) {
        gameChar.x -= gameChar.speed;
      }
    }
    //restrict game character to world limits
    gameChar.x = constrain(gameChar.x, 0, worldWidth);
    //====================PAUSE SCREEN=======================================
  } else if (gameState == "PAUSE") {
    background(100);
    textSize(150);
    fill(255);
    textFont("Papyrus");
    textAlign(CENTER, CENTER);
    text("Riding Paused", windowWidth / 2, windowHeight / 2);
    textSize(20);
    text("Press ESC key to continue", windowWidth / 2, windowHeight / 2 + 200);
    //====================GAME OVER SCREEN======================================
  } else if (gameState == "GAME OVER") {
    background(20);
    deathalpha += 1;
    if (deathalpha > 255) {
      deathalpha = 255;
    }
    textSize(500);
    fill(255, 50, 50, deathalpha);
    textFont("Papyrus");
    textAlign(CENTER, CENTER);
    text("YOU DIED", windowWidth / 2, windowHeight / 2);
    textSize(20);
    fill(255);
    text("git gud", windowWidth / 2, windowHeight / 2 - 300);
    text(
      "Press spacebar to try again",
      windowWidth / 2,
      windowHeight / 2 + 300,
    );
  }
}
function keyPressed() {
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
      }
    } else if (keyCode == 27) {
      //ESCAPE key=pause the game

      gameState = "PAUSE";
    }
  } else if (gameState == "PAUSE") {
    if (keyCode == 27) {
      //ESCAPE key=continue playing the game again
      gameState = "PLAY";
    }
  } else if (gameState == "GAME OVER" && keyCode == 32) {
    //spacebar on GAME OVER=reset everything and back to PLAY state
    gameChar.x = 0;
    gameChar.y = ground.y;
    gameChar.velocity = 0;
    isJumping = false;
    isPlummeting = false;
    isLeft = false;
    isRight = false;
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
