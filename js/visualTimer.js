function VisualTimer(duration, x, y)
{
    var radius = 50;

    var shape = new createjs.Shape();
    shape.graphics.setStrokeStyle(8);
    stage.addChild(shape);
    eltsToUpdate.push(this);

    var arc = -Math.PI/2;

    this.update = function(event)
    {
        var deltaT = event.delta;

        var prevarc = arc;
        var arcIncrement = deltaT*Math.PI*2 / (duration*1000);
        arc = (arc + arcIncrement);
        if(arc < 3*Math.PI/2 + 0.1)
            shape.graphics.beginStroke("blue").arc(x, y, radius, prevarc, arc);
    }
}
