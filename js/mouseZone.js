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

    var testShape = new createjs.Shape();
    testShape.graphics.beginFill("rgba(255,0,0,0.5)").drawRect(x, y, w, h);
    testShape.cursor = "pointer";

    stage.addChild(testShape);
    eltsToUpdate.push(this);

    var self = this; //for callbacks
    testShape.on("mousedown", function() {
        if(self.state == "inactive") {
            timer = new VisualTimer(clickTimeInSec, x + w / 2, y + h / 2, incrementalTimer);
            self.state = "clicked";
        }
    });

    testShape.on("pressup", function() {
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