/*

//ZA GAME JOJECT
*/
var gameChar_x;
var gameChar_y;
var cloud;
var canvasX;
var canvasY;
var worldWidth;
var worldHeight;
var mountainrange;
var stumpStart;
var ground;
var isLeft;
var isRight;
var isPlummeting;
var isJumping;
var gameChar_yvelocity;
var gravity;
var jumpStrength;
var isJumping = false;
var waterbottleArray;
var mountainrange;
var gameState;
var gameEnd;
var pitsArray;
var cloudArray;
var overPit;
var gameCharPOV;
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
  //create array for 7 mountian ranges with distance of 1200 between ranges
  mountainrange = [];
  for (let i = 0; i < 7; i++) {
    mountainrange.push(i * 1200);
  }
  //create array for base of 9 cacti with distance of 800 between ranges
  stumpStart = [];
  for (let i = 0; i < 9; i++) {
    stumpStart.push(i * 800);
  }
  //create ground object to make code cleaner
  ground = {
    y: (windowHeight * 6) / 8,
    centre: windowWidth / 2,
  };
  //create array for 8 pits
  pitsArray = [];
  for (let i = 1; i < 8; i++) {
    pits = {
      x: random(1000, 1500) * i, //randomise x positions but still far apart from each other
      y: ground.y, //set y position for pits
      width: random(100, 130), //randomise width for pits
    };
    pitsArray.push(pits);
  }
  gameChar_x = 0; //spawn game character at x=0
  gameChar_y = ground.y; //spawn game character at y=ground level
  gameChar_yvelocity = 0; //set velocity as 0 when spawn in
  gravity = 0.2; //set gravity as 0.2 since in mars setting
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
    //game
    noStroke();
    background(90, 55, 35);
    fill(255, 60, 0, 80);
    ellipse(ground.centre, ground.y, ground.centre + 200, ground.centre + 200);
    fill(255, 60, 0, 120);
    ellipse(ground.centre, ground.y, ground.centre + 100, ground.centre + 100);
    fill(220, 90, 30);
    ellipse(ground.centre, ground.y, ground.centre, ground.centre);
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
    textSize(150);
    fill(255);
    textFont("Papyrus");
    textAlign(CENTER, CENTER);
    text("Dune Rider", windowWidth / 2, windowHeight / 2);
    textSize(20);
    text("Press spacebar to START", windowWidth / 2, windowHeight / 2 + 200);
    text(
      "A to move left, D to move right, W to jump up",
      windowWidth / 2,
      windowHeight / 2 + 400,
    );
  } else if (gameState == "PLAY") {
    background(250, 206, 152);
    worldHeight = 1000;
    worldWidth = 8000;
    noStroke();

    gameCharPOV = constrain(
      gameChar_x - windowWidth / 2,
      0,
      worldWidth - windowWidth,
    );

    //SUN
    push();
    fill(255, 60, 0);
    ellipse(ground.centre, ground.y, ground.centre, ground.centre);
    fill(255, 60, 0, 100);
    ellipse(ground.centre, ground.y, ground.centre + 100, ground.centre + 100);
    fill(255, 60, 0, 50);
    ellipse(ground.centre, ground.y, ground.centre + 200, ground.centre + 200);
    pop();

    //Clouds
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
        cloudArray[i].pos.X += cloudArray[i].speed;
        //console.log(cloudArray[i]_posX);
      } else {
        cloudArray[i].pos.Y = random(10, 250);
        cloudArray[i].pos.scale = random(0.5, 1);
        cloudArray[i].pos.X = -199;
        //console.log(cloudArray[i]_posY);
      }
    }
    //sidescrolling element
    push();
    translate(-gameCharPOV, 0);
    //Desert Ground
    fill(237, 201, 138);
    rect(0, ground.y, worldWidth, (windowHeight * 2) / 8); //draw some green ground

    //2. a mountain in the distance

    //... add your code here
    //mountain range 1-8
    for (let i = 0; i < 7; i++) {
      fill(196, 132, 90);
      triangle(
        mountainrange[i] + 150,
        ground.y,
        mountainrange[i] + 300,
        (windowHeight * 3) / 8,
        mountainrange[i] + 450,
        ground.y,
      );
      fill(140, 76, 48);
      triangle(
        mountainrange[i],
        ground.y,
        mountainrange[i] + 150,
        (windowHeight * 2) / 8,
        mountainrange[i] + 300,
        ground.y,
      );
      fill(140, 76, 48);
      triangle(
        mountainrange[i] + 300,
        ground.y,
        mountainrange[i] + 450,
        (windowHeight * 2) / 8,
        mountainrange[i] + 600,
        ground.y,
      );
    }
    //jo
    //cacti 1-10
    for (let i = 0; i < 9; i++) {
      fill(67, 124, 79);
      rect(stumpStart[i], ground.y - 80, 20, 80, 90, 90, 0, 0);
      rect(stumpStart[i] - 25, ground.y - 45, 25, 15, 0, 0, 0, 90);
      rect(stumpStart[i] - 25, ground.y - 90, 15, 45, 90, 90, 0, 0);
      rect(stumpStart[i] + 20, ground.y - 60, 20, 15, 0, 0, 90, 0);
      rect(stumpStart[i] + 25, ground.y - 100, 15, 50, 90, 90, 0, 0);
    }

    //4. a canyon
    //NB. the canyon should go from ground-level to the bottom of the screen
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
        gameChar_x > pitsArray[i].x &&
        gameChar_x < pitsArray[i].x + pitsArray[i].width
      ) {
        overPit = true;
      }
    }
    //... add your code here
    //WIP FOR TOKEN
    // //5. a collectable token - eg. a jewel, fruit, coins
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
    //   if (dist(gameChar_x, gameChar_y - 40, waterbottle.x, waterbottle.y) < 20) {
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
    //the game character
    if (isLeft && isJumping) {
      // add your jumping-left code
      //head
      fill(237, 201, 175);
      ellipse(gameChar_x, gameChar_y - 60, 20, 20);
      //legs
      fill(140, 120, 90);
      quad(
        gameChar_x - 8,
        gameChar_y - 25,
        gameChar_x - 3,
        gameChar_y - 25,
        gameChar_x - 8,
        gameChar_y,
        gameChar_x - 13,
        gameChar_y,
      );
      quad(
        gameChar_x + 2,
        gameChar_y - 25,
        gameChar_x + 7,
        gameChar_y - 25,
        gameChar_x + 12,
        gameChar_y,
        gameChar_x + 7,
        gameChar_y,
      );
      //arms left
      fill(210, 170, 120);
      quad(
        gameChar_x - 12,
        gameChar_y - 42,
        gameChar_x - 7,
        gameChar_y - 42,
        gameChar_x - 17,
        gameChar_y - 57,
        gameChar_x - 22,
        gameChar_y - 57,
      );
      //shoulders left
      fill(193, 154, 107);
      ellipse(gameChar_x - 9, gameChar_y - 42, 7, 7);
      //torso
      fill(180, 120, 60);
      rect(gameChar_x - 10, gameChar_y - 50, 20, 30, 10, 10, 90, 90);

      //arms right
      fill(210, 170, 120);
      quad(
        gameChar_x + 3,
        gameChar_y - 45,
        gameChar_x + 8,
        gameChar_y - 45,
        gameChar_x + 18,
        gameChar_y - 63,
        gameChar_x + 13,
        gameChar_y - 63,
      );

      //shoulder right
      fill(193, 154, 107);
      ellipse(gameChar_x + 5, gameChar_y - 45, 7, 7);
      //glasses
      stroke(100);
      line(gameChar_x + 9, gameChar_y - 61, gameChar_x - 10, gameChar_y - 61);
      fill(255, 0, 10);
      ellipse(gameChar_x - 8, gameChar_y - 59, 4, 5);
      ellipse(gameChar_x - 2, gameChar_y - 59, 7, 6);
      //hoverboard
      noStroke();
      fill(60);
      rect(gameChar_x - 18, gameChar_y - 2, 36, 6, 5);

      fill(0);
      ellipse(gameChar_x - 10, gameChar_y + 4, 6, 6);
      ellipse(gameChar_x + 10, gameChar_y + 4, 6, 6);
    } else if (isRight && isJumping) {
      // add your jumping-right code
      // head
      //
      fill(237, 201, 175);
      ellipse(gameChar_x, gameChar_y - 60, 20, 20);

      // legs
      fill(140, 120, 90);
      quad(
        gameChar_x + 8,
        gameChar_y - 25,
        gameChar_x + 3,
        gameChar_y - 25,
        gameChar_x + 8,
        gameChar_y,
        gameChar_x + 13,
        gameChar_y,
      );
      quad(
        gameChar_x - 2,
        gameChar_y - 25,
        gameChar_x - 7,
        gameChar_y - 25,
        gameChar_x - 12,
        gameChar_y,
        gameChar_x - 7,
        gameChar_y,
      );

      // arm right
      fill(210, 170, 120);
      quad(
        gameChar_x + 12,
        gameChar_y - 42,
        gameChar_x + 7,
        gameChar_y - 42,
        gameChar_x + 17,
        gameChar_y - 57,
        gameChar_x + 22,
        gameChar_y - 57,
      );

      // shoulder right
      fill(193, 154, 107);
      ellipse(gameChar_x + 9, gameChar_y - 42, 7, 7);

      // torso
      fill(180, 120, 60);
      rect(gameChar_x - 10, gameChar_y - 50, 20, 30, 10, 10, 90, 90);

      // arm left
      fill(210, 170, 120);
      quad(
        gameChar_x - 3,
        gameChar_y - 45,
        gameChar_x - 8,
        gameChar_y - 45,
        gameChar_x - 18,
        gameChar_y - 63,
        gameChar_x - 13,
        gameChar_y - 63,
      );

      // shoulder left
      fill(193, 154, 107);
      ellipse(gameChar_x - 5, gameChar_y - 45, 7, 7);

      // glasses
      stroke(100);
      line(gameChar_x - 9, gameChar_y - 61, gameChar_x + 10, gameChar_y - 61);
      fill(255, 0, 10);
      ellipse(gameChar_x + 8, gameChar_y - 59, 4, 5);
      ellipse(gameChar_x + 2, gameChar_y - 59, 7, 6);
      //hoverboard
      noStroke();
      fill(60);
      rect(gameChar_x - 18, gameChar_y - 2, 36, 6, 5);

      fill(0);
      ellipse(gameChar_x - 10, gameChar_y + 4, 6, 6);
      ellipse(gameChar_x + 10, gameChar_y + 4, 6, 6);
    } else if (isLeft && !isPlummeting) {
      // add your walking left code
      //head
      fill(237, 201, 175);
      ellipse(gameChar_x, gameChar_y - 60, 20, 20);
      //legs
      fill(140, 120, 90);
      quad(
        gameChar_x - 8,
        gameChar_y - 25,
        gameChar_x - 3,
        gameChar_y - 25,
        gameChar_x - 8,
        gameChar_y,
        gameChar_x - 13,
        gameChar_y,
      );
      quad(
        gameChar_x + 2,
        gameChar_y - 25,
        gameChar_x + 7,
        gameChar_y - 25,
        gameChar_x + 12,
        gameChar_y,
        gameChar_x + 7,
        gameChar_y,
      );
      //arms left
      fill(210, 170, 120);
      quad(
        gameChar_x - 12,
        gameChar_y - 42,
        gameChar_x - 7,
        gameChar_y - 42,
        gameChar_x - 17,
        gameChar_y - 27,
        gameChar_x - 22,
        gameChar_y - 27,
      );
      //shoulders left
      fill(193, 154, 107);
      ellipse(gameChar_x - 9, gameChar_y - 42, 7, 7);
      //torso
      fill(180, 120, 60);
      rect(gameChar_x - 10, gameChar_y - 50, 20, 30, 10, 10, 90, 90);

      //arms right
      fill(210, 170, 120);
      quad(
        gameChar_x + 3,
        gameChar_y - 45,
        gameChar_x + 8,
        gameChar_y - 45,
        gameChar_x + 18,
        gameChar_y - 27,
        gameChar_x + 13,
        gameChar_y - 27,
      );

      //shoulder right
      fill(193, 154, 107);
      ellipse(gameChar_x + 5, gameChar_y - 45, 7, 7);
      //glasses
      stroke(100);
      line(gameChar_x + 9, gameChar_y - 61, gameChar_x - 10, gameChar_y - 61);
      fill(255, 0, 10);
      ellipse(gameChar_x - 8, gameChar_y - 59, 4, 5);
      ellipse(gameChar_x - 2, gameChar_y - 59, 7, 6);
      //hoverboard
      noStroke();
      fill(60);
      rect(gameChar_x - 18, gameChar_y - 2, 36, 6, 5);

      fill(0);
      ellipse(gameChar_x - 10, gameChar_y + 4, 6, 6);
      ellipse(gameChar_x + 10, gameChar_y + 4, 6, 6);
    } else if (isRight && !isPlummeting) {
      // add your walking right code
      fill(237, 201, 175);
      ellipse(gameChar_x, gameChar_y - 60, 20, 20);

      // legs
      fill(140, 120, 90);
      quad(
        gameChar_x + 8,
        gameChar_y - 25,
        gameChar_x + 3,
        gameChar_y - 25,
        gameChar_x + 8,
        gameChar_y,
        gameChar_x + 13,
        gameChar_y,
      );
      quad(
        gameChar_x - 2,
        gameChar_y - 25,
        gameChar_x - 7,
        gameChar_y - 25,
        gameChar_x - 12,
        gameChar_y,
        gameChar_x - 7,
        gameChar_y,
      );

      // arm right
      fill(210, 170, 120);
      quad(
        gameChar_x + 12,
        gameChar_y - 42,
        gameChar_x + 7,
        gameChar_y - 42,
        gameChar_x + 17,
        gameChar_y - 27,
        gameChar_x + 22,
        gameChar_y - 27,
      );

      // shoulder right
      fill(193, 154, 107);
      ellipse(gameChar_x + 9, gameChar_y - 42, 7, 7);

      // torso
      fill(180, 120, 60);
      rect(gameChar_x - 10, gameChar_y - 50, 20, 30, 10, 10, 90, 90);

      // arm left
      fill(210, 170, 120);
      quad(
        gameChar_x - 3,
        gameChar_y - 45,
        gameChar_x - 8,
        gameChar_y - 45,
        gameChar_x - 18,
        gameChar_y - 27,
        gameChar_x - 13,
        gameChar_y - 27,
      );

      // shoulder left
      fill(193, 154, 107);
      ellipse(gameChar_x - 5, gameChar_y - 45, 7, 7);

      // glasses
      stroke(100);
      line(gameChar_x - 9, gameChar_y - 61, gameChar_x + 10, gameChar_y - 61);
      fill(255, 0, 10);
      ellipse(gameChar_x + 8, gameChar_y - 59, 4, 5);
      ellipse(gameChar_x + 2, gameChar_y - 59, 7, 6);
      //hoverboard
      noStroke();
      fill(60);
      rect(gameChar_x - 18, gameChar_y - 2, 36, 6, 5);

      fill(0);
      ellipse(gameChar_x - 10, gameChar_y + 4, 6, 6);
      ellipse(gameChar_x + 10, gameChar_y + 4, 6, 6);
    } else if (isJumping || isPlummeting) {
      // add your jumping facing forwards code
      fill(237, 201, 175);
      ellipse(gameChar_x, gameChar_y - 60, 20, 20);
      //legs
      fill(140, 120, 90);
      rect(gameChar_x - 8, gameChar_y - 25, 7, 25, 10, 10, 10, 10);
      rect(gameChar_x, gameChar_y - 25, 7, 25, 10);
      //torso
      fill(180, 120, 60);
      rect(gameChar_x - 10, gameChar_y - 50, 20, 30, 10, 10, 90, 90);
      //arms
      fill(210, 170, 120);
      rect(gameChar_x - 15, gameChar_y - 62, 5, 20, 90);
      rect(gameChar_x + 10, gameChar_y - 62, 5, 20, 90);
      //shoulders
      fill(193, 154, 107);
      ellipse(gameChar_x - 12, gameChar_y - 42, 7, 7);
      ellipse(gameChar_x + 12, gameChar_y - 42, 7, 7);
      //glasses
      stroke(100);
      line(gameChar_x + 9, gameChar_y - 61, gameChar_x - 10, gameChar_y - 61);
      fill(255, 0, 10);
      ellipse(gameChar_x - 4, gameChar_y - 59, 7, 5);
      ellipse(gameChar_x + 4, gameChar_y - 59, 7, 5);
      //hoverboard
      noStroke();
      fill(60);
      rect(gameChar_x - 18, gameChar_y - 2, 36, 6, 5);
      fill(0);
      ellipse(gameChar_x - 10, gameChar_y + 4, 6, 6);
      ellipse(gameChar_x + 10, gameChar_y + 4, 6, 6);
    } else {
      // add your standing front facing code
      //head
      fill(237, 201, 175);
      ellipse(gameChar_x, gameChar_y - 60, 20, 20);
      //legs
      fill(140, 120, 90);
      rect(gameChar_x - 8, gameChar_y - 25, 7, 25, 10, 10, 10, 10);
      rect(gameChar_x, gameChar_y - 25, 7, 25, 10);
      //torso
      fill(180, 120, 60);
      rect(gameChar_x - 10, gameChar_y - 50, 20, 30, 10, 10, 90, 90);
      //arms
      fill(210, 170, 120);
      rect(gameChar_x - 15, gameChar_y - 42, 5, 20, 0, 0, 90, 90);
      rect(gameChar_x + 10, gameChar_y - 42, 5, 20, 0, 0, 90, 90);
      //shoulders
      fill(193, 154, 107);
      ellipse(gameChar_x - 12, gameChar_y - 42, 7, 7);
      ellipse(gameChar_x + 12, gameChar_y - 42, 7, 7);
      //glasses
      stroke(100);
      line(gameChar_x + 9, gameChar_y - 61, gameChar_x - 10, gameChar_y - 61);
      fill(255, 0, 10);
      ellipse(gameChar_x - 4, gameChar_y - 59, 7, 5);
      ellipse(gameChar_x + 4, gameChar_y - 59, 7, 5);
      //hoverboard
      noStroke();
      fill(60);
      rect(gameChar_x - 18, gameChar_y - 2, 36, 6, 5);

      fill(0);
      ellipse(gameChar_x - 10, gameChar_y + 4, 6, 6);
      ellipse(gameChar_x + 10, gameChar_y + 4, 6, 6);
    }
    if (isJumping || isPlummeting) {
      gameChar_y += gameChar_yvelocity;
      gameChar_yvelocity += gravity;

      if (gameChar_y >= ground.y) {
        if (overPit) {
          isPlummeting = true;
          isJumping = false;
        } else {
          gameChar_y = ground.y;
          isJumping = false;
          isPlummeting = false;
          gameChar_yvelocity = 0;
        }
      }
    } else if (overPit) {
      isPlummeting = true;
      gameChar_yvelocity = 0;
    }
    if (isPlummeting && gameChar_y > windowHeight + 100) {
      gameState = "GAME OVER";
    }
    pop(); //sidescrolling element end
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
        gameChar_x += 5;
      } else if (isLeft == true) {
        gameChar_x -= 5;
      }
    }
  } else if (gameState == "PAUSE") {
    background(100);
    //stroke(200);
    textSize(150);
    fill(255);
    textFont("Papyrus");
    textAlign(CENTER, CENTER);
    text("Riding Paused", windowWidth / 2, windowHeight / 2);
    textSize(20);
    text("Press ESC key to continue", windowWidth / 2, windowHeight / 2 + 200);
  } else if (gameState == "GAME OVER") {
    background(20);
    textSize(100);
    fill(255, 50, 50);
    textFont("Papyrus");
    textAlign(CENTER, CENTER);
    text("GAME OVER", windowWidth / 2, windowHeight / 2);
    textSize(20);
    fill(255);
    text("git gud", windowWidth / 2, windowHeight / 2 - 100);
    text(
      "Press spacebar to try again",
      windowWidth / 2,
      windowHeight / 2 + 100,
    );
  }
}
function keyPressed() {
  // if statements to control the animation of the character when
  // keys are pressed.

  //open up the console to see how these work
  console.log("keyPressed: " + key);
  console.log("keyPressed: " + keyCode);
  if (gameState == "START" && keyCode == 32) {
    //space
    gameState = "PLAY";
  }

  if (gameState == "PLAY") {
    if (keyCode == 68) {
      console.log("walking right");
      isRight = true;
    } else if (keyCode == 65) {
      console.log("walking left");
      isLeft = true;
    } else if (keyCode == 87) {
      console.log("jumping");
      if (!isJumping && !isPlummeting) {
        isJumping = true;
        gameChar_yvelocity = jumpStrength;
      }
    } else if (keyCode == 27) {
      //escape
      console.log("triggered");
      gameState = "PAUSE";
    }
  } else if (gameState == "PAUSE") {
    if (keyCode == 27) {
      gameState = "PLAY";
    }
  } else if (gameState == "GAME OVER" && keyCode == 32) {
    gameChar_x = 0;
    gameChar_y = ground.y;
    gameChar_yvelocity = 0;
    isJumping = false;
    isPlummeting = false;
    isLeft = false;
    isRight = false;
    gameState = "PLAY";
  }
  return false;
}

function keyReleased() {
  // if statements to control the animation of the character when
  // keys are released.

  console.log("keyReleased: " + key);
  console.log("keyReleased: " + keyCode);
  if (keyCode == 68) {
    console.log("stop walking right");
    isRight = false;
  } else if (keyCode == 65) {
    console.log("stop walking left");
    isLeft = false;
  }
}
