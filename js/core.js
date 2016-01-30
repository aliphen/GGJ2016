displayDebug = false;

var preloadCount = 0;
var preloadTotal = 1;

var stage;
var eltsToUpdate = [];

var transition;
var gameStateTransition = false;

// Images assets
var imgPlayer;
// Images assets end

// Sound assets
var soundtrackLayers = [];
// Sound assets end

function startGame()
{
	stage = new createjs.Stage(document.getElementById("gameCanvas"));
	var text = new createjs.Text("Loading...");
	text.x = 600; text.y = 300;
	text.textAlign = "center"; text.textBaseline = "middle";
	stage.addChild(text);
	stage.update();

	preloadAssets();
}

function preloadAssets()
{
    imgPlayer = new Image();
	imgPlayer.onload = preloadUpdate;
	imgPlayer.src = "media/Personnage.png";

    createjs.Sound.addEventListener("fileload", playMusicLayers);
    createjs.Sound.registerSound("media/music/layer1.mp3", "soundtrackLayer1");
    createjs.Sound.registerSound("media/music/layer2.mp3", "soundtrackLayer2");
}
function playMusicLayers(event)
{
    var instance = createjs.Sound.play(event.id, {loop:-1});
    instance.volume = 0;
    soundtrackLayers.push(instance);
}

function preloadUpdate()
{
	preloadCount++;
	if(preloadCount == preloadTotal)
		launchGame();
}

function launchGame()
{
    stage.enableMouseOver();
	stage.removeChildAt(0); //loading text

    var test = new MouseZone(950, 500, 200, 70);
    var testsq = new MouseZone(50, 50, 150, 150);

    var player = new Player(imgPlayer, [500, 400, 600]);
    var tb = new TextBox(player, "HelloWorld !");

    createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", update);
}


function update(event)
{
    //  Use this to fade tracks in and out
    //    fadeMusic(0, true);

	stage.update(event);
    for(var i = 0; i < eltsToUpdate.length; i++)
        eltsToUpdate[i].update(event);

    if (gameStateTransition == true)
        transition.update(event);
}

fadeMusic = function(layer, fadeIn) {
    if (!this.fadeDone) {
        if (fadeIn == true) {
            layer.volume += 0.01;
            if (layer.volume >= 1)
                this.fadeDone = true;
        }
        else {
            layer.volume -= 0.01;
            if (layer.volume <= 1)
                this.fadeDone = true;
        }
    }
};
