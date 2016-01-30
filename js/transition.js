var rectangleToCoverScene = null;

function Transition() {
    gameStateTransition = true;
    var timeInPauseCounter = 30;
    var transitionState = TransitionStates.FadingToBlack;
    rectangleToCoverScene = new createjs.Shape();
    rectangleToCoverScene.graphics.beginFill("#000000").drawRect(0, 0, 1200, 700);
    rectangleToCoverScene.visible = true;
    rectangleToCoverScene.alpha = 0;
    stage.addChild(rectangleToCoverScene);

    for (var l in soundtrackLayers)
        fadeMusic(l, false);

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
                    fadeMusic(soundtrackLayers[0], true);
                }
                break;
            case (TransitionStates.FadingToGame):
                if (rectangleToCoverScene.alpha > 0)
                    rectangleToCoverScene.alpha -= 0.01;
                else {
                    gameStateTransition = false;
                    player.start = true;
                }
                break;
        }
    };

    this.resetRoom = function() {
        // whatever is required during the fade to black to reset the game.
        // TODO play interlude sound
        player.remove();
        player = new Player(imgPlayer, [500, 400, 600]); // TODO do not start moving before the end of transition

    };
}

var TransitionStates = {
    FadingToBlack : 0,
    Pause : 1,
    FadingToGame : 2
};
