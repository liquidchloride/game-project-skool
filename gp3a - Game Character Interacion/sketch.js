/*

The Game Project

Week 3

Game interaction

*/


var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft;
var isRight;
var isPlummeting
var isFalling;

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
}

function draw()
{

	///////////DRAWING CODE//////////

	background(100,155,255); //fill the sky blue


	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

	//draw the canyon


	//the game character
	if(isLeft && isFalling)
	{
		// add your jumping-left code
	//head
    fill(237, 201, 175);
        ellipse(gameChar_x,gameChar_y-60,20,20);
    //legs
	fill(140, 120, 90);  
		quad(gameChar_x-8,gameChar_y-25,gameChar_x-3,gameChar_y-25,gameChar_x-8,gameChar_y,gameChar_x-13,gameChar_y);
		quad(gameChar_x+2,gameChar_y-25,gameChar_x+7,gameChar_y-25,gameChar_x+12,gameChar_y,gameChar_x+7,gameChar_y);
	//arms left
	fill(210,170,120);
		quad(gameChar_x-12,gameChar_y-42,gameChar_x-7,gameChar_y-42,gameChar_x-17,gameChar_y-57,gameChar_x-22,gameChar_y-57,);
	//shoulders left
	fill(137, 112, 255);
	    ellipse(gameChar_x-9,gameChar_y-42,7,7);
	//torso
	fill(180, 120, 60);
	    rect(gameChar_x-10,gameChar_y-50,20,30,10,10,90,90);
	
	//arms right
	fill(210, 170, 120);
		quad(gameChar_x+3,gameChar_y-45,gameChar_x+8,gameChar_y-45,gameChar_x+18,gameChar_y-63,gameChar_x+13,gameChar_y-63);
	
	//shoulder right
	fill(137,112,255)
		ellipse(gameChar_x+5,gameChar_y-45,7,7);
    //glasses	
	stroke(100);
	    line(gameChar_x+9,gameChar_y-61,gameChar_x-10,gameChar_y-61);
    fill(255,0,10)
	    ellipse(gameChar_x-8,gameChar_y-59,4,5);
	    ellipse(gameChar_x-2,gameChar_y-59,7,6);
    //hoverboard
    noStroke();
    fill(60);
        rect(gameChar_x-18, gameChar_y-2, 36, 6, 5);

   fill(0);
        ellipse(gameChar_x-10, gameChar_y+4, 6, 6);
        ellipse(gameChar_x+10, gameChar_y+4, 6, 6);

	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code

// head
fill(237, 201, 175);
    ellipse(gameChar_x, gameChar_y-60, 20, 20);

// legs
fill(140, 120, 90);
    quad(gameChar_x+8, gameChar_y-25, gameChar_x+3, gameChar_y-25, gameChar_x+8,  gameChar_y, gameChar_x+13, gameChar_y);
    quad(gameChar_x-2, gameChar_y-25, gameChar_x-7, gameChar_y-25, gameChar_x-12, gameChar_y, gameChar_x-7,  gameChar_y);

// arm right
fill(210, 170, 120);
    quad(gameChar_x+12, gameChar_y-42, gameChar_x+7, gameChar_y-42, gameChar_x+17, gameChar_y-57, gameChar_x+22, gameChar_y-57);

// shoulder right
fill(137, 112, 255);
    ellipse(gameChar_x+9, gameChar_y-42, 7, 7);

// torso
fill(180,120,60);
    rect(gameChar_x-10, gameChar_y-50, 20, 30, 10, 10, 90, 90);

// arm left
fill(210,170,120);
    quad(gameChar_x-3, gameChar_y-45, gameChar_x-8, gameChar_y-45, gameChar_x-18, gameChar_y-63, gameChar_x-13, gameChar_y-63);

// shoulder left
fill(137, 112, 255);
    ellipse(gameChar_x-5, gameChar_y-45, 7, 7);

// glasses
stroke(100);
    line(gameChar_x-9, gameChar_y-61, gameChar_x+10, gameChar_y-61);
fill(255, 0, 10);
    ellipse(gameChar_x+8, gameChar_y-59, 4, 5);
    ellipse(gameChar_x+2, gameChar_y-59, 7, 6);
//hoverboard
    noStroke();
    fill(60);
        rect(gameChar_x-18, gameChar_y-2, 36, 6, 5);

   fill(0);
        ellipse(gameChar_x-10, gameChar_y+4, 6, 6);
        ellipse(gameChar_x+10, gameChar_y+4, 6, 6);

	}
	else if(isLeft)
	{
		// add your walking left code
       fill(237, 201, 175);
        ellipse(gameChar_x,gameChar_y-60,20,20);
    //legs
	fill(140, 120, 90);  
		quad(gameChar_x-8,gameChar_y-25,gameChar_x-3,gameChar_y-25,gameChar_x-8,gameChar_y,gameChar_x-13,gameChar_y);
		quad(gameChar_x+2,gameChar_y-25,gameChar_x+7,gameChar_y-25,gameChar_x+12,gameChar_y,gameChar_x+7,gameChar_y);
	//arms left
	fill(210, 170, 120);
		quad(gameChar_x-12,gameChar_y-42,gameChar_x-7,gameChar_y-42,gameChar_x-17,gameChar_y-27,gameChar_x-22,gameChar_y-27,);
	//shoulders left
	fill(137, 112, 255);
	    ellipse(gameChar_x-9,gameChar_y-42,7,7);
	//torso
	fill(180, 120, 60);
	    rect(gameChar_x-10,gameChar_y-50,20,30,10,10,90,90);
	
	//arms right
	fill(210, 170, 120);
		quad(gameChar_x+3,gameChar_y-45,gameChar_x+8,gameChar_y-45,gameChar_x+18,gameChar_y-27,gameChar_x+13,gameChar_y-27);
	
	//shoulder right
	fill(137,112,255)
		ellipse(gameChar_x+5,gameChar_y-45,7,7);
    //glasses	
	stroke(100);
	    line(gameChar_x+9,gameChar_y-61,gameChar_x-10,gameChar_y-61);
    fill(255,0,10)
	    ellipse(gameChar_x-8,gameChar_y-59,4,5);
	    ellipse(gameChar_x-2,gameChar_y-59,7,6);
    //hoverboard
    noStroke();
    fill(60);
        rect(gameChar_x-18, gameChar_y-2, 36, 6, 5);

   fill(0);
        ellipse(gameChar_x-10, gameChar_y+4, 6, 6);
        ellipse(gameChar_x+10, gameChar_y+4, 6, 6);
	}
	else if(isRight)
	{
		// add your walking right code
		fill(237, 201, 175);
    ellipse(gameChar_x, gameChar_y-60, 20, 20);

// legs
fill(140, 120, 90);
    quad(gameChar_x+8, gameChar_y-25, gameChar_x+3, gameChar_y-25, gameChar_x+8,  gameChar_y, gameChar_x+13, gameChar_y);
    quad(gameChar_x-2, gameChar_y-25, gameChar_x-7, gameChar_y-25, gameChar_x-12, gameChar_y, gameChar_x-7,  gameChar_y);

// arm right
fill(210,170,120);
    quad(gameChar_x+12, gameChar_y-42, gameChar_x+7, gameChar_y-42, gameChar_x+17, gameChar_y-27, gameChar_x+22, gameChar_y-27);

// shoulder right
fill(137, 112, 255);
    ellipse(gameChar_x+9, gameChar_y-42, 7, 7);

// torso
fill(180,120,60);
    rect(gameChar_x-10, gameChar_y-50, 20, 30, 10, 10, 90, 90);

// arm left
fill(210,170,120);
    quad(gameChar_x-3, gameChar_y-45, gameChar_x-8, gameChar_y-45, gameChar_x-18, gameChar_y-27, gameChar_x-13, gameChar_y-27);

// shoulder left
fill(137, 112, 255);
    ellipse(gameChar_x-5, gameChar_y-45, 7, 7);

// glasses
stroke(100);
    line(gameChar_x-9, gameChar_y-61, gameChar_x+10, gameChar_y-61);
fill(255, 0, 10);
    ellipse(gameChar_x+8, gameChar_y-59, 4, 5);
    ellipse(gameChar_x+2, gameChar_y-59, 7, 6);
//hoverboard
    noStroke();
    fill(60);
        rect(gameChar_x-18, gameChar_y-2, 36, 6, 5);

   fill(0);
        ellipse(gameChar_x-10, gameChar_y+4, 6, 6);
        ellipse(gameChar_x+10, gameChar_y+4, 6, 6);

	}
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code
        fill(237, 201, 175);
        ellipse(gameChar_x,gameChar_y-60,20,20);
    //legs
	fill(140, 120, 90);
	    rect(gameChar_x-8,gameChar_y-25,7,25,10,10,10,10);
		rect(gameChar_x,gameChar_y-25,7,25,10)
	//torso
	fill(180,120,60);
	    rect(gameChar_x-10,gameChar_y-50,20,30,10,10,90,90);
	//arms
	fill(210,170,120);
		rect(gameChar_x-15,gameChar_y-62,5,20,90);
		rect(gameChar_x+10,gameChar_y-62,5,20,90);
	//shoulders
	fill(137, 112, 255);
	    ellipse(gameChar_x-12,gameChar_y-42,7,7);
		ellipse(gameChar_x+12,gameChar_y-42,7,7);
    //glasses	
	stroke(100);
	    line(gameChar_x+9,gameChar_y-61,gameChar_x-10,gameChar_y-61);
    fill(255,0,10)
	    ellipse(gameChar_x-4,gameChar_y-59,7,5);
	    ellipse(gameChar_x+4,gameChar_y-59,7,5);
    //hoverboard
    noStroke();
    fill(60);
        rect(gameChar_x-18, gameChar_y-2, 36, 6, 5);
	}
	else
	{
		// add your standing front facing code
         //head
	fill(237, 201, 175);
        ellipse(gameChar_x,gameChar_y-60,20,20);
    //legs
	fill(140, 120, 90);
	    rect(gameChar_x-8,gameChar_y-25,7,25,10,10,10,10);
		rect(gameChar_x,gameChar_y-25,7,25,10)
	//torso
	fill(180, 120, 60);
	    rect(gameChar_x-10,gameChar_y-50,20,30,10,10,90,90);
	//arms
	fill(210, 170, 120);
		rect(gameChar_x-15,gameChar_y-42,5,20,0,0,90,90);
		rect(gameChar_x+10,gameChar_y-42,5,20,0,0,90,90);
	//shoulders
	fill(137, 112, 255);
	    ellipse(gameChar_x-12,gameChar_y-42,7,7);
		ellipse(gameChar_x+12,gameChar_y-42,7,7);
    //glasses	
	stroke(100);
	    line(gameChar_x+9,gameChar_y-61,gameChar_x-10,gameChar_y-61);
    fill(255,0,10)
	    ellipse(gameChar_x-4,gameChar_y-59,7,5);
	    ellipse(gameChar_x+4,gameChar_y-59,7,5);
	//hoverboard
    noStroke();
    fill(60);
        rect(gameChar_x-18, gameChar_y-2, 36, 6, 5);

   fill(0);
        ellipse(gameChar_x-10, gameChar_y+4, 6, 6);
        ellipse(gameChar_x+10, gameChar_y+4, 6, 6);
	}

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
	if(isRight==true)
	{
		gameChar_x+=3
	}
	else if(isLeft==true)
	{
		gameChar_x-=3
	}

}


function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.

	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);
	if (keyCode ==68)
	{
        console.log("walking right")
	    isRight = true;
        

	}
	else if(keyCode==65)
	{
		console.log("walking left")
		isLeft = true;
	}
}

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.

	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);
	if(keyCode==68)
	{
		console.log("stop walking right")
		isRight = false;
	}
	else if(keyCode==65)
	{
		console.log("stop walking left")
		isLeft = false;
	}
}
