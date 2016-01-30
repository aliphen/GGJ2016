displayDebug = false;

var preloadCount = 0;
var preloadTotal = 4;

var stage;
var player;
var eltsToUpdate = [];
var interactiveObjects = [];

var transition;

// Images assets
var imgPlayer;
var imgBg;
var imgFlower;
var imgDebug;
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

    imgBg = new Image();
    imgBg.onload = preloadUpdate;
    imgBg.src = "media/Decor-01.png";

    imgFlower = new Image();
    imgFlower.onload = preloadUpdate;
    imgFlower.src = "media/Fleur-01.png";

    imgDebug = new Image();
    imgDebug.onload = preloadUpdate;
    imgDebug.src = "media/debug.png";

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

    var objBg = new createjs.Bitmap(imgBg);
    stage.addChild(objBg);

    var spSheetFlower = new createjs.SpriteSheet({
        images: [imgFlower],
        frames: {height: 56, width: 38},
        animations: {
            still: [0, 0],
            click: [1, 4, "active", 0.1],
            active: [4, 4],
            decay: [5, 7, "still", 0.1]
        }
    });
    var spriteFlower = new createjs.Sprite(spSheetFlower, "still");
    spriteFlower.x = 510;
    spriteFlower.y = 149;
    interactiveObjects.push(new MouseZone(spriteFlower));

    player = new Player(imgPlayer, [500, 60, 1000]);
    player.start = true;
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
