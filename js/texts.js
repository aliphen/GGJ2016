function Texts() {
    var currentTextBox = null;

    var texts = [];

    texts["window"] = [];
    texts["window"][0] = "I hate rain. But I have to admit, this rainbow is beautiful.";
    texts["window"][1] = "An everlasting rainbow is the best!";
    texts["window"][2] = "\"I don't even want to watch outside, I know it's still raining today.\"";

    texts["flower"] = [];
    texts["flower"][0] = "I thought that flower had already faded. It looks nice and colorful.";
    texts["flower"][1] = "As pretty as ever.";
    texts["flower"][2] = "\"I wish I had taken care of my flower. It used to give color to this room.\"";

    texts["aquarium"] = [];
    texts["aquarium"][0] = "What...!? How...? Well... Whatever, it's shiny.";
    texts["aquarium"][1] = "There you are again, invisible magical fish.";
    texts["aquarium"][2] = "\"Why did I even buy an aquarium for? It's such a burden.\"";

    texts["phone"] = [];
    texts["phone"][0] = "A message? \"Greetings from your fortune teller! Your fate today is to have a happy day\" Haha! What a kind joke.";
    texts["phone"][1] = "Another message? \"As usual, it's your fortune teller! How lucky you are! Once again, your fate is to have a happy day!\" I'm starting to think it's true!";
    texts["phone"][2] = "\"I never give my phone number to anyone. No wonder no one ever calls me.\"";

    texts["photo"] = [];
    texts["photo"][0] = "So many memories... Even though I'm not, it feels like I am smiling in this picture now.";
    texts["photo"][1] = "I love this photograph... Do I always look this happy?";
    texts["photo"][2] = "\"My bookshelf is so dusty. But I'm too lazy to clean it.\"";

    texts["finalAdvice"] = [];
    texts["finalAdvice"][2] = "\"What if one morning, I tried to make everything better here ?\"";

    texts["chitchat"] = [];
    texts["chitchat"][0] = "Why do I keep living this kind of life?";
    texts["chitchat"][1] = "I have a feeling tomorrow will be better ? Is it... hope?";
    texts["chitchat"][2] = "I feel like today was... better, I guess.";
    texts["chitchat"][3] = "Today was a fun day.";
    texts["chitchat"][4] = "I could keep living like that forever.";

    var alreadyDisplayed = [];
    alreadyDisplayed["window"] = -1;
    alreadyDisplayed["flower"] = -1;
    alreadyDisplayed["aquarium"] = -1;
    alreadyDisplayed["phone"] = -1;
    alreadyDisplayed["photo"] = -1;
    alreadyDisplayed["chitchat"] = -1;

    this.displayTextForObject = function(objectName){
        var textToDisplay = "";
        switch (alreadyDisplayed[objectName]) {
            case (-1):
                textToDisplay = texts[objectName][0];
                alreadyDisplayed[objectName] = 0;
                break;
            case (0):
                textToDisplay = texts[objectName][1];
                alreadyDisplayed[objectName] = 1;
                break;
            case (1):
                textToDisplay = texts[objectName][1];
                alreadyDisplayed[objectName] = 1;
                break;
            case (2):
                break;
            default:
                break;
        }
        if (currentTextBox != null)
            currentTextBox.remove();
        currentTextBox = new TextBox(textToDisplay);
    }

    this.removeTextBox = function() {
        currentTextBox.remove();
    }

    this.returnAdvice = function(name) {
        return texts[name][2];
    }
}




