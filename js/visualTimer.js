var incrementalTimer = "inc";
var decrementalTimer = "dec";

function VisualTimer(duration, x, y, type)
{
    var radius = 50;

    var shape = new createjs.Shape();
    stage.addChild(shape);
    eltsToUpdate.push(this);

    var arc = -Math.PI/2;

    this.update = function(event)
    {
        var deltaT = event.delta;

        var prevarc = arc;
        var arcIncrement = deltaT*Math.PI*2 / (duration*1000);
        arc = arc + arcIncrement;
        if(type == incrementalTimer)
            shape.graphics.setStrokeStyle(8).beginStroke("blue").arc(x, y, radius, prevarc, arc);
        else{
            shape.graphics.clear();
            shape.graphics.setStrokeStyle(8).beginStroke("blue").arc(x, y, radius, arc, 3*Math.PI/2);
        }
    }

    this.remove = function() {
        stage.removeChild(shape);
        //eltsToUpdate.remove(this) todo fix this
    }
}
