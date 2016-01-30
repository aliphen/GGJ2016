function TextBox(player, textToDisplay) {
    // Todo deal with edge of screen
    // Todo display character by character

    this.currentTextBox = new createjs.Text(textToDisplay, "20px Segoe", "#ff00ff");
    this.currentTextBox.x = player.sprite.x - 50;
    this.currentTextBox.y = player.sprite.y - 50;
    this.currentTextBox.visible = true;
    this.remainingFramesToDisplayTextBox = 90;
    stage.addChild(this.currentTextBox);
    eltsToUpdate.push(this);

    // Called by the main loop to update the textbox
    this.update = function (event) {
        // Check if we currently have a textBox displayed
        if (this.currentTextBox == null)
            return;

        if (this.remainingFramesToDisplayTextBox > 0) {
            this.remainingFramesToDisplayTextBox--;
            this.currentTextBox.x = player.sprite.x - 50;
            this.currentTextBox.y = player.sprite.y - 50;
        }
        else {
            stage.removeChild(this.currentTextBox);
            this.currentTextBox = null;
        }
    }
}