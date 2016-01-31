displayDebug = false;

var preloadCount = 0;
var preloadTotal = 16;

var stage;
var player;
var door;
var doorIsOpen = false;
var eltsToUpdate = [];
var interactiveObjects = [];

// states
var transition;
var finalState = null;
var gameHasEnded = false;

// Images assets
var imgPlayer;
var imgBg;
var imgDebug;
var imgYeux;

var imgFlower;
var imgWindow;
var imgPhone;
var imgAqua;
var imgFrame;
var imgFinal;

var imgDecFlower;
var imgDecWindow;
var imgDecPhone;
var imgDecAqua;
var imgDecFrame;

var imgShower;
var imgWake;
var imgDoor;
// Images assets end

// Sound assets
var soundtrackLayers = [];
var soundtrackLayer1 = "soundtrackLayer1";
var soundtrackLayer2 = "soundtrackLayer2";
var soundtrackLayer3 = "soundtrackLayer3";
var soundtrackLayer4 = "soundtrackLayer4";
var musicHandler;

var achievementA = "achievementA";
var achievementB = "achievementB";
var achievementC = "achievementC";
var achievementD = "achievementD";
var achievementE = "achievementE";
var rumble = "rumble";
var plantGrowSound = "plantGrowSound";
var aquariumSound = "aquariumSound";
var windowSound = "windowSound";
var phoneSound = "phoneSound";
var photoSound = "photoSound";
var winSound = "winSound";
var stepSoundInstance;
// Sound assets end

var texts;

var objectsToDiscover = ["window", "flower", "aquarium", "phone", "photo", "finalAdvice"]; // used to provide advice on black screen, never reset

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
    imgPlayer =    loadImg("Personnage.png");
    imgBg =        loadImg("Decor-01.png");
    imgFlower =    loadImg("Fleur-01.png");
    imgDebug =     loadImg("debug.png");
    imgYeux =      loadImg("lesyeux.png");
    imgWindow =    loadImg("window.png");
    imgPhone =     loadImg("phone.png");
    imgAqua =      loadImg("aqua.png");
    imgFrame =     loadImg("frame.png");
    imgDecFlower = loadImg("decFlower.png");
    imgDecWindow = loadImg("decWindow.png");
    imgDecPhone =  loadImg("decPhone.png");
    imgDecAqua =   loadImg("decAqua.png");
    imgDecFrame =  loadImg("decFrame.png");
    imgFinal =     loadImg("Decor-final.png");
    imgShower =    loadImg("shower.png");
    imgWake =      loadImg("wakeup.png");
    imgDoor =      loadImg("door.png");

    // register foley
    createjs.Sound.registerSound("media/music/Ohayo - SD - Feedback Achievement A.mp3", achievementA, 2);
    createjs.Sound.registerSound("media/music/Ohayo - SD - Feedback Achievement B.mp3", achievementB, 2);
    createjs.Sound.registerSound("media/music/Ohayo - SD - Feedback Achievement C.mp3", achievementC, 2);
    createjs.Sound.registerSound("media/music/Ohayo - SD - Feedback Achievement D.mp3", achievementD, 2);
    createjs.Sound.registerSound("media/music/Ohayo - SD - Feedback Achievement E.mp3", achievementE, 2);
    createjs.Sound.registerSound("media/music/Ohayo - SD - Rumble A.mp3", rumble, 2);
    createjs.Sound.registerSound("media/music/Ohayo - SD - Plant Growing.mp3", plantGrowSound, 2);
    createjs.Sound.registerSound("media/music/Ohayo - SD - Aquarium.mp3", aquariumSound, 2);
    createjs.Sound.registerSound("media/music/Ohayo - SD - Blinds C.mp3", windowSound, 2);
    createjs.Sound.registerSound("media/music/Ohayo - SD - Telephone End A.mp3", phoneSound, 2);
    createjs.Sound.registerSound("media/music/Ohayo - SD - Blow B.mp3", photoSound, 2);
    createjs.Sound.registerSound("media/music/Ohayo - SD - Feedback Win B.mp3", winSound, 2);

    createjs.Sound.registerSound("media/music/Ohayo - SD - Step.mp3", "stepSound", 2);
    stepSoundInstance = createjs.Sound.play("stepSound", {loop:-1});
    stepSoundInstance.volume = 0;


    // register music (after foley to avoid triggering the soundtrack load event
    createjs.Sound.addEventListener("fileload", playMusicLayers);
    createjs.Sound.registerSound("media/music/Aloop.mp3", soundtrackLayer1);
    createjs.Sound.registerSound("media/music/Astrart.mp3", soundtrackLayer2);
    createjs.Sound.registerSound("media/music/Bstartloop.mp3", soundtrackLayer3);
    createjs.Sound.registerSound("media/music/Ohayo - SD - Clock.mp3", soundtrackLayer4);
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
        frames: {height: 60, width: 75},
        animations: {closed: 0, open: 1}
    });
    var spSheetFlower = new createjs.SpriteSheet({
        images: [imgFlower],
        frames: {height: 56, width: 38},
        animations: {
            still: 0,
            click: [1, 4, "active", 0.1],
            active: 4,
            decay: [5, 7, "still", 0.1]
        }
    });
    var spSheetWindow = new createjs.SpriteSheet({
        images: [imgWindow],
        frames: {height: 157, width: 250},
        animations: {
            still: 0,
            click: [1, 4, "active", 0.08],
            active: 4,
            decay: [5, 7, "still", 0.08]
        }
    });
    var spSheetPhone = new createjs.SpriteSheet({
        images: [imgPhone],
        frames: {height: 49, width: 27},
        animations: {
            still: 0,
            click: [1, 5, "active", 0.1],
            active: 6,
            decay: [7, 11, "still", 0.1]
        }
    });
    var spSheetAqua = new createjs.SpriteSheet({
        images: [imgAqua],
        frames: {height: 42, width: 108},
        animations: {
            still: 0,
            click: [1, 37, "active", 0.78],
            active: 38,
            decay: [39, 74, "still", 0.78]
        }
    });
    var spSheetFrame = new createjs.SpriteSheet({
        images: [imgFrame],
        frames: {height: 25, width: 30},
        animations: {
            still: 0,
            click: [1, 2, "active", 0.07],
            active: 3,
            decay: [4, 5, "still", 0.5]
        }
    });

    createClickable(547, 184, spSheetFlower, spSheetYeux, imgDecFlower, "flower"  , 3000);
    createClickable(61,  90,  spSheetFrame,  spSheetYeux, imgDecFrame,  "photo"   , 3500);
    createClickable(166, 79,  spSheetWindow, spSheetYeux, imgDecWindow, "window"  , 2500);
    createClickable(431, 198, spSheetAqua,   spSheetYeux, imgDecAqua ,  "aquarium", 3000);
    createClickable(985, 163, spSheetPhone,  spSheetYeux, imgDecPhone,  "phone"   , 5000);

    door = new createjs.Sprite(
        new createjs.SpriteSheet({
            images: [imgDoor],
            frames: {height: 286, width: 150},
            animations: {
                opened: 3,
                closed: 0,
                opening: [1, 2, "opened", 0.1],
                closing: [4, 5, "closed", 0.2]
            }
        }), "closed");
    door.x = 1050;
    door.y = 65;
    stage.addChild(door);

    var shower = new createjs.Sprite(
        new createjs.SpriteSheet({
            images: [imgShower],
            frames: {height: 96, width: 100},
            animations: {
                on: [0, 2, "on", 0.3]
            }
        }), "on");
    shower.x = 838;
    shower.y = 57;
    shower.visible = false;
    stage.addChild(shower);
    player = new Player(imgPlayer, imgWake, [880, 75, 1250],[ //31
        function(){
            player.sprite.gotoAndPlay("shower"); //disappear
            shower.visible = true;
            player.stopFor(2000, undefined, function(){shower.visible = false});
        },
        function(){
            player.sprite.scaleX = 1;
            player.sprite.gotoAndPlay("chair");
            player.stopFor(1500);
        }
    ]);
    player.start = true;

    musicHandler = new MusicHandler();
    musicHandler.fadeMusic(soundtrackLayer1, MusicStates.FadingIn);
    musicHandler.fadeMusic(soundtrackLayer3, MusicStates.FadingIn);
    musicHandler.fadeMusic(soundtrackLayer4, MusicStates.FadingIn);

    texts = new Texts();

    createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", update);
}

function createClickable(x, y, spSheetObj, spSheetYeux, imgMask, name, stareTimeInMs)
{
    var spriteYeux = new createjs.Sprite(spSheetYeux, "closed"); //clone
    spriteYeux.regX = 75 / 2;
    spriteYeux.regY = 60;
    var spriteMask = new createjs.Bitmap(imgMask);
    spriteMask.y = 45;
    var sprite = new createjs.Sprite(spSheetObj, "still");
    sprite.x = x;
    sprite.y = y;
    interactiveObjects.push(new MouseZone(sprite, spriteYeux, spriteMask, name, stareTimeInMs));
}

function updateAllClickablesStatus(status)
{
    for(var i = 0; i < interactiveObjects.length; i++) {
        var obj = interactiveObjects[i];
        obj.state = status;
    }
}

function update(event)
{
	stage.update(event);
    if (gameHasEnded) { // endgame screen hijacks everything else
        if (finalState == null)
            finalState = new EndGame();
        finalState.update(event);
    }
    else {
        for(var i = 0; i < eltsToUpdate.length; i++)
            eltsToUpdate[i].update(event);

            if (gameStateTransition == true)
                transition.update(event);
            if (gameStateTransition == false && transition != null) {
                transition.remove();
                transition = null;
            }
    }

    //open door
    if(player.sprite.x > 1050 && !doorIsOpen)
    {
        door.gotoAndPlay("opening");
        doorIsOpen = true;
    }
    if(player.sprite.x > 1210 && doorIsOpen)
    {
        door.gotoAndPlay("closing");
        doorIsOpen = false;
    }
}
