/*

The Game Project

1 - Background Scenery

Use p5 drawing functions such as rect, ellipse, line, triangle and
point to draw the scenery as set out in the code comments. The items
should appear next to the text titles.

Each bit of scenery is worth two marks:

0 marks = not a reasonable attempt
1 mark = attempted but it's messy or lacks detail
2 marks = you've used several shape functions to create the scenery

I've given titles and chosen some base colours, but feel free to
imaginatively modify these and interpret the scenery titles loosely to
match your game theme.

WARNING: Do not get too carried away. If you're shape takes more than 15 lines of code to draw then you've probably over done it.


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
var waterbottle;
var mountainrange;
function setup() {
  createCanvas(windowWidth, windowHeight);
  cloud = {
    pos1: {
      x: -200 - random(0, 600),
      y: random(10, 250),
      scale: random(0.5, 1),
    },
  };
  cloudArray = [];
  for (let i = 0; i < 6; i++) {
    cloud = {
      pos: {
        X: -200 - random(0, 600),
        Y: random(10, 250),
        scale: random(0.5, 1),
      },
      speed: random(1, 4),
      colour: random(150, 255),
    };
    cloudArray.push(cloud);
  }

  console.log(cloudArray);
  mountainrange = [];
  for (let i = 0; i < 7; i++) {
    mountainrange.push(i * 1200);
  }
  stumpStart = [];
  for (let i = 0; i < 9; i++) {
    stumpStart.push(i * 800);
  }
  ground = {
    y: (windowHeight * 6) / 8,
    centre: windowWidth / 2,
  };
  gameChar_x = ground.centre;
  gameChar_y = ground.y;
  gameChar_yvelocity = 0;
  gravity = 0.2;
  jumpStrength = -5;
  waterbottle = {
    X: 1000,
    Y: (windowHeight * 6) / 8 - 30,
    is_found: false,
  };
}

function draw() {
  background(250, 206, 152);
  worldHeight = 1000;
  worldWidth = 8000;
  noStroke();
  //SUN
  push();
  fill(255, 60, 0);
  ellipse(ground.centre, ground.y, ground.centre, ground.centre);
  fill(255, 60, 0, 100);
  ellipse(ground.centre, ground.y, ground.centre + 100, ground.centre + 100);
  fill(255, 60, 0, 50);
  ellipse(ground.centre, ground.y, ground.centre + 200, ground.centre + 200);
  rect(ground.centre - ground.centre);
  pop();
  //Desert Ground
  fill(237, 201, 138);
  rect(0, ground.y, windowWidth, (windowHeight * 2) / 8); //draw some green ground

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

  //... add your code here

  // //5. a collectable token - eg. a jewel, fruit, coins
  if (dist(gameChar_x, gameChar_y - 40, waterbottle.x, waterbottle.y) < 20) {
    console.log("triggered");
    waterbottle.is_found = true;
  }
  if (waterbottle.is_found == false) {
    fill(0, 200, 255);
    rect(waterbottle.x, waterbottle.y, 10, 20, 90, 90, 10, 10);
    fill(255);
    rect(waterbottle.x + 2.5, waterbottle.y - 5, 5, 5, 0, 0, 50, 50);
    rect(waterbottle.x, waterbottle.y + 5, 10, 5);
  }
  if (waterbottle.is_found == true) {
    fill(0);
    textSize(30);
    push();
    text("1/10 waterbottles found!", 20, 30);
    pop();
  }
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
  } else if (isLeft) {
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
  } else if (isRight) {
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
  if (isJumping) {
    gameChar_y += gameChar_yvelocity;
    gameChar_yvelocity += gravity; // gravity accelerates the fall

    if (gameChar_y >= ground.y) {
      gameChar_y = ground.y; // land exactly on the ground
      isJumping = false;
      gameChar_yvelocity = 0;
    }
  }
  push();
  fill(0);
  noStroke();
  text(mouseX + "," + mouseY, mouseX, mouseY);
  pop();

  if (isRight == true) {
    gameChar_x += 5;
  } else if (isLeft == true) {
    gameChar_x -= 5;
  }
}
function keyPressed() {
  // if statements to control the animation of the character when
  // keys are pressed.

  //open up the console to see how these work
  console.log("keyPressed: " + key);
  console.log("keyPressed: " + keyCode);
  if (keyCode == 68) {
    console.log("walking right");
    isRight = true;
  } else if (keyCode == 65) {
    console.log("walking left");
    isLeft = true;
  } else if (keyCode == 87) {
    console.log("jumping");
    if (!isJumping) {
      isJumping = true;
      gameChar_yvelocity = jumpStrength;
    }
  }
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
