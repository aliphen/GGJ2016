function MouseZone(x, y, w, h, onClick)
{
    var state = "inactive";

    var timer;
    var clickedDuration = 0;
    var timerInSeconds = 1;

    this.onClickDown = function() {
        testShape.cursor = "pointer";
        timer = new VisualTimer(timerInSeconds, x + w/2, y + h/2, incrementalTimer);
        state = "clicked";
        onClick();
    };

    this.onMouseUp = function() {
        if(state == "clicked") {
            timer.remove();
            state = "inactive";
        }
        clickedDuration = 0;
    };

    var testShape = new createjs.Shape();
    testShape.graphics.beginFill("rgba(255,0,0,0.5)").drawRect(x, y, w, h);
    testShape.cursor = "pointer";

    testShape.on("mousedown", this.onClickDown);
    testShape.on("pressup", this.onMouseUp);

    stage.addChild(testShape);
    eltsToUpdate.push(this);


    this.update = function(event) {
        if (state == "clicked") {
            clickedDuration += event.delta/1000;
            if (clickedDuration > timerInSeconds) {
                timer.remove();
                timer = new VisualTimer(3, x + w / 2, y + h / 2, decrementalTimer);
                state = "active"
            }
        }
    }
}