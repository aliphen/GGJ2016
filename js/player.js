function Player(img, imgWakeUp, path, callbacks) {
    var self = this;
    var visionRange = 50; // FoV

    this.speed = 0.1;
    this.start = false;
    this.foundItemsCounter = 0;

    var ipath = 0;
    var overridenDest = undefined;

    var debug = new createjs.Bitmap(imgDebug);
    debug.scaleY = 350;
    debug.visible = false;
    stage.addChild(debug);

    var spSheet = new createjs.SpriteSheet({
        images: [img],
        frames: {height: 255, width: 135, regX: 135/2},
        animations: {
            still: 0,
            walk: [1, 8, "walk", 2.25*this.speed],
            surprise: [9, 10, "still", 0.1],
            inspect: 11,
            flower: 13,
            photo: 11,
            window : 15,
            aquarium: 14,
            phone: 12,
            chair: 16,
            shower: 17
        }
    });
    var spSheetWake = new createjs.SpriteSheet({
        images: [imgWakeUp],
        frames: {height: 237, width: 275},
        animations: {
            asleep: 0,
            wake: [0, 2, "awaken", 0.03],
            awaken: 2
        }
    });
    var wakeSprite = new createjs.Sprite(spSheetWake, "wake");
    wakeSprite.x = 154;
    wakeSprite.y = 113;


    this.sprite = new createjs.Sprite(spSheet, "walk");
    this.sprite.y = 96;
    this.sprite.x = 400;
    this.sprite.visible = false;
    stage.addChild(this.sprite);

    // insert before fading screen
    if (rectangleToCoverScene == null)
        stage.addChild(wakeSprite);
    else {
        var index = stage.getChildIndex(rectangleToCoverScene);
        stage.addChildAt(wakeSprite, index - 1);
    }
    eltsToUpdate.push(this);

    this.update = function (event) {
        if(!this.start)
            return;

        var deltaT = event.delta;
        var destX = overridenDest ? overridenDest : path[ipath];

        //move
        var maxMove = this.speed*deltaT;
        this.sprite.x += Math.min(Math.max(destX - this.sprite.x, -maxMove), maxMove);

        if (Math.abs(destX - this.sprite.x) > 0.01) {
            //look left or right depending on walking direction
            var detectionMin;
            var detectionMax;
            if(destX - this.sprite.x < 0) {
                this.sprite.scaleX = -1; //looking left
                detectionMin = this.sprite.x - visionRange;
                detectionMax = this.sprite.x;
            }
            else {
                this.sprite.scaleX = 1; //looking right
                detectionMin = this.sprite.x;
                detectionMax = this.sprite.x + visionRange;
            }

            debug.x = detectionMin;
            debug.scaleX = detectionMax - detectionMin;

            //check detection range
            for(var i = 0; i < interactiveObjects.length; i ++) {
                var obj = interactiveObjects[i];
                if(obj.state == "active" && detectionMin < obj.xEnd && detectionMax > obj.xBegin) {
                    updateFreezation(true); //other objects are not clickable during interaction
                    obj.detect();
                    this.foundItemsCounter++;
                    switch (this.foundItemsCounter) {
                        case (1): createjs.Sound.play(achievementA); break;
                        case (2): createjs.Sound.play(achievementB); break;
                        case (3): createjs.Sound.play(achievementC); break;
                        case (4): createjs.Sound.play(achievementD); break;
                        case (5): createjs.Sound.play(achievementE); break;
                        default: break;
                    }

                    this.sprite.gotoAndPlay("surprise");
                    this.stopFor(1000, obj.xPos);
                    break;
                }
            }
        }
        else{ //destination reached
            if(overridenDest) {
                for(i = 0; i < interactiveObjects.length; i ++) {
                    obj = interactiveObjects[i];
                    if (obj.state == "noticed" && Math.abs(this.sprite.x - obj.xPos) < 0.5) {
                        //interact with object
                        obj.state = "used"; //do not interact again
                        var instance;
                        switch (obj.name) {
                            case ("window"):
                                instance = createjs.Sound.play(windowSound);
                                instance = 0.5;
                                musicHandler.fadeMusic(soundtrackLayer5, MusicStates.FadingOut);
                                musicHandler.fadeMusic(soundtrackLayer6, MusicStates.FadeToMax);
                                break;
                            case ("photo"): createjs.Sound.play(photoSound); break;
                            case ("aquarium"): createjs.Sound.play(aquariumSound); break;
                            case ("flower"):
                                instance = createjs.Sound.play(plantGrowSound);
                                instance.volume = 0.5;
                                break;
                            case ("phone"): createjs.Sound.play(phoneSound); break;
                            default: break;
                        }
                        texts.displayTextForObject(obj.name);
                        this.sprite.gotoAndPlay(obj.name);
                        this.stopFor(obj.stareTimeInMs, undefined, function(){updateFreezation(false)});
                        break;
                    }
                }
            }
            else {
                if(callbacks[ipath]) callbacks[ipath]();
                ipath++;
                if (this.sprite.x == path[0]) {
                    var showerSoundInstance = createjs.Sound.play(showerSound);
                }
                if (this.sprite.x == path[1]) {
                    var typingSoundInstance = createjs.Sound.play(typingSound);
                }

                if (ipath == path.length && transition == null){ // end of the path : trigger transition
                    this.sprite.gotoAndPlay("still");
                    overridenDest = this.sprite.x; //prevent movement
                    createjs.Sound.play(doorSound);
                    if (stepSoundInstance)
                        stepSoundInstance.volume = 0;

                    if (this.foundItemsCounter == 5) { // end of the game ! Trigger reward instead of transition
                        gameHasEnded = true;
                        musicHandler.fadeMusic(soundtrackLayer4, MusicStates.FadingOut);
                        texts.removeTextBox();
                    }
                    else {
                        transition = new Transition(this);
                    }
                }
            }
        }
    };

    this.stopFor = function(timeInMs, newdest, cb)
    {
        if (stepSoundInstance)
            stepSoundInstance.volume = 0;
        overridenDest = this.sprite.x;
        setTimeout(function(){
            overridenDest = newdest;
            self.sprite.gotoAndPlay("walk");
            if (stepSoundInstance)
                stepSoundInstance.volume = 0.5;
            if(cb) cb();
        }, timeInMs)
    };

    this.remove = function() {
        stage.removeChild(debug);
        stage.removeChild(this.sprite);
    };

    this.reset = function() {
        this.start = false;
        ipath = 0;
        overridenDest = undefined;
        if (stepSoundInstance)
            stepSoundInstance.volume = 0;
        this.sprite.x = 400;
        this.foundItemsCounter = 0;
        for(var i = 0; i < interactiveObjects.length; i ++) {
            var obj = interactiveObjects[i];
            obj.reset();
        }
        this.sprite.visible = false;
        wakeSprite.visible = true;
        wakeSprite.gotoAndPlay("wake");
        this.stopFor(4000, undefined, function(){
            wakeSprite.visible = false;
            self.sprite.visible = true;
        });
    };

    this.startMoving = function() {
        this.start = true;
        self.sprite.gotoAndPlay("walk");
        if (stepSoundInstance)
            stepSoundInstance.volume = 1;
    }

    //start stopped to show wake anim
    this.stopFor(4000, undefined, function(){
        wakeSprite.visible = false;
        self.sprite.visible = true;
        //allow interactions
        updateFreezation(false);
        if (stepSoundInstance)
            stepSoundInstance.volume = 0;
    });
}