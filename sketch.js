let width = 1000;
let height = 600;

let stage = 0;

let img_game1_back;

let img_opening;
let img_gamelist;

let img_game1;
let img_game1_finished;
let img_game1_info;
let img_game1_success;

let img_game2;
let img_game2_finished;
let img_game2_info;
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
  let game2 = new Game2(img_game2, img_game2_finished, img_game1_back, img_game1_info, img_game1_success);
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

  img_game1_back = loadImage("./image/game1_back.png");

  img_opening = loadImage("./image/opening.png");
  img_gamelist = loadImage("./image/gamelist.png");
  img_game1 = loadImage("./image/game1.png");
  img_game1_finished = loadImage("./image/game1_finished.png");
  img_game1_info = loadImage("./image/game1_info.png");
  img_game1_success = loadImage("./image/game1_success.png");
  img_glasses = loadImage("./image/glasses.png");

  img_game2 = loadImage("./image/game2.png");
  img_game2_finished = loadImage("./image/game2_finished.png");

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
      if (355 < mouseX && mouseX < 645 && 469 < mouseY && mouseY < 546) { 
        clickSound.play();
        stage = 1;
      }
      break;
    case 1 : 
      for (let i = 0; i < game_list.length; i++) {
        game_list[i].setReady(false);
      }
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

function gamelist_pressed() {
    for (let i = 0; i < game_list.length; i++) {
    if (game_list[i].getButton().isOver(mouseX, mouseY)) {
      clickSound.play();
      stage = i + 2;
    }
  }
}

// function game_1() {
//   image(img_game1_back, 0, 0);
//   cam.loadPixels();
//   rectMode(CENTER);
//   for (let y = 100; y < CAM_IMAGE_HEIGHT; y += ps) {
//     for (let x = 0; x < CAM_IMAGE_WIDTH; x += ps) {
//       let index = (y * cam.width + cam.width - x) * 4;
//       let r = cam.pixels[index + 0];
//       let g = cam.pixels[index + 1];
//       let b = cam.pixels[index + 2];
//       fill(r, g, b);
//       noStroke();
//       rect(62 + x, 100 + y, ps, ps);
//     }
//   }

//   modal1.setVisible(!ready);
//   modal1.show(mouseX, mouseY);

//   if (game1_score >= 5) {
//     gameButtonList[0].setFinished(true);
//     let successModal = new GameModal(img_game1_success, "돌아가기");
//     successModal.show(mouseX, mouseY);
//   } else if (ready) {
//       if (second() % 10 == 0 && debounce) {
//         debounce = false;
//         let success = true;
//         for (let i = 0; i < eyes.length; i++) {
//           if (!(glasses_x < eyes[i][0] && eyes[i][0] < glasses_x + 100 &&
//             glasses_y < eyes[i][1] && eyes[i][1] < glasses_y + 40)) {
//             success = false;
//           }
//         }
//         if (success) {
//           successSound.play();
//           game1_score += 1;
//         }
//         glasses_x = random(62, 62 + CAM_IMAGE_WIDTH - 100);
//         glasses_y = random(200, 200 + CAM_IMAGE_HEIGHT - 140);
//       } else if (second() % 10 != 0) {
//         debounce = true;
//       }
  
//       textSize(30);
//       fill(0, 114, 230);
//       text(10 - second() % 10, 825, 175);
//       text(game1_score, 910, 325);
  
//       if (glasses_x && glasses_y) {
//         image(img_glasses, glasses_x, glasses_y);
//       } else {
//         fill(255);
//         rect(355, 343, 143, 30, 10);
//         fill(0, 114, 230);
//         textSize(20);
//         text(10 - second() % 10 + "초 기다리기!", 300, 350);
//       }
//       drawKeypoints();
//     }
// }

// function game1_pressed() {
//   if (game1_score < 5 && modal1.isButtonOver(mouseX, mouseY)) {
//     clickSound.play();
//     ready = true;
//     modal1.setVisible(!ready);
//   } else if (900 < mouseX && mouseX < 1000 && 500 < mouseY && mouseY < 600) {
//     clickSound.play();
//     game1_score = 0;
//     stage = 1;
//   } else if (game1_score >= 5) {
//     clickSound.play();
//     game1_score = 0;
//     stage = 1;
//   }
// }

// function drawKeypoints()  {  
//   eyes = [];
//     // Loop through all the poses detected
//   for (let i = 0; i < poses.length; i++) {
//     // For each pose detected, loop through all the keypoints
//     let pose = poses[i].pose;
//     for (let j = 0; j < pose.keypoints.length; j++) {
//       // A keypoint is an object describing a body part (like rightArm or leftShoulder)
//       let keypoint = pose.keypoints[j];
//       // Only draw an ellipse is the pose probability is bigger than 0.2
//       if (keypoint.score > 0.2) {
//         fill(255, 0, 0);
//         noStroke();
//         if (keypoint.part === "leftEye" || keypoint.part === "rightEye") {
//           eyes.push([
//             62 + cam.width - keypoint.position.x, 
//             100 + keypoint.position.y
//           ])
//           // ellipse(62 + cam.width - keypoint.position.x, 100 + keypoint.position.y, 10, 10);
//         }
//       }
//     }
//   }
// }

function game_2() {
}

function game2_pressed() {
  gameButtonList[1].setFinished(true);
  stage = 1;
}

function game_3() {
}

function game3_pressed(){
  gameButtonList[2].setFinished(true);
  stage = 1;
}

