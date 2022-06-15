class Game1 extends Game {
  constructor(img_game, img_game_finished, img_back, img_game_info, img_game_success) {
    super(img_game, img_game_finished, img_back, img_game_info, img_game_success);
    this.score = 0;
    this.button = new GameButton(this.img_button, this.img_finished_button, this.finished, 45, 230);
    this.glasses_x;
    this.glasses_y;
    this.debounce;
    this.eyes = [];
  }

  mousePressed(mouseX, mouseY) {
    if (this.score < 5 && this.info_modal.isButtonOver(mouseX, mouseY)) {
      click_sound.play();
      this.ready = true;
      this.info_modal.setVisible(!this.ready);
    } else if (900 < mouseX && mouseX < 1000 && 500 < mouseY && mouseY < 600) {
      click_sound.play();
      this.score = 0;
      stage = 1;
      this.ready = false;
    } else if (this.score >= 5 && this.success_modal.isButtonOver(mouseX, mouseY)) {
      click_sound.play();
      this.score = 0;
      stage = 1;
      this.ready = false;
    }
  }

  runGame(mouseX, mouseY) {
    image(this.img_background, 0, 0);

    cam.loadPixels();
    rectMode(CENTER);
    for (let y = 100; y < CAM_IMAGE_HEIGHT; y += ps) {
      for (let x = 0; x < CAM_IMAGE_WIDTH; x += ps) {
        let index = (y * cam.width + cam.width - x) * 4;
        let r = cam.pixels[index + 0];
        let g = cam.pixels[index + 1];
        let b = cam.pixels[index + 2];
        fill(r, g, b);
        noStroke();
        rect(62 + x, 100 + y, ps, ps);
      }
    }

    this.info_modal.setVisible(!this.ready);
    this.info_modal.show(mouseX, mouseY);

    if (this.score >= 5) {
      this.finished = true;
      this.button.setFinished(this.finished);
      this.success_modal.show(mouseX, mouseY);
    } else if (this.ready) {
        if (second() % 5 == 0 && this.debounce) {
          this.debounce = false;
          let success = true;
          for (let i = 0; i < this.eyes.length; i++) {
            if (!(this.glasses_x < this.eyes[i][0] && this.eyes[i][0] < this.glasses_x + 100 &&
              this.glasses_y < this.eyes[i][1] && this.eyes[i][1] < this.glasses_y + 40)) {
              success = false;
            }
          }
          if (success) {
            success_sound.play();
            this.score += 1;
          }
          this.glasses_x = random(62, 62 + CAM_IMAGE_WIDTH - 100);
          this.glasses_y = random(200, 200 + CAM_IMAGE_HEIGHT - 140);
        } else if (second() % 5 != 0) {
          this.debounce = true;
        }
  
        textSize(30);
        fill(0, 114, 230);
        text(5 - second() % 5, 825, 175);
        text(this.score, 910, 325);
    
        if (this.glasses_x && this.glasses_y) {
          image(img_glasses, this.glasses_x, this.glasses_y);
        } else {
          fill(255);
          rect(355, 343, 143, 30, 10);
          fill(0, 114, 230);
          textSize(20);
          text(5 - second() % 5 + "초 기다리기!", 300, 350);
        }
        this.getEyesCoord();
      }
  }

  getEyesCoord()  {  
    this.eyes = [];
      // Loop through all the poses detected
    for (let i = 0; i < poses.length; i++) {
      // For each pose detected, loop through all the keypoints
      let pose = poses[i].pose;
      for (let j = 0; j < pose.keypoints.length; j++) {
        // A keypoint is an object describing a body part (like rightArm or leftShoulder)
        let keypoint = pose.keypoints[j];
        // Only draw an ellipse is the pose probability is bigger than 0.2
        if (keypoint.score > 0.2) {
          if (keypoint.part === "leftEye" || keypoint.part === "rightEye") {
            this.eyes.push([
              62 + cam.width - keypoint.position.x, 
              100 + keypoint.position.y
            ])
          }
        }
      }
    }
  }

}