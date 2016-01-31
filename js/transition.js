var rectangleToCoverScene = null;
var gameStateTransition = false;

function Transition() {
    gameStateTransition = true;
    var timeInPauseCounter = 30;
    var transitionState = TransitionStates.FadingToBlack;
    rectangleToCoverScene = new createjs.Shape();
    rectangleToCoverScene.graphics.beginFill("#000000").drawRect(0, 0, 1200, 700);
    rectangleToCoverScene.visible = true;
    rectangleToCoverScene.alpha = 0;
    stage.addChild(rectangleToCoverScene);

    // Loop 1 never stops
    musicHandler.fadeMusic(soundtrackLayer3, MusicStates.FadingOut);

    this.update = function(event) {
        switch (transitionState) {
            case (TransitionStates.FadingToBlack):
                if (rectangleToCoverScene.alpha < 1)
                    rectangleToCoverScene.alpha += 0.01;
                else {
                    transitionState = TransitionStates.Pause;
                    this.resetRoom();
                }
                break;
            case (TransitionStates.Pause):
                if (timeInPauseCounter > 0)
                    timeInPauseCounter--;
                else {
                    transitionState = TransitionStates.FadingToGame;
                    musicHandler.fadeMusic(soundtrackLayer3, MusicStates.FadingIn);
                }
                break;
            case (TransitionStates.FadingToGame):
                if (rectangleToCoverScene.alpha > 0)
                    rectangleToCoverScene.alpha -= 0.01;
                else {
                    this.startGameAfterTransition();
                }
                break;
        }
    };

    this.resetRoom = function() {
        // TODO play interlude sound
        player.reset();


    };

    this.startGameAfterTransition = function() {
        gameStateTransition = false;
        player.startMoving();
    };

    this.remove = function() {
        stage.removeChild(rectangleToCoverScene);
    };
}

var TransitionStates = {
    FadingToBlack : 0,
    Pause : 1,
    FadingToGame : 2
};
