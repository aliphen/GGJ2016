function TextBox(textToDisplay) {
    var textSpeed = 1;
    var charCoolDown = textSpeed;
    var ichar = 1;

    this.textBoxSupport = new createjs.Shape();
    this.textBoxSupport.graphics.beginFill("#222222").drawRect(0, 0, 1200, 30);
    this.textBoxSupport.x = 0;
    this.textBoxSupport.y = 13;
    this.textBoxSupport.visible = true;
    this.textBoxSupport.alpha = 0;
    stage.addChild(this.textBoxSupport);

    this.currentTextBox = new createjs.Text("", "20px Monospace", "#dddddd");
    this.currentTextBox.x = 20;
    this.currentTextBox.y = 20;
    this.currentTextBox.visible = true;
    this.remainingFramesToDisplayTextBox = 150;
    stage.addChild(this.currentTextBox);
    eltsToUpdate.push(this);

    // Called by the main loop to update the textbox
    this.update = function (event) {
        if (this.remainingFramesToDisplayTextBox > 0) {
            this.textBoxSupport.alpha = 0.3;
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
            this.textBoxSupport.alpha = 0;
        }
    }

    this.remove = function (event) {
        stage.removeChild(this.textBoxSupport);
        stage.removeChild(this.currentTextBox);
    }
}