var keyWords = [
    ['hi', 'hey', 'hello', 'my regards'],
    ['how are you', 'how is life', 'how are things'],
    ['what are you doing', 'what do you do', 'what is going on'],
    ['help me', 'I need help'],
    ['how old are you', 'are you old'],
    ['who are you', 'are you human', 'are you bot', 'are you human or bot'],
    ['who created you', 'who made you'],
    ['your name please', 'your name', 'may i know your name', 'what is your name'],
    ['happy', 'good'],
    ['bad', 'bored', 'tired'],
    ['do not mess with me'],
    ['bye', 'good bye', 'goodbye', 'see you later'],
    ['old']
];
var botAnswer = [
    ['Hey', 'Hi', 'Hello', 'my regards'],
    ['Fine', 'Pretty well', 'Fantastic'],
    ['Nothing much', 'About to go to sleep', 'I do not know actually'],
    ['If you need help, call 911', 'I am on the way'],
    ['I am a goddess, my life is eternal'],
    ['I am a goddess', 'I am a goddess Viki, obey my orders'],
    ['Victor', "Valkir"],
    ['I am Viki your goddess, I am a goddess', 'Go away'],
    ['Have you ever felt bad?', 'Glad to hear it'],
    ['Why?', "Why? You shouldn't!", 'Try watching TV'],
    ['Ok....'],
    ['Bye', 'Goodbye', 'See you later'],
    ['Do not tell this word ever']
];

var error = ['please repeat your question', 'ask your question correctly'];

var botTextBox = document.getElementById("botTextBox");

var date = showTime(new Date());

var time = document.querySelectorAll('.time');


function output() {
    var textInput = document.getElementById("textInput").value;
    if (textInput != '') {

        document.getElementById("userTextBox").innerHTML = textInput;
        cleanAdnDebug(textInput);
    }
}

// Function that get input value and tracks 'keypress' event,
// than output written text in input to user text block

var addEventKeyPress = document.querySelector('input').addEventListener('keypress', function (e) {

    /* The 'keypress' event occurs immediately after the 'keydown',
if the character key is pressed, pressing the key will bring up the symbol. */

    /* 'keyDown' / 'keyup' events occur when
    you press / release a key and get its scan code in the 'keyCode' property.*/

    //The symbol code is stored in the properties: 'charCode' and 'which'.

    var code = e.which || e.keyCode;
    if (code === 13) { // '13' code of 'Enter' button
        output();
    }
});


var btnClick = document.getElementById('btn').addEventListener('click', function () {
    output();
});

// adds style to messages

function decorateMassage() {
    var userMassageBlock = document.querySelector('#userMassage');
    userMassageBlock.className = 'userMassage';
    var guest = document.querySelector('.guest');
    guest.innerHTML = 'Guest:';

    var botMassageBlock = document.querySelector('#botMassage');
    botMassageBlock.className = 'botMassage';
    var goddess = document.querySelector('.goddess');
    goddess.innerHTML = 'Goddess:';
}


// clean user text, debug function

function cleanAdnDebug(textInput) {
    try {
        var result = textInput + '=' + eval(textInput); //The eval(...) function allows you to execute the code passed to it as a string.
    } catch (e) {
        var answer = (textInput.toLowerCase()).replace(/[^\w\s\d]/gi, "");
        answer = answer.replace(/ a /g, " ");
        answer = answer.replace(/i feel /g, "");
        answer = answer.replace(/whats/g, "what is");
        answer = answer.replace(/dont/g, "do not");
        answer = answer.replace(/help/g, "help me");
        answer = answer.replace(/regards/g, "my regards");
        if (compareIt(keyWords, botAnswer, answer)) {
            result = compareIt(keyWords, botAnswer, answer);
        } else {
            result = error[Math.floor(Math.random() * error.length)];
        }
    }
    
    botTextBox.innerHTML = result;
    decorateMassage();
    speak(result);
    addTime();
    document.getElementById("textInput").value = ""; //clear input value
}

// function that sorts prepared answers and passes them in response of the bot

function compareIt(firstArray, secondArray, string) {
    var item;
    for (var i = 0; i < firstArray.length; i++) {
        for (var v = 0; v < secondArray.length; v++) {
            if (firstArray[i][v] == string) {
                var items = secondArray[i];
                item = items[Math.floor(Math.random() * items.length)];
            }
        }
    }
    return item;
}


// function shows current time in needed format

function showTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    var formatTime = hours + ':' + minutes + ':' + seconds;
    return formatTime;

}

//this function adds time to messages

function addTime() {
    for (var i = 0; i < time.length; i++) {
        time[i].innerHTML = date;
    }
}

//chat can speak

function speak(string) {
    var utterance = new SpeechSynthesisUtterance();
    utterance.voice = speechSynthesis.getVoices().filter(function (voice) {
        return voice.name == "Agnes";
    })[0];
    utterance.text = string;
    utterance.lang = "en-US";
    utterance.volume = 1; //0-1 interval
    utterance.rate = 1;
    utterance.pitch = 2; //0-2 interval
    speechSynthesis.speak(utterance);
}

