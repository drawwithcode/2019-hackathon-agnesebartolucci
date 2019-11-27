var tg1;
var earth;
var volhistory = [];
var buttonPlay;

function preload(){
  // put preload code here
  tg1 = loadSound('./assets/TG1_new.mp3');
  earth = loadImage('./assets/earth.png')
}

function setup() {
  // put setup code here
  createCanvas(windowWidth,windowHeight);
  analyzer = new p5.Amplitude();
  analyzer.setInput(tg1);
  angleMode(DEGREES);

  // stop and play button
  buttonPlay = createButton('PLAY/STOP');
  buttonPlay.position(width/2, height/2);
  buttonPlay.mousePressed(tg1Play);
  buttonPlay.center();
}

function draw() {
  // put drawing code here
  background('black');

  push();
  volume = analyzer.getLevel();
  volume1 = map(volume, 0.5, 1.5, 0.1, 100);
  volhistory.push(volume);

  // earths
  for (var x = width / 15; x < width; x += width / 15) {
    for (var y = height / 10; y < height; y += height / 10) {
      imageMode(CENTER);
      image(earth, x, y, volume1, volume1);
    }
  }

  // blue circle

  stroke('#3a58a0');
  strokeWeight(3);
  noFill();
  translate(width / 2, height / 2);
  beginShape();
  for (var a = 0; a < 360; a++) {
    var r = map(volhistory[a], 0, 1, 200, 550);
    var x = r * - cos(a);
    var y = r * sin(a);
    vertex(x, y);
  }
  endShape();

  if (volhistory.length > 360) {
    volhistory.splice(0, 1);
  }

  // white circle
  stroke('#e6e8d0');
  strokeWeight(3);
  noFill();
  translate(width / 2 - 720, height / 2 - 363.4);
  beginShape();
  for (var b = 0; b < 360; b++) {
    var r = map(volhistory[b], 0, 1, 200, 550);
    var x = r * cos(b);
    var y = r * sin(b);
    vertex(x, y);
  }
  endShape();

  if (volhistory.length > 360) {
    volhistory.splice(0, 1);
  }
}

// stop and play function
function tg1Play() {
  if (tg1.isPlaying()) {
    tg1.pause();
  } else {
    tg1.loop();
  }
}

// resize Canvas function
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
