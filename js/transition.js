var rectangleToCoverScene = null;
var gameStateTransition = false;

function Transition(player) {
    var transitionSpeed = 0.02;

    gameStateTransition = true;
    var timeInPauseCounter = 30;
    var transitionState = TransitionStates.FadingToBlack;
    rectangleToCoverScene = new createjs.Shape();
    rectangleToCoverScene.graphics.beginFill("#000000").drawRect(0, 0, 1200, 700);
    rectangleToCoverScene.visible = true;
    rectangleToCoverScene.alpha = 0;
    stage.addChild(rectangleToCoverScene);



    // find the first applicable advice to display
    var adviceText = "";
    for (var i = 0; i < objectsToDiscover.length; i++) {
        if (objectsToDiscover[i] != "") { // not discovered yet
            adviceText = texts.returnAdvice(objectsToDiscover[i]);
            break;
        }
    }
    var textOnTransition = new createjs.Text(adviceText, "20px ArchivoNarrow", "#ffffff");
    textOnTransition.x = 200;
    textOnTransition.y = 120;
    textOnTransition.visible = true;
    textOnTransition.alpha = 0;
    stage.addChild(textOnTransition);

    var remainingOnTransition = new createjs.Text(player.foundItemsCounter.toString() + " / 5", "20px ArchivoNarrow", "#ffffff");
    remainingOnTransition.x = 1100;
    remainingOnTransition.y = 300;
    remainingOnTransition.visible = true;
    remainingOnTransition.alpha = 0;
    stage.addChild(remainingOnTransition);

    musicHandler.fadeMusic(soundtrackLayer1, MusicStates.FadingOut);
    musicHandler.fadeMusic(soundtrackLayer1, MusicStates.PartialFadeOut);
    musicHandler.fadeMusic(soundtrackLayer3, MusicStates.PartialFadeOut);
    musicHandler.fadeMusic(soundtrackLayer4, MusicStates.FadingOut);
    musicHandler.fadeMusic(soundtrackLayer5, MusicStates.FadingOut);
    musicHandler.fadeMusic(soundtrackLayer6, MusicStates.FadingOut);
    createjs.Sound.play(rumble);

    //disable all objects
    updateFreezation(true);

    this.update = function(event) {
        switch (transitionState) {
            case (TransitionStates.FadingToBlack):
                if (rectangleToCoverScene.alpha < 1) {
                    rectangleToCoverScene.alpha += transitionSpeed;
                    textOnTransition.alpha += transitionSpeed;
                    remainingOnTransition.alpha += transitionSpeed;
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
                    musicHandler.fadeMusic(soundtrackLayer2, MusicStates.FadingIn);
                    musicHandler.fadeMusic(soundtrackLayer3, MusicStates.FadingIn);
                    musicHandler.fadeMusic(soundtrackLayer4, MusicStates.FadingIn);
                    musicHandler.fadeMusic(soundtrackLayer5, MusicStates.FadingIn);
                }
                break;
            case (TransitionStates.FadingToGame):
                if (rectangleToCoverScene.alpha > 0) {
                    rectangleToCoverScene.alpha -= transitionSpeed;
                    textOnTransition.alpha -= transitionSpeed;
                    remainingOnTransition.alpha -= transitionSpeed;
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
        //enable all objects
        updateFreezation(false);
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
