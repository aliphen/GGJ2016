function MouseZone(x, y, w, h, onHover, onAction)
{
    var testShape = new createjs.Shape();
    testShape.graphics.beginFill("rgba(255,0,0,0.5)").drawRect(x, y, w, h);
    testShape.on("mouseover", onHover);
    if(onAction) {
        testShape.on("click", onAction);
        testShape.cursor = "pointer";
    }
    stage.addChild(testShape);
}