displayDebug = false;

var isKeyPressed = [];

var preloadCount = 0;
var preloadTotal = 0;

var stage;

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
    launchGame(); //todo remove when actual stuff does preload
	//imgPlayer.onload = preloadUpdate;
	//imgPlayer.src = "media/player.png";

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

    var textBar = new createjs.Text("Your apartment", "14px Arial");
    textBar.x = textBar.y = 10;
    stage.addChild(textBar);

    var bg = new MouseZone(0, 0, 1200, 600, function(){textBar.text = "Your apartment"});
    var test = new MouseZone(950, 590, 200, 70, function(){textBar.text = "A clickable rectangle"}, function(){textBar.text = "Action !"});
    var testsq = new MouseZone(50, 50, 150, 150, function(){textBar.text = "A square"}, function(){textBar.text = "Action !"});

	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", update);

	//manage keyboard state
	document.onkeydown = function(e){
		var key = code(e);
		isKeyPressed[key] = true;
//		alert(key);
	};
	document.onkeyup = function(e){
		var key = code(e);
		isKeyPressed[key] = false;
	};
}

function code(e)
{
	e = e || window.event;
	return(e.keyCode || e.which);
}

function update(event)
{
    //soundtrackLayers[0].volume += 0.01; fade in
	stage.update();
}
