class Game3 extends Game {
  constructor(img_game, img_game_finished, img_back, img_game_info, img_game_success) {
    super(img_game, img_game_finished, img_back, img_game_info, img_game_success);
    this.button = new GameButton(this.img_button, this.img_finished_button, this.finished, 680, 230);
    this.cleared = false;
    this.network = false;
    this.zoom = false;
    this.show_wifi = false;
    this.found_ta = false;
    this.sent = false;
  }

  mousePressed(mouseX, mouseY) {
    if (!this.cleared && this.info_modal.isButtonOver(mouseX, mouseY)) {
      click_sound.play();
      this.ready = true;
      this.info_modal.setVisible(!this.ready);
    } else if (900 < mouseX && mouseX < 1000 && 500 < mouseY && mouseY < 600) {
      click_sound.play();
      stage = 1;
      this.ready = false;
      this.cleared = false;
      this.network = false;
      this.zoom = true;
      this.show_wifi = false;
      this.found_ta = false;
      this.sent = false;
    } else if (this.cleared && this.success_modal.isButtonOver(mouseX, mouseY)) {
      click_sound.play();
      stage = 1;
      this.ready = false;
      this.cleared = false;
      this.network = false;
      this.zoom = true;
      this.show_wifi = false;
      this.found_ta = false;
      this.sent = false;
    } else if (this.ready && !this.network && 765 < mouseX && mouseX < 790 && 0 < mouseY && mouseY < 20) {
      this.show_wifi = !this.show_wifi;
    } else if (this.show_wifi && 775 < mouseX && mouseX < 810 && 80 < mouseY && mouseY < 120) {
      image(img_after_wifi, 770, 20);
      this.network = true;
      setTimeout(() => { 
        this.zoom = true; 
        this.show_wifi = false;
      }, 3000);
    } else if (this.zoom && 750 < mouseX && mouseX < 1000 && 160 < mouseY && mouseY < 200) {
      this.found_ta = true;
    } else if (this.found_ta && 950 < mouseX && mouseX < 1000 && 460 < mouseY && mouseY < 510) {
      this.sent = true;
      this.found_ta = false;
      setTimeout(() => { 
        textArea.hide();
        this.cleared = true;
      }, 3000);
    }
  }

  runGame(mouseX, mouseY) {
    if (this.zoom) {
      image(img_game3_zoom_back, 0, 0);
      noStroke();
      fill(45, 139, 254);
      rect(950, 460, 50, 50, 10);
      fill(255);
      textSize(20);
      text("전송", 957, 492);

    } else {
      image(this.img_background, 0, 0);
    }

    this.info_modal.setVisible(!this.ready);
    this.info_modal.show(mouseX, mouseY);

    if (this.cleared) {
      this.finished = true;
      this.button.setFinished(this.finished);
      this.success_modal.show(mouseX, mouseY);
    } else if (this.ready) {
      if (!this.cleared && this.zoom) {
        textArea.show();
      }
      
      if (this.show_wifi) {
        if (this.network) {
          image(img_after_wifi, 770, 20);
          image(img_game3_loading, 350, 140);
        } else {
          image(img_before_wifi, 770, 20);
        }
      }

      if (this.found_ta) {
        image(img_game3_me_ta, 755, 440);
      }

      if (this.sent) {
        image(img_game3_me_ta, 870, 290);
        fill(216);
        rect(800, 310, 200, 40, 10);
        image(img_game3_ta_me, 755, 360);
        rect(755, 380, 200, 40, 10);
        fill(0);
        textSize(15);
        text("확인하였습니다.", 770, 405);
        text(textArea.value(), 815, 335);
      }

    }

  }
}