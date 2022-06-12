class Game2 extends Game {
  constructor(img_game, img_game_finished, img_back, img_game_info, img_game_success) {
    super(img_game, img_game_finished, img_back, img_game_info, img_game_success);
    this.button = new GameButton(this.img_button, this.img_finished_button, this.finished, 363, 230);
  }
}