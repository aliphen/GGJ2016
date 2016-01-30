var incrementalTimer = "inc";
var decrementalTimer = "dec";

function VisualTimer(duration, x, y, type)
{
    var radius = 40;

    var shape = new createjs.Shape();
    stage.addChild(shape);
    eltsToUpdate.push(this);

    var arc = -Math.PI/2;

    this.update = function(event)
    {
        var deltaT = event.delta;

        var prevarc = arc;
        var arcIncrement = deltaT*Math.PI*2 / (duration*1000);
        if(type == incrementalTimer) {
            arc = arc + arcIncrement;
            shape.graphics.setStrokeStyle(6).beginStroke("blue").arc(x, y, radius, prevarc, arc);
        }
        else{
            arc = arc - arcIncrement;
            shape.graphics.clear();
            shape.graphics.setStrokeStyle(6).beginStroke("blue").arc(x, y, radius, -5*Math.PI/2, arc);
        }
    }

    this.remove = function() {
        stage.removeChild(shape);
        //eltsToUpdate.remove(this) todo fix this
    }
}
