// we create an instance at the end that overrides everything else
function EndGame() {
    this.finalBackGround = new createjs.Bitmap(imgFinal);
    this.finalBackGround.visible = true;
    this.finalBackGround.alpha = 0;
    stage.addChild(this.finalBackGround);

    var countdownToBlack = 150;
    var rectangleToCoverScene;

    createjs.Sound.play(winSound);

    this.update = function(event) {
        if (this.finalBackGround.alpha < 1) {
            this.finalBackGround.alpha += 0.005;
            return;
        }

        // once we have the full colored screen, wait 10 sec
        if (countdownToBlack > 0)
            countdownToBlack--;
        else if (countdownToBlack == 0)
        {
            // stop the music and fade to black
            countdownToBlack--;
            musicHandler.fadeMusic(soundtrackLayer1, MusicStates.FadingOut);
            musicHandler.fadeMusic(soundtrackLayer3, MusicStates.FadingOut);
            rectangleToCoverScene = new createjs.Shape();
            rectangleToCoverScene.graphics.beginFill("#000000").drawRect(0, 0, 1200, 700);
            rectangleToCoverScene.visible = true;
            rectangleToCoverScene.alpha = 0;
            stage.addChild(rectangleToCoverScene);
        }
        else
        {
            if (rectangleToCoverScene.alpha < 1)
                rectangleToCoverScene.alpha += 0.01;
        }

    }
}