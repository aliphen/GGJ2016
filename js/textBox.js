function TextBox(player, textToDisplay) {
    // Todo deal with edge of screen
    // Todo display character by character

    var textSpeed = 2;
    var charCoolDown = textSpeed;
    var ichar = 1;

    this.currentTextBox = new createjs.Text("", "20px Segoe", "#ff00ff");
    this.currentTextBox.x = player.sprite.x - 50;
    this.currentTextBox.y = player.sprite.y - 50;
    this.currentTextBox.visible = true;
    this.remainingFramesToDisplayTextBox = 90;
    stage.addChild(this.currentTextBox);
    eltsToUpdate.push(this);

    // Called by the main loop to update the textbox
    this.update = function (event) {
        if (this.remainingFramesToDisplayTextBox > 0) {
            //align on player
            this.currentTextBox.x = player.sprite.x - 50;
            this.currentTextBox.y = player.sprite.y - 50;

            this.remainingFramesToDisplayTextBox--;
            charCoolDown--;
            if(charCoolDown <= 0) {
                this.currentTextBox.text = textToDisplay.substr(0, ichar);
                ichar++;
                charCoolDown = textSpeed;
            }
        }
        else {
            this.currentTextBox.text = "";
        }
    }
}