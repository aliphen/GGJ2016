displayDebug = false;

var preloadCount = 0;
var preloadTotal = 5;

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
var imgYeux;
// Images assets end

// Sound assets
var soundtrackLayers = [];
var soundtrackLayer1 = "soundtrackLayer1";
var soundtrackLayer2 = "soundtrackLayer2";
var musicHandler;
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

    imgYeux = new Image();
    imgYeux.onload = preloadUpdate;
    imgYeux.src = "media/lesyeux.png";

    createjs.Sound.addEventListener("fileload", playMusicLayers);
    createjs.Sound.registerSound("media/music/layer1.mp3", soundtrackLayer1);
    createjs.Sound.registerSound("media/music/layer2.mp3", soundtrackLayer2);
}
function playMusicLayers(event)
{
    var instance = createjs.Sound.play(event.id, {loop:-1});
    instance.volume = 0;
    soundtrackLayers[event.id] = instance;
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

    var spSheetYeux = new createjs.SpriteSheet({
        images: [imgYeux],
        frames: {height: 100, width: 100},
        animations: {closed: 0, open: 1}
    });
    var spriteYeux = new createjs.Sprite(spSheetYeux, "closed");
    spriteYeux.regX = 50;
    spriteYeux.regY = 100;
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
    interactiveObjects.push(new MouseZone(spriteFlower, spriteYeux));

    spriteYeux = new createjs.Sprite(spSheetYeux, "closed"); //clone
    spriteYeux.regX = 50;
    spriteYeux.regY = 100;
    var spriteFrame = new createjs.Sprite(spSheetFlower, "still");
    spriteFrame.x = 50;
    spriteFrame.y = 20;
    interactiveObjects.push(new MouseZone(spriteFrame, spriteYeux));

    spriteYeux = new createjs.Sprite(spSheetYeux, "closed"); //clone
    spriteYeux.regX = 50;
    spriteYeux.regY = 100;
    var spriteWindow = new createjs.Sprite(spSheetFlower, "still");
    spriteWindow.x = 200;
    spriteWindow.y = 50;
    interactiveObjects.push(new MouseZone(spriteWindow, spriteYeux));

    spriteYeux = new createjs.Sprite(spSheetYeux, "closed"); //clone
    spriteYeux.regX = 50;
    spriteYeux.regY = 100;
    var spriteAqua = new createjs.Sprite(spSheetFlower, "still");
    spriteAqua.x = 425;
    spriteAqua.y = 149;
    interactiveObjects.push(new MouseZone(spriteAqua, spriteYeux));

    spriteYeux = new createjs.Sprite(spSheetYeux, "closed"); //clone
    spriteYeux.regX = 50;
    spriteYeux.regY = 100;
    var spritePhone = new createjs.Sprite(spSheetFlower, "still");
    spritePhone.x = 1000;
    spritePhone.y = 120;
    interactiveObjects.push(new MouseZone(spritePhone, spriteYeux));

    player = new Player(imgPlayer, [900, 60, 1250]);
    player.start = true;
    var tb = new TextBox(player, "HelloWorld !");

    musicHandler = new MusicHandler();
    musicHandler.fadeMusic(soundtrackLayer1, MusicStates.FadingIn);

    createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", update);
}


function update(event)
{
	stage.update(event);
    for(var i = 0; i < eltsToUpdate.length; i++)
        eltsToUpdate[i].update(event);

    if (gameStateTransition == true)
        transition.update(event);
    if (gameStateTransition == false && transition != null)
    {
        transition.remove();
        transition = null;
    }
}
