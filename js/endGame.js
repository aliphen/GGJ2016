// we create an instance at the end that overrides everything else
function EndGame() {
    this.finalBackGround = new createjs.Bitmap(imgFinal);
    this.finalBackGround.visible = true;
    this.finalBackGround.alpha = 0;
    stage.addChild(this.finalBackGround);

    var countdownToBlack = 150;
    var rectangleToCoverScene;
    var textOnTransition;

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
            rectangleToCoverScene.graphics.beginFill("#212121").drawRect(0, 0, 1200, 700);
            rectangleToCoverScene.visible = true;
            rectangleToCoverScene.alpha = 0;
            stage.addChild(rectangleToCoverScene);
            textOnTransition = new createjs.Text("I've moved on.", "20px ArchivoNarrow", "#ffffff");
            textOnTransition.x = 200;
            textOnTransition.y = 120;
            textOnTransition.visible = true;
            textOnTransition.alpha = 0;
            stage.addChild(textOnTransition);
        }
        else
        {
            if (rectangleToCoverScene.alpha < 1) {
                rectangleToCoverScene.alpha += 0.01;
                textOnTransition.alpha += 0.01;
            }
        }

    }
}