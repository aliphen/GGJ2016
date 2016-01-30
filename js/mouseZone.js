function MouseZone(x, y, w, h)
{
    this.xBegin = x;
    this.xEnd = x+w;

    this.state = "inactive";

    var timer;
    var clickedDuration = 0;
    var activeDuration = 0;
    var clickTimeInSec = 1;
    var activeTimeInSec = 3;

    var underlyingShape = new createjs.Shape();
    underlyingShape.graphics.beginFill("rgba(255,0,0,0.5)").drawRect(x, y, w, h);
    underlyingShape.cursor = "pointer";

    stage.addChild(underlyingShape);
    eltsToUpdate.push(this);

    var self = this; //for callbacks
    underlyingShape.on("mousedown", function() {
        if(self.state == "inactive") {
            timer = new VisualTimer(clickTimeInSec, x + w / 2, y + h / 2, incrementalTimer);
            self.state = "clicked";
        }
    });

    underlyingShape.on("pressup", function() {
        if(self.state == "clicked") {
            timer.remove();
            self.state = "inactive";
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
                activeDuration = 0;
            }
        }
        if(this.state == "active")
        {
            activeDuration += event.delta/1000;
            if (activeDuration > activeTimeInSec) {
                timer.remove();
                this.state = "inactive";
            }
        }
    }

    this.detect = function(){
        this.state = "noticed";
        timer.remove();
    }
}