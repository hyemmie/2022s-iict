class GameModal{
  constructor(img, text){
    this.visible = true;
    this.img = img;
    this.buttonText = text;
  }
  
  setVisible(visible) {
    this.visible = visible;
  }
  
  show(mouseX, mouseY) {
    if (this.visible) {
      push();
      translate(0, 0);
      rectMode(CORNER);

      // 검은 바탕
      fill(`rgba(0, 0, 0, 0.8)`);
      rect(0, 0, 1000, 600);

      // 흰 바탕
      fill(255);
      rect(200, 100, 600, 400, 20);

      image(this.img, 250, 130);

      // 파란 버튼
      fill(45, 139, 254);
      noStroke();
      rect(450, 430, 100, 40, 10);

      fill(255);
      textSize(20);
      text(this.buttonText, 465, 457);
      if (this.isButtonOver(mouseX, mouseY)) {
        fill(`rgba(255, 255, 255, 0.2)`);
        rect(450, 430, 100, 40, 10);
      }
      pop();
    }
  }

  isButtonOver(mouseX, mouseY) {
    let isOverX = 450 < mouseX && mouseX < 550;
    let isOverY = 430 < mouseY && mouseY < 470;
    return isOverX && isOverY;
  }
}