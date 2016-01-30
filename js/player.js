function Player(img, path) {
    this.speed = 4;

    var ipath = 0;

    var spSheet = new createjs.SpriteSheet({
        images: [img],
        frames: {height: 245, width: 62, regX: 62/2},
        animations: {
            still: [0, 0],
            walk: [1, 6, "walk", 0.4]
        }
    });

    this.sprite = new createjs.Sprite(spSheet, "walk");
    this.sprite.y = 200;
    this.sprite.x = 400;
    stage.addChild(this.sprite);
    eltsToUpdate.push(this);

    this.update = function (event) {
        var deltaT = event.delta / 30; //usually approximately 1

        var destX = path[ipath];
        if (Math.abs(destX - this.sprite.x) > 0.01) {
            //look left or right depending on walking direction
            if(destX - this.sprite.x < 0)
                this.sprite.scaleX = -1;
            else
                this.sprite.scaleX = 1;

            //move
            var maxMove = this.speed*deltaT;
            this.sprite.x += Math.min(Math.max(destX - this.sprite.x, -maxMove), maxMove);
        }
        else{ //destination reached

            //this.sprite.gotoAndPlay("still");
            ipath++;
        }
    }
}