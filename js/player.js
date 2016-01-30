function Player(img, path) {
    this.speed = 4;

    var ipath = 0;

    var spSheet = new createjs.SpriteSheet({
        images: [img],
        frames: {height: 200, width: 100, regX: 50},
        animations: {
            still: [0, 0]
        }
    });

    this.sprite = new createjs.Sprite(spSheet);
    this.sprite.y = 200;
    this.sprite.x = 400;
    stage.addChild(this.sprite);
    eltsToUpdate.push(this);
    //use gotoAndPlay to change anim

    this.update = function (event) {
        var deltaT = event.delta / 30; //usually approximately 1

        var destX = path[ipath];
        if (Math.abs(destX - this.sprite.x) > 0.01) {
            //move
            var maxMove = this.speed*deltaT;
            this.sprite.x += Math.min(Math.max(destX - this.sprite.x, -maxMove), maxMove);
        }
        else{ //destination reached
            //pause for a bit, play an anim ?
            ipath++;
        }
    }
}