/*

The Game Project

2 - Game character

Use p5 drawing functions such as rect, ellipse, line, triangle and
point to draw the different states of your game character.

Write the code so that your character appears inside the box for each
state.

IMPORTANT: For each box the variables gameChar_x & gameChar_y are set to the bottom
center of the box. You must combine these variables with arithmetic to
determine the position of each shape that you draw. This will later allow
you to adjust the position of your game character.

Each state is worth two marks:

//standing front facing = 2
//jumping facing forwards = 2
//walking left = 2
//walking right = 2
//jumping left and jumping right = 2

0 marks = not a reasonable attempt
1 mark = attempted but it lacks detail and you didn't use gameChar_x and gameChar_y correctly
2 marks = you've used a selction of shape functions and made consistent use of gameChar_x and gameChar_y

WARNING: Do not get too carried away. If you're character takes more than 5 lines
of code to draw then you've probably over done it.

** Only submit your sketch.js **

*/
var endGoal;
var gameChar_x = 0;
var gameChar_y = 0;
var worldHeight;
var worldWidth;

function setup() {
  worldHeight = 1000;
  worldWidth = 1000;
  createCanvas(worldWidth, worldHeight);

  endGoal = {
    x: worldWidth - 300,
    y: 700,
    isReached: false,
  };
}

function draw() {
  background(135, 175, 195);

  fill(237, 201, 138);
  rect(0, 700, worldWidth, 300);

  drawEndGoal();
  //Standing, facing frontwards

  // stroke(100);
  // noFill();
  // rect(20, 60, 50, 80);
  // noStroke();
  // fill(0);
  // text("1. standing front facing", 20, 160);

  // gameChar_x = 45;
  // gameChar_y = 137;
  // //Add your code here ...
  // //head
  // fill(237, 201, 175);
  // ellipse(gameChar_x, gameChar_y - 60, 20, 20);
  // //legs
  // fill(140, 120, 90);
  // rect(gameChar_x - 8, gameChar_y - 25, 7, 25, 10, 10, 10, 10);
  // rect(gameChar_x, gameChar_y - 25, 7, 25, 10);
  // //torso
  // fill(180, 120, 60);
  // rect(gameChar_x - 10, gameChar_y - 50, 20, 30, 10, 10, 90, 90);
  // //arms
  // fill(210, 170, 120);
  // rect(gameChar_x - 15, gameChar_y - 42, 5, 20, 0, 0, 90, 90);
  // rect(gameChar_x + 10, gameChar_y - 42, 5, 20, 0, 0, 90, 90);
  // //shoulders
  // fill(137, 112, 255);
  // ellipse(gameChar_x - 12, gameChar_y - 42, 7, 7);
  // ellipse(gameChar_x + 12, gameChar_y - 42, 7, 7);
  // //glasses
  // stroke(100);
  // line(gameChar_x + 9, gameChar_y - 61, gameChar_x - 10, gameChar_y - 61);
  // fill(255, 0, 10);
  // ellipse(gameChar_x - 4, gameChar_y - 59, 7, 5);
  // ellipse(gameChar_x + 4, gameChar_y - 59, 7, 5);
  // //hoverboard
  // noStroke();
  // fill(60);
  // rect(gameChar_x - 18, gameChar_y - 2, 36, 6, 5);

  // fill(0);
  // ellipse(gameChar_x - 10, gameChar_y + 4, 6, 6);
  // ellipse(gameChar_x + 10, gameChar_y + 4, 6, 6);

  // //Jumping facing forwards
  // stroke(100);
  // noFill();
  // rect(220, 60, 50, 80);
  // noStroke();
  // fill(0);
  // text("2. jumping facing forwards", 220, 160);

  // gameChar_x = 245;
  // gameChar_y = 137;
  // //Add your code here ...
  // //head
  // fill(237, 201, 175);
  // ellipse(gameChar_x, gameChar_y - 60, 20, 20);
  // //legs
  // fill(140, 120, 90);
  // rect(gameChar_x - 8, gameChar_y - 25, 7, 25, 10, 10, 10, 10);
  // rect(gameChar_x, gameChar_y - 25, 7, 25, 10);
  // //torso
  // fill(180, 120, 60);
  // rect(gameChar_x - 10, gameChar_y - 50, 20, 30, 10, 10, 90, 90);
  // //arms
  // fill(210, 170, 120);
  // rect(gameChar_x - 15, gameChar_y - 62, 5, 20, 90);
  // rect(gameChar_x + 10, gameChar_y - 62, 5, 20, 90);
  // //shoulders
  // fill(137, 112, 255);
  // ellipse(gameChar_x - 12, gameChar_y - 42, 7, 7);
  // ellipse(gameChar_x + 12, gameChar_y - 42, 7, 7);
  // //glasses
  // stroke(100);
  // line(gameChar_x + 9, gameChar_y - 61, gameChar_x - 10, gameChar_y - 61);
  // fill(255, 0, 10);
  // ellipse(gameChar_x - 4, gameChar_y - 59, 7, 5);
  // ellipse(gameChar_x + 4, gameChar_y - 59, 7, 5);
  // //hoverboard
  // noStroke();
  // fill(60);
  // rect(gameChar_x - 18, gameChar_y - 2, 36, 6, 5);

  // fill(0);
  // ellipse(gameChar_x - 10, gameChar_y + 4, 6, 6);
  // ellipse(gameChar_x + 10, gameChar_y + 4, 6, 6);
  // //Walking, turned left
  // stroke(100);
  // noFill();
  // rect(20, 260, 50, 80);
  // noStroke();
  // fill(0);
  // text("3. Walking left", 20, 360);

  // gameChar_x = 45;
  // gameChar_y = 337;
  // //Add your code here ...
  // //head
  // fill(237, 201, 175);
  // ellipse(gameChar_x, gameChar_y - 60, 20, 20);
  // //legs
  // fill(140, 120, 90);
  // quad(
  //   gameChar_x - 8,
  //   gameChar_y - 25,
  //   gameChar_x - 3,
  //   gameChar_y - 25,
  //   gameChar_x - 8,
  //   gameChar_y,
  //   gameChar_x - 13,
  //   gameChar_y,
  // );
  // quad(
  //   gameChar_x + 2,
  //   gameChar_y - 25,
  //   gameChar_x + 7,
  //   gameChar_y - 25,
  //   gameChar_x + 12,
  //   gameChar_y,
  //   gameChar_x + 7,
  //   gameChar_y,
  // );
  // //arms left
  // fill(210, 170, 120);
  // quad(
  //   gameChar_x - 12,
  //   gameChar_y - 42,
  //   gameChar_x - 7,
  //   gameChar_y - 42,
  //   gameChar_x - 17,
  //   gameChar_y - 27,
  //   gameChar_x - 22,
  //   gameChar_y - 27,
  // );
  // //shoulders left
  // fill(137, 112, 255);
  // ellipse(gameChar_x - 9, gameChar_y - 42, 7, 7);
  // //torso
  // fill(180, 120, 60);
  // rect(gameChar_x - 10, gameChar_y - 50, 20, 30, 10, 10, 90, 90);

  // //arms right
  // fill(210, 170, 120);
  // quad(
  //   gameChar_x + 3,
  //   gameChar_y - 45,
  //   gameChar_x + 8,
  //   gameChar_y - 45,
  //   gameChar_x + 18,
  //   gameChar_y - 27,
  //   gameChar_x + 13,
  //   gameChar_y - 27,
  // );

  // //shoulder right
  // fill(137, 112, 255);
  // ellipse(gameChar_x + 5, gameChar_y - 45, 7, 7);
  // //glasses
  // stroke(100);
  // line(gameChar_x + 9, gameChar_y - 61, gameChar_x - 10, gameChar_y - 61);
  // fill(255, 0, 10);
  // ellipse(gameChar_x - 8, gameChar_y - 59, 4, 5);
  // ellipse(gameChar_x - 2, gameChar_y - 59, 7, 6);
  // //hoverboard
  // noStroke();
  // fill(60);
  // rect(gameChar_x - 18, gameChar_y - 2, 36, 6, 5);

  // fill(0);
  // ellipse(gameChar_x - 10, gameChar_y + 4, 6, 6);
  // ellipse(gameChar_x + 10, gameChar_y + 4, 6, 6);
  // //Walking, turned right
  // stroke(100);
  // noFill();
  // rect(220, 260, 50, 80);
  // noStroke();
  // fill(0);
  // text("4. Walking right", 220, 360);

  // gameChar_x = 245;
  // gameChar_y = 337;
  // //Add your code here ...
  // // head
  // fill(237, 201, 175);
  // ellipse(gameChar_x, gameChar_y - 60, 20, 20);

  // // legs
  // fill(140, 120, 90);
  // quad(
  //   gameChar_x + 8,
  //   gameChar_y - 25,
  //   gameChar_x + 3,
  //   gameChar_y - 25,
  //   gameChar_x + 8,
  //   gameChar_y,
  //   gameChar_x + 13,
  //   gameChar_y,
  // );
  // quad(
  //   gameChar_x - 2,
  //   gameChar_y - 25,
  //   gameChar_x - 7,
  //   gameChar_y - 25,
  //   gameChar_x - 12,
  //   gameChar_y,
  //   gameChar_x - 7,
  //   gameChar_y,
  // );

  // // arm right
  // fill(210, 170, 120);
  // quad(
  //   gameChar_x + 12,
  //   gameChar_y - 42,
  //   gameChar_x + 7,
  //   gameChar_y - 42,
  //   gameChar_x + 17,
  //   gameChar_y - 27,
  //   gameChar_x + 22,
  //   gameChar_y - 27,
  // );

  // // shoulder right
  // fill(137, 112, 255);
  // ellipse(gameChar_x + 9, gameChar_y - 42, 7, 7);

  // // torso
  // fill(180, 120, 60);
  // rect(gameChar_x - 10, gameChar_y - 50, 20, 30, 10, 10, 90, 90);

  // // arm left
  // fill(210, 170, 120);
  // quad(
  //   gameChar_x - 3,
  //   gameChar_y - 45,
  //   gameChar_x - 8,
  //   gameChar_y - 45,
  //   gameChar_x - 18,
  //   gameChar_y - 27,
  //   gameChar_x - 13,
  //   gameChar_y - 27,
  // );

  // // shoulder left
  // fill(137, 112, 255);
  // ellipse(gameChar_x - 5, gameChar_y - 45, 7, 7);

  // // glasses
  // stroke(100);
  // line(gameChar_x - 9, gameChar_y - 61, gameChar_x + 10, gameChar_y - 61);
  // fill(255, 0, 10);
  // ellipse(gameChar_x + 8, gameChar_y - 59, 4, 5);
  // ellipse(gameChar_x + 2, gameChar_y - 59, 7, 6);
  // //hoverboard
  // noStroke();
  // fill(60);
  // rect(gameChar_x - 18, gameChar_y - 2, 36, 6, 5);

  // fill(0);
  // ellipse(gameChar_x - 10, gameChar_y + 4, 6, 6);
  // ellipse(gameChar_x + 10, gameChar_y + 4, 6, 6);

  // //Jumping right
  // stroke(100);
  // noFill();
  // rect(20, 460, 50, 80);
  // noStroke();
  // fill(0);
  // text("5. Jumping to the right", 20, 560);
  // gameChar_x = 45;
  // gameChar_y = 537;
  // //Add your code here ...
  // // head
  // fill(237, 201, 175);
  // ellipse(gameChar_x, gameChar_y - 60, 20, 20);

  // // legs
  // fill(140, 120, 90);
  // quad(
  //   gameChar_x + 8,
  //   gameChar_y - 25,
  //   gameChar_x + 3,
  //   gameChar_y - 25,
  //   gameChar_x + 8,
  //   gameChar_y,
  //   gameChar_x + 13,
  //   gameChar_y,
  // );
  // quad(
  //   gameChar_x - 2,
  //   gameChar_y - 25,
  //   gameChar_x - 7,
  //   gameChar_y - 25,
  //   gameChar_x - 12,
  //   gameChar_y,
  //   gameChar_x - 7,
  //   gameChar_y,
  // );

  // // arm right
  // fill(210, 170, 120);
  // quad(
  //   gameChar_x + 12,
  //   gameChar_y - 42,
  //   gameChar_x + 7,
  //   gameChar_y - 42,
  //   gameChar_x + 17,
  //   gameChar_y - 57,
  //   gameChar_x + 22,
  //   gameChar_y - 57,
  // );

  // // shoulder right
  // fill(137, 112, 255);
  // ellipse(gameChar_x + 9, gameChar_y - 42, 7, 7);

  // // torso
  // fill(180, 120, 60);
  // rect(gameChar_x - 10, gameChar_y - 50, 20, 30, 10, 10, 90, 90);

  // // arm left
  // fill(210, 170, 120);
  // quad(
  //   gameChar_x - 3,
  //   gameChar_y - 45,
  //   gameChar_x - 8,
  //   gameChar_y - 45,
  //   gameChar_x - 18,
  //   gameChar_y - 63,
  //   gameChar_x - 13,
  //   gameChar_y - 63,
  // );

  // // shoulder left
  // fill(137, 112, 255);
  // ellipse(gameChar_x - 5, gameChar_y - 45, 7, 7);

  // // glasses
  // stroke(100);
  // line(gameChar_x - 9, gameChar_y - 61, gameChar_x + 10, gameChar_y - 61);
  // fill(255, 0, 10);
  // ellipse(gameChar_x + 8, gameChar_y - 59, 4, 5);
  // ellipse(gameChar_x + 2, gameChar_y - 59, 7, 6);
  // //hoverboard
  // noStroke();
  // fill(60);
  // rect(gameChar_x - 18, gameChar_y - 2, 36, 6, 5);

  // fill(0);
  // ellipse(gameChar_x - 10, gameChar_y + 4, 6, 6);
  // ellipse(gameChar_x + 10, gameChar_y + 4, 6, 6);
  // //Jumping to the left
  // stroke(100);
  // noFill();
  // rect(220, 460, 50, 80);
  // noStroke();
  // fill(0);
  // text("6. Jumping to the left", 220, 560);

  // gameChar_x = 245;
  // gameChar_y = 537;
  // //Add your code here ...
  // //head
  // fill(237, 201, 175);
  // ellipse(gameChar_x, gameChar_y - 60, 20, 20);
  // //legs
  // fill(140, 120, 90);
  // quad(
  //   gameChar_x - 8,
  //   gameChar_y - 25,
  //   gameChar_x - 3,
  //   gameChar_y - 25,
  //   gameChar_x - 8,
  //   gameChar_y,
  //   gameChar_x - 13,
  //   gameChar_y,
  // );
  // quad(
  //   gameChar_x + 2,
  //   gameChar_y - 25,
  //   gameChar_x + 7,
  //   gameChar_y - 25,
  //   gameChar_x + 12,
  //   gameChar_y,
  //   gameChar_x + 7,
  //   gameChar_y,
  // );
  // //arms left
  // fill(210, 170, 120);
  // quad(
  //   gameChar_x - 12,
  //   gameChar_y - 42,
  //   gameChar_x - 7,
  //   gameChar_y - 42,
  //   gameChar_x - 17,
  //   gameChar_y - 57,
  //   gameChar_x - 22,
  //   gameChar_y - 57,
  // );
  // //shoulders left
  // fill(137, 112, 255);
  // ellipse(gameChar_x - 9, gameChar_y - 42, 7, 7);
  // //torso
  // fill(180, 120, 60);
  // rect(gameChar_x - 10, gameChar_y - 50, 20, 30, 10, 10, 90, 90);

  // //arms right
  // fill(210, 170, 120);
  // quad(
  //   gameChar_x + 3,
  //   gameChar_y - 45,
  //   gameChar_x + 8,
  //   gameChar_y - 45,
  //   gameChar_x + 18,
  //   gameChar_y - 63,
  //   gameChar_x + 13,
  //   gameChar_y - 63,
  // );

  // //shoulder right
  // fill(137, 112, 255);
  // ellipse(gameChar_x + 5, gameChar_y - 45, 7, 7);
  // //glasses
  // stroke(100);
  // line(gameChar_x + 9, gameChar_y - 61, gameChar_x - 10, gameChar_y - 61);
  // fill(255, 0, 10);
  // ellipse(gameChar_x - 8, gameChar_y - 59, 4, 5);
  // ellipse(gameChar_x - 2, gameChar_y - 59, 7, 6);
  // //hoverboard
  // noStroke();
  // fill(60);
  // rect(gameChar_x - 18, gameChar_y - 2, 36, 6, 5);

  // fill(0);
  // ellipse(gameChar_x - 10, gameChar_y + 4, 6, 6);
  // ellipse(gameChar_x + 10, gameChar_y + 4, 6, 6);
  // push();
  // fill(0);
  // noStroke();
  // text(mouseX + "," + mouseY, mouseX, mouseY);
  // pop();
}
function drawEndGoal() {
  // tent body
  fill(190, 150, 95);
  noStroke();
  triangle(
    endGoal.x - 70,
    endGoal.y,
    endGoal.x,
    endGoal.y - 90,
    endGoal.x + 70,
    endGoal.y,
  );

  // tent opening
  fill(90, 60, 35);
  triangle(
    endGoal.x - 25,
    endGoal.y,
    endGoal.x,
    endGoal.y - 75,
    endGoal.x + 25,
    endGoal.y,
  );

  // tent flap line
  stroke(140, 100, 65);
  line(endGoal.x, endGoal.y - 90, endGoal.x, endGoal.y);

  //====================EMPTY WATER TANK====================

  //tank stand
  fill(110, 75, 40);
  noStroke();

  //top support
  rect(endGoal.x + 102, endGoal.y - 30, 41, 6);

  //left leg
  rect(endGoal.x + 106, endGoal.y - 24, 5, 24);

  //right leg
  rect(endGoal.x + 134, endGoal.y - 24, 5, 24);

  //tank body
  fill(120, 145, 150);
  rect(endGoal.x + 105, endGoal.y - 80, 35, 50, 5);

  //tank top
  fill(100, 125, 130);
  ellipse(endGoal.x + 122.5, endGoal.y - 80, 35, 10);

  //empty label
  fill(50);
  textSize(9);
  textAlign(CENTER, CENTER);
  text("EMPTY", endGoal.x + 122.5, endGoal.y - 55);
  //====================CARGO BOXES====================

  //bottom cargo box
  fill(145, 100, 55);
  stroke(95, 65, 35);
  strokeWeight(2);

  rect(endGoal.x - 125, endGoal.y - 30, 45, 30);

  //wooden cross
  line(endGoal.x - 125, endGoal.y - 30, endGoal.x - 80, endGoal.y);

  line(endGoal.x - 80, endGoal.y - 30, endGoal.x - 125, endGoal.y);

  //top cargo box
  fill(155, 110, 60);

  rect(endGoal.x - 120, endGoal.y - 58, 40, 28);

  //wooden cross
  line(endGoal.x - 120, endGoal.y - 58, endGoal.x - 80, endGoal.y - 30);

  line(endGoal.x - 80, endGoal.y - 58, endGoal.x - 120, endGoal.y - 30);
  //====================RADIO====================

  fill(65);
  rect(endGoal.x + 56, endGoal.y - 55, 25, 17, 2);

  //speaker
  fill(35);
  ellipse(endGoal.x + 63, endGoal.y - 46, 9, 9);

  //radio dial
  fill(180);
  ellipse(endGoal.x + 75, endGoal.y - 46, 4, 4);

  //antenna
  stroke(50);
  strokeWeight(2);
  line(endGoal.x + 78, endGoal.y - 55, endGoal.x + 84, endGoal.y - 70);
  //====================TABLE====================

  noStroke();
  fill(115, 75, 40);

  //table top
  rect(endGoal.x + 45, endGoal.y - 38, 45, 6);

  //table legs
  rect(endGoal.x + 50, endGoal.y - 32, 5, 32);

  rect(endGoal.x + 80, endGoal.y - 32, 5, 32);
}
