class Game2 extends Game {
  constructor(img_game, img_game_finished, img_back, img_game_info, img_game_success) {
    super(img_game, img_game_finished, img_back, img_game_info, img_game_success);
    this.button = new GameButton(this.img_button, this.img_finished_button, this.finished, 363, 230);
    this.status = 1;
    this.is_back = true;
    this.score = 0;
    this.foods = [];
  }

  mousePressed(mouseX, mouseY) {
    if (this.score < 100 && this.info_modal.isButtonOver(mouseX, mouseY)) {
      clickSound.play();
      this.ready = true;
      this.info_modal.setVisible(!this.ready);
    } else if (900 < mouseX && mouseX < 1000 && 500 < mouseY && mouseY < 600) {
      clickSound.play();
      this.score = 0;
      stage = 1;
      this.ready = false;
    } else if (20 < mouseX && mouseX < 60 && 530 < mouseY && mouseY < 570) {
      this.updateMic();
    } else if (80 < mouseX && mouseX < 120 && 535 < mouseY && mouseY < 575) {
      this.updateCam();
    } else if (this.score >= 100 && this.success_modal.isButtonOver(mouseX, mouseY)) {
      clickSound.play();
      this.score = 0;
      stage = 1;
      this.ready = false;
    }
  }

  randomBack() {
    if (frameCount % 10 == 0) {
      if (!this.is_back) {
        this.is_back = true;
      }
    }
    if (frameCount % 50 == 0) {
      this.is_back = !this.is_back;
    }
  }

  runGame(mouseX, mouseY) {
    image(this.img_background, 0, 0);

    if (this.status === 1 || this.status === 3) {
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

      fill(255);
      rect(620, 460, 100, 40, 10);
      fill(0);
      textSize(25);
      text(this.score + " 점", 600, 470);
    }
      
    if (this.is_back) {
      image(img_prof_back, 60, 71);
    }
    this.drawMicAndCamByStatus();

    this.info_modal.setVisible(!this.ready);
    this.info_modal.show(mouseX, mouseY);

    if (this.score >= 100) {
      this.finished = true;
      this.button.setFinished(this.finished);
      this.success_modal.show(mouseX, mouseY);
    } else if (this.ready) {
      if (this.status === 1 || this.status === 3) {
        this.randomBack();

        if (!this.is_back) {
          if (this.score > 0) {
            this.score -= 10;
          }
        }

        for (let food of this.foods) {
          food.setGravity();
          food.display();
          food.move();
          if (food.checkAndErase(mouthX, mouthY)) {
            successSound.play();
            this.score += 10;
          }
        }
        if (frameCount % 10 == 0) {
          this.moreFood();
        }

        faceapi.detect(this.gotResults);
      }
    }

  }

  moreFood() {
    let f = new Food(random(62, 620), 200, random(15), random(3));
    this.foods.push(f);
  }

  drawBackground() {
    rectMode(CORNER);
    fill(255);
    noStroke();
    rect(761, 84, 235, 35);
  }

  drawMicAndCamByStatus() {
    this.drawBackground();
    switch (this.status) {
      case 0:
        image(img_offoff, 761, 84);
        image(img_mic_off, 20, 530);
        image(img_cam_off, 80, 535);
        break;
      case 1:
        image(img_offon, 761, 84);
        image(img_mic_off, 20, 530);
        image(img_cam_on, 80, 535);
        break;
      case 2:
        image(img_onoff, 761, 84);
        image(img_mic_on, 20, 530);
        image(img_cam_off, 80, 535);
        break;
      case 3:
        image(img_onon, 761, 84);
        image(img_mic_on, 20, 530);
        image(img_cam_on, 80, 535);
        break;
    }
  }

  updateMic() {
    switch (this.status) {
      case 0:
        this.status = 2;
        break;
      case 1:
        this.status = 3;
        break;
      case 2:
        this.status = 0;
        break;
      case 3:
        this.status = 1;
        break;
    }
  }

  updateCam() {
    switch (this.status) {
      case 0:
        this.status = 1;
        break;
      case 1:
        this.status = 0;
        break;
      case 2:
        this.status = 3;
        break;
      case 3:
        this.status = 2;
        break;
    }
  }

  gotResults(err, result) {
    if (err) {
      console.log(err);
      return;
    }
    detections = result;

    if (detections) {
      if (detections.length > 0) {
          // console.log(detections)
          for (let i = 0; i < detections.length; i++){
            let mouth = detections[i].parts.mouth; 
            if (mouth[10]._x !== undefined && mouth[10]._y !== undefined) {
              fill(255, 0, 0);
              console.log(62 + cam.width - mouth[10]._x, 100 + mouth[10]._y);
              ellipse(62 + cam.width - mouth[10]._x, 100 + mouth[10]._y, 20, 20);    
              mouthX = 62 + cam.width - mouth[10]._x;
              mouthY = 100 + mouth[10]._y;
            }
          }
      }
    }
  }
}

class Food {
  constructor(x, y, speed, type){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.type = type;
    this.gravity = 0.5;
    this.visible = true;
  }
  
  setGravity(){
    this.speed += this.gravity;
  }
  
  move() {
    this.y += this.speed;
    if (this.y >= 430) {
      this.visible = false;
    }
  }
  
  display(){
    if (this.visible) {
      image(img_foods[int(this.type)], this.x, this.y);
    }
    // ellipse(this.x, this.y, this.diam, this.diam);
  }

  checkAndErase(x, y) {
    if (this.visible) {
      let isOnFoodX = this.x < x && x < this.x + 64;
      let isOnFoodY = this.y < y && y < this.y + 64;
      if (isOnFoodX && isOnFoodY) {
        this.visible = false;
      }
      return isOnFoodX && isOnFoodY;
    } else {
      return false;
    }
    
  }
}