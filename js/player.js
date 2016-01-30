function Player(img) {
    this.destX;
    this.speed = 4;

    var spSheet = new createjs.SpriteSheet({
        images: [img],
        frames: {height: 200, width: 100, regX: 50},
        animations: {
            still: [0, 0]
        }
    });

    var sprite = new createjs.Sprite(spSheet);
    sprite.y = 200;
    sprite.x = 400;
    stage.addChild(sprite);
    //use gotoAndPlay to change anim

    this.update = function (event) {
        var deltaT = event.delta / 30; //usually approximately 1

        if (this.destX && Math.abs(this.destX - sprite.x) > 0.01) {
            //move
            var maxMove = this.speed*deltaT;
            sprite.x += Math.min(Math.max(this.destX - sprite.x, -maxMove), maxMove);
        }
    }
}