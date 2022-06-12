class Game {
  constructor(img_game, img_game_finished, img_back, img_game_info, img_game_success) {
    this.img_button = img_game;
    this.img_finished_button = img_game_finished;
    this.img_background = img_back;
    this.img_game_info = img_game_info;
    this.img_game_success = img_game_success;
    this.info_modal = new GameModal(this.img_game_info, "시작하기");
    this.success_modal = new GameModal(this.img_game_success, "돌아가기");
    this.ready = false;
    this.finished = false;
    this.button;
  }

  getButton() {
    return this.button;
  }

  setReady(ready) {
    this.ready = ready;
  }

  mousePressed(mouseX, mouseY) {

  }

  runGame(mouseX, mouseY) {

  }
}