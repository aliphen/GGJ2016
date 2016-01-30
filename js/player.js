function Player(img, path) {
    var visionRange = 50; // FoV

    this.speed = 0.1; // <
    this.start = false;

    var ipath = 0;

    var debug = new createjs.Bitmap(imgDebug);
    debug.scaleY = 306;
    stage.addChild(debug);

    var spSheet = new createjs.SpriteSheet({
        images: [img],
        frames: {height: 255, width: 135, regX: 135/2},
        animations: {
            still: 0,
            walk: [1, 8, "walk", 2.25*this.speed],
            surprise: [9, 10, "still", 0.1],
            inspect: 11
        }
    });

    this.sprite = new createjs.Sprite(spSheet, "walk");
    this.sprite.y = 61;
    this.sprite.x = 400;

    // insert before fading screen
    if (rectangleToCoverScene == null)
        stage.addChild(this.sprite);
    else {
        var index = stage.getChildIndex(rectangleToCoverScene);
        stage.addChildAt(this.sprite, index - 1);
    }
    eltsToUpdate.push(this);

    this.update = function (event) {
        if(!this.start)
            return;

        var deltaT = event.delta;
        var destX = path[ipath];

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
            for(var i = 0; i < interactiveObjects.length; i ++)
            {
                var obj = interactiveObjects[i];
                if(obj.state == "active" && detectionMin < obj.xEnd && detectionMax > obj.xBegin)
                {
                    obj.detect();
                    this.sprite.gotoAndPlay("surprise");
                    this.stopFor(1000);
                }
            }

            //move
            var maxMove = this.speed*deltaT;
            this.sprite.x += Math.min(Math.max(destX - this.sprite.x, -maxMove), maxMove);
        }
        else{ //destination reached

            //this.sprite.gotoAndPlay("still");
            ipath++;
        }
        if (ipath == path.length + 1 && transition == null) // end of the path : trigger transition
            transition = new Transition();
    }

    var savediPath;
    var self = this;
    this.stopFor = function(timeInMs)
    {
        savediPath = ipath;
        ipath = 1000;
        setTimeout(function(){
            ipath = savediPath;
            self.sprite.gotoAndPlay("walk");
        }, timeInMs)
    }

    this.remove = function() {
        stage.removeChild(this.sprite);
    }
}