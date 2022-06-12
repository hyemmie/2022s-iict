class GameButton{
  constructor(img, img_finished, isFinished, x, y) {
    this.img = img;
    this.img_finished = img_finished;
    this.isFinished = isFinished;
    this.x = x;
    this.y = y;
  }
  
  show(mouseX, mouseY) {
    if (this.isFinished) {
      image(this.img_finished, this.x, this.y);
      if (this.isOver(mouseX, mouseY)) {
        push();
        rectMode(CORNER);
        translate(0, 0);
        fill(`rgba(255, 255, 255, 0.3)`);
        noStroke();
        rect(this.x, this.y, 289, 152, 10);
        pop();
      }
      textSize(22);
      fill(9, 214, 107);
      text("수강완료", this.x + 105, this.y + 240);
    } else {
      image(this.img, this.x, this.y);
      if (this.isOver(mouseX, mouseY)) {
        push();
        rectMode(CORNER);
        translate(0, 0);
        fill(`rgba(255, 255, 255, 0.3)`);
        noStroke();
        rect(this.x, this.y, 289, 152, 10);
        pop();
      }
    }
  }
  
  isOver(mouseX, mouseY) {
    let isOnX = this.x < mouseX && mouseX < this.x + 289;
    let isOnY = this.y < mouseY && mouseY < this.y + 152;
    return isOnX && isOnY;
  }
  
  setFinished(isFinished) {
    this.isFinished = isFinished;
  }
  
}