//sprite should have anims called still, click, active and decay
function MouseZone(sprite)
{
    //won't move
    var x = sprite.x;
    var y = sprite.y;
    var w = sprite.getBounds().width;
    var h = sprite.getBounds().height;

    this.xBegin = x;
    this.xEnd = x+w;


    this.state = "inactive";

    var timer;
    var clickedDuration = 0;
    var activeDuration = 0;
    var clickTimeInSec = 1;
    var activeTimeInSec = 3;

    stage.addChild(sprite);
    sprite.cursor = "pointer";
    eltsToUpdate.push(this);

    var self = this; //for callbacks
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
                timer = new VisualTimer(3, x + w / 2, y + h / 2, decrementalTimer);
                this.state = "active";
                sprite.gotoAndPlay("active");
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
            }
        }
    }

    this.detect = function(){
        this.state = "noticed";
        timer.remove();
    }
}