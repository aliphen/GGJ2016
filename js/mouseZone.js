//sprite should have anims called still, click, active and decay
function MouseZone(sprite, yeux, mask, name){
    this.name = name;
    var clickTimeInSec = 2; //Activation
    var activeTimeInSec = 2; // 

    //won't move
    var x = sprite.x;
    var y = sprite.y;
    var w = sprite.getBounds().width;
    var h = sprite.getBounds().height;

    yeux.x = x + w/2; //centered
    yeux.y = y; //above
    yeux.visible = false;

    this.xBegin = x;
    this.xEnd = x+w;
    this.xPos = x+w/2;


    this.state = "inactive";

    var timer;
    var clickedDuration = 0;
    var activeDuration = 0;

    mask.visible = false;
    stage.addChild(sprite);
    stage.addChild(mask);
    stage.addChild(yeux);
    sprite.cursor = "pointer";
    eltsToUpdate.push(this);

    var self = this; //for callbacks and for my people
    sprite.on("mousedown", function() {
        if(self.state == "inactive") {
            timer = new VisualTimer(clickTimeInSec, x + w/2, y + h/2, incrementalTimer);
            self.state = "clicked";
            this.gotoAndPlay("click");
        }
    });

    sprite.on("pressup", function() {
        if(self.state == "clicked") {
            timer.remove();
            self.state = "inactive";
            this.gotoAndPlay("still");
        }
        clickedDuration = 0;
    });

    this.update = function(event) {
        if (this.state == "clicked") {
            clickedDuration += event.delta/1000;
            if (clickedDuration > clickTimeInSec) {
                timer.remove();
                timer = new VisualTimer(activeTimeInSec, x + w / 2, y + h / 2, decrementalTimer);
                this.state = "active";
                sprite.gotoAndPlay("active");
                yeux.visible = true;
                activeDuration = 0;
            }
        }
        if(this.state == "active")
        {
            activeDuration += event.delta/1000;
            if (activeDuration > activeTimeInSec) {
                timer.remove();
                this.state = "inactive";
                sprite.gotoAndPlay("decay");
                yeux.visible = false;
            }
        }
        if(this.state == "noticed")
        {
            if(yeux.visible) {
                yeux.alpha = yeux.alpha - 0.05;
                if(yeux.alpha < 0) {
                    yeux.visible = false;
                }
            }
            if(mask.alpha < 1) {
                mask.alpha = mask.alpha + 0.01;
            }
        }
    }

    this.detect = function(){
        this.state = "noticed";
        yeux.gotoAndPlay("open");
        mask.visible = true;
        mask.alpha = 0;
        sprite.cursor = null;
        timer.remove();
    }
}