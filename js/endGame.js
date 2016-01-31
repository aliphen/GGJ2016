// we create an instance at the end that overrides everything else
function EndGame() {

    final = new createjs.Bitmap(imgFinal);
    final.visible = true;
    final.alpha = 1; // TODO : make it 0 and have the update working
    stage.addChild(final);

    this.update = function(event) {
        if (final.alpha < 1)
            final.alpha += 0.01;

    }
}