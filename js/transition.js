function Transition() {
    gameStateTransition = true;
    var timeInPauseCounter = 30;
    var transitionState = TransitionStates.FadingToBlack;
    var rectangleToCoverScene = new createjs.Shape();
    rectangleToCoverScene.graphics.beginFill("#000000").drawRect(0, 0, 1200, 700);
    rectangleToCoverScene.visible = true;
    rectangleToCoverScene.alpha = 0;
    stage.addChild(rectangleToCoverScene);
    console.log("hi !");

    this.update = function(event) {
        switch (transitionState) {
            case (TransitionStates.FadingToBlack): // TODO fadeout music
                if (rectangleToCoverScene.alpha < 1)
                    rectangleToCoverScene.alpha += 0.01;
                else {
                    transitionState = TransitionStates.Pause;
                    this.resetRoom();
                }
                break;
            case (TransitionStates.Pause): // TODO play interlude sound
                if (timeInPauseCounter > 0)
                    timeInPauseCounter--;
                else
                    transitionState = TransitionStates.FadingToGame;
                break;
            case (TransitionStates.FadingToGame): // TODO fadein music
                if (rectangleToCoverScene.alpha > 0)
                    rectangleToCoverScene.alpha -= 0.01;
                else
                    gameStateTransition = false;
                break;
        }
    };

    this.resetRoom = function() {
        // whatever is required during the fade to black to reset the game.
    };
}

var TransitionStates = {
    FadingToBlack : 0,
    Pause : 1,
    FadingToGame : 2
};
