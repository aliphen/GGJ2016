function MouseZone(x, y, w, h, onClick)
{
    var timer;

    this.onClickDown = function() {
        testShape.cursor = "pointer";
        timer = new VisualTimer(1, x + w/2, y + h/2);
        onClick();
    };

    this.onMouseUp = function() {
        timer.remove();
    };

    var testShape = new createjs.Shape();
    testShape.graphics.beginFill("rgba(255,0,0,0.5)").drawRect(x, y, w, h);
    testShape.cursor = "pointer";

    testShape.on("mousedown", this.onClickDown);
    testShape.on("pressup", this.onMouseUp);

    stage.addChild(testShape);
}