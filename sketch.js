//Test for Farsi speech recognition
//By Mehdi Farahani



let recognition;
let words = [];
let isListening = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);


  recognition = new webkitSpeechRecognition() || speechRecognition();
  recognition.lang = 'fa-IR'; 
  recognition.continuous = true;
  recognition.interimResults = true;

  
  recognition.onstart = () => {
    isListening = true;
  };
  recognition.onend = () => {
    isListening = false;
    setTimeout(() => {
      if (!isListening) {
        recognition.start(); // Restart recognition when it ends
      }
    }, 1); // Restart after a brief delay 
  };
  recognition.onresult = gotSpeech;

  // Start recognition when the page loads
  recognition.start();
}

function draw() {
  background(220);

  
  textSize(1.05 * width); // Responsive text size based on canvas width
  textStyle(BOLD);
  fill(0);
  textAlign(CENTER, CENTER);

  // Display the words
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    textSize(word.size);
    textStyle(NORMAL);
    fill(word.color);
    text(word.text, word.x, word.y);

    // Move the word
    word.x += word.speedX;
    word.y += word.speedY;
  }
}

function gotSpeech(event) {
  const result = event.results[event.results.length - 1][0].transcript;
  const word = {
    text: result,
    size: random(60, 60),
    color: color(random(255), random(255), random(255)),
    x: random(width),
    y: random(height),
    speedX: random(-2, 2),
    speedY: random(-2, 2),
  };
  words.push(word);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
