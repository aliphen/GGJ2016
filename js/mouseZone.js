function MouseZone(x, y, w, h, onClick, onComplete)
{
    var timer;
    var isClicked = false;
    var clickedDuration = 0;
    var timerInSeconds = 1;

    this.onClickDown = function() {
        testShape.cursor = "pointer";
        timer = new VisualTimer(timerInSeconds, x + w/2, y + h/2);
        isClicked = true;
        onClick();
    };

    this.onMouseUp = function() {
        timer.remove();
        isClicked = false;
        clickedDuration = 0;
    };

    var testShape = new createjs.Shape();
    testShape.graphics.beginFill("rgba(255,0,0,0.5)").drawRect(x, y, w, h);
    testShape.cursor = "pointer";

    testShape.on("mousedown", this.onClickDown);
    testShape.on("pressup", this.onMouseUp);

    stage.addChild(testShape);


    this.update = function(event) {
        if (isClicked)
            clickedDuration += event.delta;
        if (clickedDuration > timerInSeconds)
            onComplete();
    }
}