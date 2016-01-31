// we create an instance at the end that overrides everything else
function EndGame() {
    this.finalBackGround = new createjs.Bitmap(imgFinal);
    this.finalBackGround.visible = true;
    this.finalBackGround.alpha = 0;
    stage.addChild(this.finalBackGround);

    this.update = function(event) {
        if (this.finalBackGround.alpha < 1)
            this.finalBackGround.alpha += 0.005;
    }
}