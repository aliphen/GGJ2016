function MouseZone(x, y, w, h, onClick)
{
    var state = "inactive";

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

    testShape.on("mousedown", function() {
        testShape.cursor = "pointer";
        timer = new VisualTimer(clickTimeInSec, x + w/2, y + h/2, incrementalTimer);
        state = "clicked";
        onClick();
    });

    testShape.on("pressup", function() {
        if(state == "clicked") {
            timer.remove();
            state = "inactive";
        }
        clickedDuration = 0;
    });

    this.update = function(event) {
        if (state == "clicked") {
            clickedDuration += event.delta/1000;
            if (clickedDuration > clickTimeInSec) {
                timer.remove();
                timer = new VisualTimer(3, x + w / 2, y + h / 2, decrementalTimer);
                state = "active"
            }
        }
        if(state == "active")
        {
            activeDuration += event.delta/1000;
            if (activeDuration > activeTimeInSec) {
                timer.remove();
                state = "inactive";
                activeDuration = 0;
            }
        }
    }
}