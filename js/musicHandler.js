function MusicHandler() {
    var fadesInProgress = [];
    fadesInProgress.push([soundtrackLayer1, MusicStates.Neutral]);
    fadesInProgress.push([soundtrackLayer2, MusicStates.Neutral]);
    eltsToUpdate.push(this);


    this.fadeMusic = function (layerId, fadeInOrOut) {
        for (var i = 0; i < fadesInProgress.length; i++) {
            var layerName =  fadesInProgress[i][0];
            if (layerName == layerId) {
                fadesInProgress[i][1] = fadeInOrOut;
            }
        }
    };

    this.update = function (event) {
        for (var i = 0; i < fadesInProgress.length; i++) {
            var layerName =  fadesInProgress[i][0];
            var layerState = fadesInProgress[i][1];
            var layer = soundtrackLayers[layerName];

            switch (layerState) {
                case (MusicStates.Neutral):
                    break;
                case (MusicStates.FadingIn):
                    if (layer.volume >= 0.5)
                        fadesInProgress[i] = [layerName, MusicStates.Neutral];
                    else
                        layer.volume += 0.01;
                    break;
                case (MusicStates.FadingOut):
                    if (layer.volume <= 0)
                        fadesInProgress[i] = [layerName, MusicStates.Neutral];
                    else
                        layer.volume -= 0.01;
                    break;
            }
        }
    }
}

var MusicStates = {
    FadingIn : 0,
    FadingOut : 1,
    Neutral : 2
};