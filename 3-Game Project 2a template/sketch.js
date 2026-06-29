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

var gameChar_x = 0;
var gameChar_y = 0;

function setup() {
  createCanvas(400, 600);
}

function draw() {
  background(255);

  //Standing, facing frontwards

  stroke(100);
  noFill();
  rect(20, 60, 50, 80);
  noStroke();
  fill(0);
  text("1. standing front facing", 20, 160);

  gameChar_x = 45;
  gameChar_y = 137;
  //Add your code here ...
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
  fill(137, 112, 255);
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

  //Jumping facing forwards
  stroke(100);
  noFill();
  rect(220, 60, 50, 80);
  noStroke();
  fill(0);
  text("2. jumping facing forwards", 220, 160);

  gameChar_x = 245;
  gameChar_y = 137;
  //Add your code here ...
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
  rect(gameChar_x - 15, gameChar_y - 62, 5, 20, 90);
  rect(gameChar_x + 10, gameChar_y - 62, 5, 20, 90);
  //shoulders
  fill(137, 112, 255);
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
  //Walking, turned left
  stroke(100);
  noFill();
  rect(20, 260, 50, 80);
  noStroke();
  fill(0);
  text("3. Walking left", 20, 360);

  gameChar_x = 45;
  gameChar_y = 337;
  //Add your code here ...
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
  fill(137, 112, 255);
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
  fill(137, 112, 255);
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
  //Walking, turned right
  stroke(100);
  noFill();
  rect(220, 260, 50, 80);
  noStroke();
  fill(0);
  text("4. Walking right", 220, 360);

  gameChar_x = 245;
  gameChar_y = 337;
  //Add your code here ...
  // head
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
  fill(137, 112, 255);
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
  fill(137, 112, 255);
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

  //Jumping right
  stroke(100);
  noFill();
  rect(20, 460, 50, 80);
  noStroke();
  fill(0);
  text("5. Jumping to the right", 20, 560);
  gameChar_x = 45;
  gameChar_y = 537;
  //Add your code here ...
  // head
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
  fill(137, 112, 255);
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
  fill(137, 112, 255);
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
  //Jumping to the left
  stroke(100);
  noFill();
  rect(220, 460, 50, 80);
  noStroke();
  fill(0);
  text("6. Jumping to the left", 220, 560);

  gameChar_x = 245;
  gameChar_y = 537;
  //Add your code here ...
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
  fill(137, 112, 255);
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
  fill(137, 112, 255);
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
  push();
  fill(0);
  noStroke();
  text(mouseX + "," + mouseY, mouseX, mouseY);
  pop();
}
