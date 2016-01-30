function TextBox(player, textToDisplay) {
    // Todo deal with edge of screen
    // Todo display character by character
    var currentTextBox = new createjs.Text(textToDisplay, "20px Segoe", "#ffffff");
    currentTextBox.x = player.sprite.x - 50;
    currentTextBox.y = player.sprite.y - 50;
    currentTextBox.visible = true;
    var remainingFramesToDisplayTextBox = 90;
    stage.addChild(currentTextBox);

    // Called by the main loop to update the textbox
    this.update = function (event, player) {
        // Check if we currently have a textBox displayed
        if (currentTextBox == null)
            return;

        if (remainingFramesToDisplayTextBox > 0) {
            remainingFramesToDisplayTextBox--;
            currentTextBox.x = player.sprite.x - 50;
            currentTextBox.y = player.sprite.y - 50;
        }
        else {
            stage.removeChild(currentTextBox);
            currentTextBox = null;
        }
    }
}