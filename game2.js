class Game2 extends Game {
  constructor(img_game, img_game_finished, img_back, img_game_info, img_game_success) {
    super(img_game, img_game_finished, img_back, img_game_info, img_game_success);
    this.button = new GameButton(this.img_button, this.img_finished_button, this.finished, 363, 230);
    this.status = 1;
    this.is_back = false;
    this.score = 0;
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
    }
      
    if (this.is_back) {
      image(img_prof_back, 60, 71);
    }
    this.drawMicAndCamByStatus();

    this.info_modal.setVisible(!this.ready);
    this.info_modal.show(mouseX, mouseY);
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


}