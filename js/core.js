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
    imgPlayer = loadImg("Personnage.png");
    imgBg = loadImg("Decor-01.png");
    imgFlower = loadImg("Fleur-01.png");
    imgDebug = loadImg("debug.png");
    imgYeux = loadImg("lesyeux.png");

    createjs.Sound.addEventListener("fileload", playMusicLayers);
    createjs.Sound.registerSound("media/music/layer1.mp3", soundtrackLayer1);
    createjs.Sound.registerSound("media/music/layer2.mp3", soundtrackLayer2);
}

function loadImg(name)
{
    var img = new Image();
    img.onload = preloadUpdate;
    img.src = "media/" + name;
    return img;
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

    createClickable(510, 149, spSheetFlower, spSheetYeux); //pot
    createClickable(50, 20, spSheetFlower, spSheetYeux); //frame
    createClickable(200, 50, spSheetFlower, spSheetYeux); //maitre window
    createClickable(425, 149, spSheetFlower, spSheetYeux); //aqua
    createClickable(1000, 120, spSheetFlower, spSheetYeux); //phone

    player = new Player(imgPlayer, [900, 60, 1250]);
    player.start = true;
    var tb = new TextBox(player, "HelloWorld !");

    musicHandler = new MusicHandler();
    musicHandler.fadeMusic(soundtrackLayer1, MusicStates.FadingIn);

    createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", update);
}

function createClickable(x, y, spSheetObj, spSheetYeux)
{
    var spriteYeux = new createjs.Sprite(spSheetYeux, "closed"); //clone
    spriteYeux.regX = 50;
    spriteYeux.regY = 100;
    var sprite = new createjs.Sprite(spSheetObj, "still");
    sprite.x = x;
    sprite.y = y;
    interactiveObjects.push(new MouseZone(sprite, spriteYeux));
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
