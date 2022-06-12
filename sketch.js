let width = 1000;
let height = 600;

let stage = 0;

let img_opening;
let img_gamelist;

/* images for game 1 */
let img_game1;
let img_game1_finished;
let img_game1_info;
let img_game1_success;
let img_game1_back;

/* images for game 2 */
let img_game2;
let img_game2_finished;
let img_game2_info;
let img_game2_success;
let img_game2_back;
let img_onon;
let img_onoff;
let img_offon;
let img_offoff;
let img_prof_back;
let img_mic_on;
let img_mic_off;
let img_cam_on;
let img_cam_off;

/* images for game 3 */
let img_game3;
let img_game3_finished;
let img_game3_info;
let game_list = [];
let img_glasses;

let clickSound;
let successSound;

let cam;
let ps = 1;
let CAM_IMAGE_HEIGHT = 392;
let CAM_IMAGE_WIDTH = 621;
let poseNet;
let poses = [];

function setup() {
  createCanvas(width, height);
  img_game1.resize(289, 152);
  img_game1_finished.resize(289, 152);
  img_game2.resize(289, 152);
  img_game2_finished.resize(289, 152);
  img_game3.resize(289, 152);
  img_game3_finished.resize(289, 152);
  img_glasses.resize(100, 40);
  cam = createCapture(VIDEO);
  poseNet = ml5.poseNet(cam, modelReady);
  poseNet.on('pose', function(results) {
    poses = results;
  });
  cam.hide();
  pixelDensity(1);
  let game1 = new Game1(img_game1, img_game1_finished, img_game1_back, img_game1_info, img_game1_success);
  let game2 = new Game2(img_game2, img_game2_finished, img_game2_back, img_game2_info, img_game2_success);
  let game3 = new Game3(img_game3, img_game3_finished, img_game1_back, img_game1_info, img_game1_success);
  game_list.push(game1);
  game_list.push(game2);
  game_list.push(game3);
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function preload() {
  soundFormats('wav', 'mp3');
  clickSound = loadSound('sound/click');
  successSound = loadSound('sound/success');

  img_onon = loadImage("./image/onon.png");
  img_onoff = loadImage("./image/onoff.png");
  img_offon = loadImage("./image/offon.png");
  img_offoff = loadImage("./image/offoff.png");
  img_prof_back = loadImage("./image/prof_back.png");

  img_opening = loadImage("./image/opening.png");
  img_gamelist = loadImage("./image/gamelist.png");
  
  img_game1 = loadImage("./image/game1.png");
  img_game1_finished = loadImage("./image/game1_finished.png");
  img_game1_info = loadImage("./image/game1_info.png");
  img_game1_success = loadImage("./image/game1_success.png");
  img_game1_back = loadImage("./image/game1_back.png");
  img_glasses = loadImage("./image/glasses.png");

  img_game2 = loadImage("./image/game2.png");
  img_game2_finished = loadImage("./image/game2_finished.png");
  img_game2_info = loadImage("./image/game2_info.png");
  img_game2_success = loadImage("./image/game2_success.png");
  img_game2_back = loadImage("./image/game2_back.png");
  img_mic_on = loadImage("./image/mic_on.png");
  img_mic_off = loadImage("./image/mic_off.png");
  img_cam_on = loadImage("./image/cam_on.png");
  img_cam_off = loadImage("./image/cam_off.png");

  img_game3 = loadImage("./image/game3.png");
  img_game3_finished = loadImage("./image/game3_finished.png");
}


function draw() {
  switch (stage) {
    case 0 : 
      opening();
      break;
    case 1: 
      gamelist();
      break;
    case 2 : 
      game_list[0].runGame(mouseX, mouseY);
      break;
    case 3 : 
      game_list[1].runGame(mouseX, mouseY);
      break;
    case 4 : 
      game_list[2].runGame(mouseX, mouseY);
      break;
  }
}

function opening() {
  background(225);
  image(img_opening, 0, 0);
  if (355 < mouseX && mouseX < 645 && 469 < mouseY && mouseY < 546) {
    push();
    rectMode(CORNER);
    translate(0, 0);
    fill(`rgba(255, 255, 255, 0.2)`);
    noStroke();
    rect(355, 469, 290, 77, 10);
    pop();
  }

}

function gamelist() {
  background(225);
  image(img_gamelist, 0, 0);
  textSize(20);
  fill(153);
  let c_day = day();
  let c_month = month();
  let c_year = year();
  text(c_year + "년 " + c_month + "월 " + c_day + "일", 40, 140);
  for (let i = 0; i < game_list.length; i++) {
    game_list[i].getButton().show(mouseX, mouseY);
  }
}

function mousePressed() {
  switch (stage) {
    case 0 :
      opening_pressed();
      break;
    case 1 : 
      gamelist_pressed();
      break;
    case 2:
      game_list[0].mousePressed(mouseX, mouseY);
      break;
    case 3:
      game_list[1].mousePressed(mouseX, mouseY);
      break;
    case 4:
      game_list[2].mousePressed(mouseX, mouseY);
      break;
    default: 
      stage = 1;
      break;
  }
}

function opening_pressed() {
  if (355 < mouseX && mouseX < 645 && 469 < mouseY && mouseY < 546) { 
    clickSound.play();
    stage = 1;
  }
}

function gamelist_pressed() {
  for (let i = 0; i < game_list.length; i++) {
    /* refresh games */
    game_list[i].setReady(false);
    if (game_list[i].getButton().isOver(mouseX, mouseY)) {
      clickSound.play();
      stage = i + 2;
    }
  }
}

