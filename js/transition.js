var rectangleToCoverScene = null;
var gameStateTransition = false;

function Transition() {
    var transitionSpeed = 0.02;

    gameStateTransition = true;
    var timeInPauseCounter = 30;
    var transitionState = TransitionStates.FadingToBlack;
    rectangleToCoverScene = new createjs.Shape();
    rectangleToCoverScene.graphics.beginFill("#000000").drawRect(0, 0, 1200, 700);
    rectangleToCoverScene.visible = true;
    rectangleToCoverScene.alpha = 0;
    stage.addChild(rectangleToCoverScene);

    // find the first appliable advice to display
    var adviceText = "";
    for (var i = 0; i < objectsToDiscover.length; i++) {
        if (objectsToDiscover[i] != "") { // not discovered yet
            adviceText = texts.returnAdvice(objectsToDiscover[i]);
            break;
        }
    }
    var textOnTransition = new createjs.Text(adviceText, "20px Segoe", "#ffffff");
    textOnTransition.x = 20;
    textOnTransition.y = 150;
    textOnTransition.visible = true;
    textOnTransition.alpha = 0;
    stage.addChild(textOnTransition);

    musicHandler.fadeMusic(soundtrackLayer1, MusicStates.PartialFadeOut);
    musicHandler.fadeMusic(soundtrackLayer3, MusicStates.FadingOut);
    createjs.Sound.play(rumble);

    this.update = function(event) {
        switch (transitionState) {
            case (TransitionStates.FadingToBlack):
                if (rectangleToCoverScene.alpha < 1) {
                    rectangleToCoverScene.alpha += transitionSpeed;
                    textOnTransition.alpha += transitionSpeed;
                }
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
                    musicHandler.fadeMusic(soundtrackLayer1, MusicStates.FadingIn);
                    musicHandler.fadeMusic(soundtrackLayer3, MusicStates.FadingIn);
                }
                break;
            case (TransitionStates.FadingToGame):
                if (rectangleToCoverScene.alpha > 0) {
                    rectangleToCoverScene.alpha -= transitionSpeed;
                    textOnTransition.alpha -= transitionSpeed;
                }
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
        stage.removeChild(textOnTransition);
        stage.removeChild(rectangleToCoverScene);
    };
}

var TransitionStates = {
    FadingToBlack : 0,
    Pause : 1,
    FadingToGame : 2
};
